<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BuildingController extends Controller
{
    public function index()
    {
        $buildings = Building::all();
        return Inertia::render('Buildings/Index', [
            'buildings' => $buildings
        ]);
    }

    public function create()
    {
        return Inertia::render('Buildings/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Building::create($validated);

        return redirect()->route('buildings.index');
    }

    public function edit(Building $building)
    {
        return Inertia::render('Buildings/Edit', [
            'building' => $building
        ]);
    }

    public function update(Request $request, Building $building)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $building->update($validated);

        return redirect()->route('buildings.index');
    }

    public function destroy(Building $building)
    {
        $building->delete();

        return redirect()->route('buildings.index');
    }
}
