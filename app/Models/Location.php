<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'branch_id', 'building_id', 'floor_id', 'room_id'];

    public function products() {
        return $this->belongsToMany(Product::class, 'product_location')->withPivot('quantity');
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function building()
    {
        return $this->belongsTo(Building::class);
    }

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}





