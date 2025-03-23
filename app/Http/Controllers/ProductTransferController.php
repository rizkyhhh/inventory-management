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
        public function create(Product $product) {
            return Inertia::render('Products/TransferProduct', [
                'product' => $product->load('locations'),
                'locations' => Location::all()->map(function ($location) {
                    return [
                        'id' => $location->id,
                        'name' => $location->name,
                        'branch_name' => $location->branch ? $location->branch->name : null,
                        'building_name' => $location->building ? $location->building->name : null,
                        'floor_name' => $location->floor ? $location->floor->name : null,
                        'room_name' => $location->room ? $location->room->name : null,
                    ];
                }),  
                
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
        
            $productId = $validated['product_id'];
            $sourceLocationId = $validated['source_location_id'];
            $destinationLocationId = $validated['destination_location_id'];
            $quantity = $validated['quantity'];
        
            DB::beginTransaction();
        
            try {
                // 🛠 Reduce stock from source location (if exists)
                if ($sourceLocationId) {
                    $sourceStock = DB::table('product_location')
                        ->where('product_id', $productId)
                        ->where('location_id', $sourceLocationId)
                        ->value('quantity');
        
                    if ($sourceStock < $quantity) {
                        return redirect()->back()->withErrors(['quantity' => 'Not enough stock in source location.']);
                    }
        
                    DB::table('product_location')
                        ->where('product_id', $productId)
                        ->where('location_id', $sourceLocationId)
                        ->update([
                            'quantity' => DB::raw("quantity - $quantity"),
                            'updated_at' => now(),
                        ]);
                }
        
                // 🛠 Increase stock in destination location
                $destinationStock = DB::table('product_location')
                    ->where('product_id', $productId)
                    ->where('location_id', $destinationLocationId)
                    ->first();
        
                if ($destinationStock) {
                    DB::table('product_location')
                        ->where('product_id', $productId)
                        ->where('location_id', $destinationLocationId)
                        ->update([
                            'quantity' => DB::raw("quantity + $quantity"),
                            'updated_at' => now(),
                        ]);
                } else {
                    DB::table('product_location')->insert([
                        'product_id' => $productId,
                        'location_id' => $destinationLocationId,
                        'quantity' => $quantity,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
        
                // 🛠 Log transfer
                DB::table('product_transfers')->insert([
                    'product_id' => $productId,
                    'source_location_id' => $sourceLocationId,
                    'destination_location_id' => $destinationLocationId,
                    'quantity' => $quantity,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
        
                DB::commit();
                return redirect()->route('products.index')->with('success', 'Product transferred successfully.');
            } catch (\Exception $e) {
            
                    DB::rollBack();
                    // Log the exception message and stack trace
                    \Log::error('Product transfer failed: ' . $e->getMessage());
                    \Log::error('Stack trace: ' . $e->getTraceAsString());
                
                    return redirect()->back()->withErrors(['error' => 'An error occurred while transferring the product.']);

            }
        }
        
}
    