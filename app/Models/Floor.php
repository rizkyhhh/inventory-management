<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Floor extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'building_id']; // Add building_id to fillable

    public function building()
    {
        return $this->belongsTo(Building::class); // Relationship to the Building model
    }
}
