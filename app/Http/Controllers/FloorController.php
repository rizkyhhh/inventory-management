<?php

namespace App\Http\Controllers;

use App\Models\Floor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FloorController extends Controller
{
    public function index()
    {
        $floors = Floor::all();
        return Inertia::render('Floors/Index', [
            'floors' => $floors
        ]);
    }

    public function create()
    {
        return Inertia::render('Floors/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Floor::create($validated);

        return redirect()->route('floors.index');
    }

    public function edit(Floor $floor)
    {
        return Inertia::render('Floors/Edit', [
            'floor' => $floor
        ]);
    }

    public function update(Request $request, Floor $floor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $floor->update($validated);

        return redirect()->route('floors.index');
    }

    public function destroy(Floor $floor)
    {
        $floor->delete();

        return redirect()->route('floors.index');
    }
}
