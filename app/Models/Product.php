<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'image', 'stock', 'price', 'category_id', 'status_id', 'location_id', 'branch_id', 'building_id', 'room_id'];

    public function category() {
        return $this->belongsTo(Category::class);
    }
    
    public function status() {
        return $this->belongsTo(ProductStatus::class);
    }

    public function locations() {
        return $this->belongsToMany(Location::class, 'product_location')
                    ->withPivot('quantity')
                    ->withTimestamps();
    }

    public function branch() {
        return $this->belongsTo(Branch::class);
    }
    
    public function building() {
        return $this->belongsTo(Building::class);
    }

    public function floor() {
        return $this->belongsTo(Floor::class);
    }
    
    public function room() {
        return $this->belongsTo(Room::class);
    }

    public function transfers() {
        return $this->hasMany(ProductTransfer::class);
    }
}