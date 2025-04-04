<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductTransfer;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductTransferController extends Controller
{
    public function create()
        {
            return Inertia::render('Products/TransferProduct', [
                'products' => Product::with('locations')->get() ?? [],  
                'locations' => Location::all() ?? [],   
            ]);
        }
        public function store(Request $request)
        {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'source_location_id' => 'nullable|exists:locations,id', 
                'destination_location_id' => 'required|exists:locations,id',
                'quantity' => 'required|integer|min:1',
            ]);
        
            $product = Product::findOrFail($validated['product_id']);
            $sourceLocation = $validated['source_location_id'] ? Location::findOrFail($validated['source_location_id']) : null;
            $destinationLocation = Location::findOrFail($validated['destination_location_id']);
        
            
            if ($sourceLocation && $sourceLocation->branch !== $destinationLocation->branch) {
                return back()->withErrors(['destination_location_id' => 'Destination must be in the same branch as the source.']);
            }
        
            DB::transaction(function () use ($product, $validated, $sourceLocation, $destinationLocation) {
                
                if ($sourceLocation) {
                    $productLocation = $product->locations()->where('location_id', $sourceLocation->id)->first();
                    
                    if (!$productLocation || $productLocation->pivot->quantity < $validated['quantity']) {
                        throw new \Exception('Not enough stock at source location.');
                    }
        
             
                    $product->locations()->updateExistingPivot(
                        $sourceLocation->id,
                        ['quantity' => DB::raw("quantity - {$validated['quantity']}")]
                    );
                }
        
                $destinationProduct = $product->locations()->where('location_id', $destinationLocation->id)->first();
                if ($destinationProduct) {
                    $product->locations()->updateExistingPivot(
                        $destinationLocation->id,
                        ['quantity' => DB::raw("quantity + {$validated['quantity']}")]
                    );
                } else {
                    $product->locations()->attach($destinationLocation->id, ['quantity' => $validated['quantity']]);
                }
        
                ProductTransfer::create([
                    'product_id' => $validated['product_id'],
                    'source_location_id' => $sourceLocation?->id, 
                    'destination_location_id' => $destinationLocation->id,
                    'quantity' => $validated['quantity'],
                ]);
            });
        
            return redirect()->route('products.index')->with('success', 'Product transferred successfully.');
        }
        
}
    