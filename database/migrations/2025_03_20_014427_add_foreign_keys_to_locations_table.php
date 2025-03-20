<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('locations', function (Blueprint $table) {
            $table->unsignedBigInteger('branch_id')->nullable()->after('name');
            $table->unsignedBigInteger('building_id')->nullable()->after('branch_id');
            $table->unsignedBigInteger('floor_id')->nullable()->after('building_id');
            $table->unsignedBigInteger('room_id')->nullable()->after('floor_id');
    
            // Add foreign key constraints
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
            $table->foreign('building_id')->references('id')->on('buildings')->onDelete('cascade');
            $table->foreign('floor_id')->references('id')->on('floors')->onDelete('cascade');
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('locations', function (Blueprint $table) {
            //
        });
    }
};
