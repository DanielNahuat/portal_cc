<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_trainer')->nullable();
            $table->integer('id_operator')->nullable();
            $table->integer('id_client')->nullable();
            $table->string('mat', 3)->default('SCH');
            $table->string('dayoff')->nullable();
            $table->date('date_start');
            $table->date('date_end');
            $table->integer('type_schedule');
            $table->integer('week');
            $table->integer('month');
            $table->integer('year');
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
        Schema::dropIfExists('schedule');
    }
}
