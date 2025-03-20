<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\ProductStatus;

class CategoryAndStatusSeeder extends Seeder {
    public function run() {
        Category::insert([
            ['name' => 'Electronics'],
            ['name' => 'Furniture'],
            ['name' => 'Office Supplies']
        ]);

        ProductStatus::insert([
            ['status' => 'Good Condition'],
            ['status' => 'Needs Repair']
        ]);
    }
}

