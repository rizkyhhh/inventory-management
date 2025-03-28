<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('locations')->insert([
            ['name' => 'Jakarta', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bandung', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Surabaya', 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('locations')->insert($locations);

        $locationIds = DB::table('locations')->pluck('id')->toArray();

      
        $branches = [
            ['name' => 'Pemda', 'location_id' => $locationIds[0], 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Pemprov', 'location_id' => $locationIds[1], 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Jaswita', 'location_id' => $locationIds[2], 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('branches')->insert($branches);

        $branchIds = DB::table('branches')->pluck('id')->toArray();

       
        $buildings = [
            ['name' => 'A', 'branch_id' => $branchIds[0], 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'B', 'branch_id' => $branchIds[1], 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'C', 'branch_id' => $branchIds[2], 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('buildings')->insert($buildings);

       
        $buildingIds = DB::table('buildings')->pluck('id')->toArray();

        $floors = [
            ['name' => '1', 'building_id' => $buildingIds[0], 'created_at' => now(), 'updated_at' => now()],
            ['name' => '2', 'building_id' => $buildingIds[0], 'created_at' => now(), 'updated_at' => now()],
            ['name' => '3', 'building_id' => $buildingIds[1], 'created_at' => now(), 'updated_at' => now()],
            ['name' => '4', 'building_id' => $buildingIds[1], 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('floors')->insert($floors);

        Insert Room data, with building_id assigned from above
        $rooms = [
            ['name' => '1', 'building_id' => $buildingIds[0], 'created_at' => now(), 'updated_at' => now()],
            ['name' => '2', 'building_id' => $buildingIds[0], 'created_at' => now(), 'updated_at' => now()],
            ['name' => '3', 'building_id' => $buildingIds[1], 'created_at' => now(), 'updated_at' => now()],
            ['name' => '4', 'building_id' => $buildingIds[1], 'created_at' => now(), 'updated_at' => now()],
            ['name' => '5', 'building_id' => $buildingIds[2], 'created_at' => now(), 'updated_at' => now()],
            ['name' => '6', 'building_id' => $buildingIds[2], 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('rooms')->insert($rooms);
    }
}
