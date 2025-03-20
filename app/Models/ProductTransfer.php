<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTransfer extends Model {
    use HasFactory;

    protected $fillable = ['product_id', 'source_location_id', 'destination_location_id', 'quantity'];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function sourceLocation() {
        return $this->belongsTo(Location::class, 'source_location_id');
    }

    public function destinationLocation() {
        return $this->belongsTo(Location::class, 'destination_location_id');
    }
    
}
