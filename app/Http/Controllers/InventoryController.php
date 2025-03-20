<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'products' => Product::all(),
        ]);
    }
}
