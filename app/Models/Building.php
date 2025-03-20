<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function locations()
    {
        return $this->hasMany(Location::class);
    }
    public function floors()
    {
        return $this->hasMany(Floor::class); // Relationship to the Floor model
    }
    public function rooms()
    {
        return $this->hasMany(Room::class); // Relationship to the Floor model
    }
}
