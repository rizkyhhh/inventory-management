<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Branch;
use App\Models\Building;
use App\Models\Floor;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::with(['branch', 'building', 'floor', 'room'])->get();

        return Inertia::render('Locations/Index', [
        'locations' => $locations
    ]);
    }

    public function create()
    {
        return Inertia::render('Locations/Create', [
            'branches' => Branch::all(),
            'buildings' => Building::all(),
            'floors' => Floor::all(),
            'rooms' => Room::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'branch' => 'required|string|max:255',
            'building' => 'required|string|max:255',
            'floor' => 'required|string|max:255',
            'room' => 'required|string|max:255',
        ]);

       $branch = Branch::create([
        'name' => $validated['branch'],
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $building = Building::create([
        'name' => $validated['building'],
        'branch_id' => $branch->id,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $floor = Floor::create([
        'name' => $validated['floor'],
        'building_id' => $building->id,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    $room = Room::create([
        'name' => $validated['room'],
        'floor_id' => $floor->id,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $location = Location::create([
        'name' => $validated['name'],
        'branch_id' => $branch->id,
        'building_id' => $building->id,
        'floor_id' => $floor->id,
        'room_id' => $room->id,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    

        return redirect()->route('locations.index');
    }

    
    public function show(Location $location)
    {
       
    }

    
    public function edit(Location $location)
    {
        $branches = Branch::all();
        $buildings = Building::all();
        $floors = Floor::all();
        $rooms = Room::all();
    
        return Inertia::render('Locations/Edit', [
            'location' => $location,
            'branches' => $branches,
            'buildings' => $buildings,
            'floors' => $floors,
            'rooms' => $rooms,
        ]);
    }

    
    public function update(Request $request, Location $location)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'branch_id' => 'required|exists:branches,id',
            'building_id' => 'required|exists:buildings,id',
            'floor_id' => 'required|exists:floors,id',
            'room_id' => 'required|exists:rooms,id',
        ]);

        $location->update([
            'name' => $validated['name'],
            'branch_id' => $validated['branch_id'],
            'building_id' => $validated['building_id'],
            'floor_id' => $validated['floor_id'],
            'room_id' => $validated['room_id'],
        ]);

        return redirect()->route('locations.index');
    }

   
    public function destroy(Location $location)
    {
        $location->delete();
        return redirect()->route('locations.index');
    }
}
