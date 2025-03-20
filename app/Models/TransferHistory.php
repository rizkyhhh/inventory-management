<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransferHistory extends Model {
    use HasFactory;
    protected $fillable = ['product_id', 'previous_location', 'new_location', 'quantity', 'transferred_at'];

    public function product() {
        return $this->belongsTo(Product::class);
    }
}

