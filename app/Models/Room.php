<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['name','building_id']; 

    public function building()
    {
        return $this->belongsTo(Building::class); // Relationship to the Building model
    }
}
