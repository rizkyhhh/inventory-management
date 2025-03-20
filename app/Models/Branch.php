<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;
    

    protected $fillable = ['name'];

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    protected static function boot() {
        parent::boot();

        static::creating(function ($branch) {
            $branch->id = Str::uuid(); // Generate a unique ID
        });
    }
}
