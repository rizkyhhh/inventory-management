<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProductTransferController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\FloorController;
use App\Http\Controllers\RoomController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::resource('products', ProductController::class);
Route::resource('locations', LocationController::class);
Route::resource('branches', BranchController::class);
Route::resource('buildings', BuildingController::class);
Route::resource('floors', FloorController::class);
Route::resource('rooms', RoomController::class);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create']);
    Route::post('/products/store', [ProductController::class, 'store']);
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');

    Route::get('/products/{product}/product-transfer', [ProductTransferController::class, 'create'])
    ->name('product-transfers.create');
    Route::post('/products/{product}/product-transfer', [ProductTransferController::class, 'store'])
    ->name('product-transfers.store');

     // Route for DELETE
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

});

// Route::get('/locations/{id}/edit', [LocationController::class, 'edit'])->name('locations.edit');
// Route::put('/locations/{location}', [LocationController::class, 'update'])->name('locations.update');


require __DIR__.'/auth.php';
