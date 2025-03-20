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
            'floors' => Floor::all(),
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
            'location_id' => 'required|exists:locations,id'
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
        ]);

        $product->locations()->attach($validated['location_id'], ['quantity' => $product->stock]);

        return redirect()->route('products.index');
    }

    public function edit(Product $product) {
        return Inertia::render('Products/Edit', [
            'product' => $product->load(['locations']),
            'categories' => Category::all(),
            'statuses' => ProductStatus::all(),
            'locations' => Location::all(),
        ]);
    }

    public function update(Request $request, Product $product) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'status_id' => 'required|exists:product_statuses,id',
            'location_id' => 'required|exists:locations,id'
        ]);

        $product->update($validated);

        $product->locations()->sync([$validated['location_id'] => ['quantity' => $product->stock]]);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product) {
        $product->delete();

        return redirect()->route('products.index');
    }
}
