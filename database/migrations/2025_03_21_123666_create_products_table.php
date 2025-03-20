<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up() {
        DB::statement('SET FOREIGN_KEY_CHECKS=1'); 
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image')->nullable(); // Store image path
            $table->integer('stock')->default(0);
            $table->decimal('price', 10, 2);

            // Assuming category_id and status_id are still needed
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('status_id')->constrained('product_statuses')->onDelete('cascade');

            // Adding location-related references
            $table->foreignId('location_id')->nullable()->constrained('locations')->onDelete('set null');
            $table->foreignId('branch_id')->nullable()->constrained('branches')->onDelete('set null');
            $table->foreignId('building_id')->nullable()->constrained('buildings')->onDelete('set null');
            $table->foreignId('room_id')->nullable()->constrained('rooms')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
