<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ShceduleDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_detail', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_schedule')->nullable();
            $table->integer('id_operator')->nullable();
            $table->integer('id_day')->nullable();
            $table->string('mat', 3)->default('SCD');
            $table->time('time_start');
            $table->date('time_end');
            $table->integer('type_schedule');
            $table->integer('option');
            $table->integer('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule_detail');
    }
}
