<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ScheduleTimeClock extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_time_clock', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_schedule')->nullable();
            $table->integer('id_schedule_detail')->nullable();
            $table->integer('id_operator')->nullable();
            $table->integer('id_client')->nullable();
            $table->dateTime('date_start')->nullable();
            $table->dateTime('date_end')->nullable();
            $table->float('duration')->nullable();
            $table->integer('type');
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
        Schema::dropIfExists('schedule_time_clock');
    }
}
