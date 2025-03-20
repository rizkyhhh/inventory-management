<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationBranchBuildingRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Locations
        $locations = ['Jakarta', 'Bandung', 'Surabaya'];
        
        // Branches
        $branches = ['Pemda', 'Pemprov', 'Jaswita'];
        
        // Buildings
        $buildings = ['A', 'B', 'C'];
        
        // Rooms
        $rooms = [1, 2, 3, 4];
        
        $data = [];
        
        // Loop through locations, branches, buildings, and rooms to build the array
        foreach ($locations as $location) {
            foreach ($branches as $branch) {
                foreach ($buildings as $building) {
                    foreach ($rooms as $room) {
                        $data[] = [
                            'name' => $location,
                            'branch' => $branch,
                            'building' => $building,
                            'room' => $room,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
            }
        }

        // Bulk insert the data into the database
        DB::table('locations')->insert($data);
    }
}
