<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductStatus;
use App\Models\Location;
use App\Models\Branch;
use App\Models\Building;
use App\Models\Floor;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller {
    
    public function index() {
        $products = Product::with([
            'category',
            'status',
            'locations',  
            'transfers.sourceLocation', // Corrected relationship
            'transfers.destinationLocation' // Corrected relationship
        ])->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create', [
            'categories' => Category::all(),
            'statuses' => ProductStatus::all(),
            'locations' => Location::all(),
            'branches' => Branch::all(),
            'buildings' => Building::all(),
            'rooms' => Room::all(),
        ]);
    }   

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'status_id' => 'required|exists:product_statuses,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location_id' => 'required|exists:locations,id',
            'branch_id' => 'required|exists:branches,id',
            'building_id' => 'nullable|exists:buildings,id',
            'room_id' => 'nullable|exists:rooms,id'
        ]);

       
        $imagePath = $request->hasFile('image') 
            ? $request->file('image')->store('products', 'public') 
            : null;

   
        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'status_id' => $request->status_id,
            'image' => $imagePath,
            'location_id' => $validated['location_id'],
            'branch_id' => $validated['branch_id'],
            'building_id' => $validated['building_id'],
            'room_id' => $validated['room_id'],
        ]);

        $product->locations()->attach($validated['location_id'], ['quantity' => $product->stock]);

        return redirect()->route('products.index');
    }

    public function edit(Product $product) {
        $product->load(['category', 'status', 'locations', 'branch', 'building', 'room']);
    
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => Category::all(),
            'statuses' => ProductStatus::all(),
            // 'locations' => Location::all(),
            // 'branches' => Branch::all(),
            // 'buildings' => Building::all(),
            // 'rooms' => Room::all(),
            // 'selectedLocationId' => $product->location_id 
        ]);
    }

    public function update(Request $request, Product $product) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'status_id' => 'required|exists:product_statuses,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location_id' => 'required|exists:locations,id',
            'branch_id' => 'required|exists:branches,id',
            'building_id' => 'nullable|exists:buildings,id',
            'room_id' => 'nullable|exists:rooms,id',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::delete('public/' . $product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }
        if ($product->location_id != $validated['location_id']) {
            // Create a transfer entry instead of direct update
            $product->transfers()->create([
                'source_location_id' => $product->location_id,
                'destination_location_id' => $validated['location_id'],
                'quantity' => $product->stock,
            ]);
            $product->update(['location_id' => $validated['location_id']]);
        }
       

        $product->update([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'category_id' => $validated['category_id'],
            'status_id' => $validated['status_id'],
            'image' => $validated['image'] ?? $product->image, // Keep old image if not updated
        ]);

        // $product->locations()->sync([$validated['location_id'] => ['quantity' => $product->stock]]);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product) {
        $product->delete();

        return redirect()->route('products.index');
    }

    public function show(Product $product)
    {
    $product->load([
        'locations' => function ($query) use ($product) {
            $query->withPivot('quantity')->whereHas('products', function ($q) use ($product) {
                $q->where('product_id', $product->id);
            });
        },
        'transfers.sourceLocation',
        'transfers.destinationLocation'
    ]);

    $locations = Location::with(['products' => function ($query) use ($product) {
        $query->where('product_id', $product->id);
    }])->get();


    $product = Product::with(['location', 'branch', 'building', 'room'])->findOrFail($id);
    return inertia('ProductTransfer', [
        'product' => $product,
        'locations' => Location::with(['products' => function ($query) use ($product) {
            $query->where('product_id', $product->id)->withPivot('quantity');
        }])->get(),
        'transfers' => $product->transfers,
    ]);
}
}
