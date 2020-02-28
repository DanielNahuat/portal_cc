<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailScheduleTraining extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('training_schedule_detail', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('mat', 3)->default('TSD');
            $table->integer('id_user');
            $table->integer('id_schedule');
            $table->integer('id_day');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('options');
            $table->integer('status')->default(1);
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
        Schema::dropIfExists('training_schedule_detail');
    }
}
