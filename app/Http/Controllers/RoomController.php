<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::all();
        return Inertia::render('Rooms/Index', [
            'rooms' => $rooms
        ]);
    }

    public function create()
    {
        return Inertia::render('Rooms/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Room::create($validated);

        return redirect()->route('rooms.index');
    }

    public function edit(Room $room)
    {
        return Inertia::render('Rooms/Edit', [
            'room' => $room
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $room->update($validated);

        return redirect()->route('rooms.index');
    }

    public function destroy(Room $room)
    {
        $room->delete();

        return redirect()->route('rooms.index');
    }
}
