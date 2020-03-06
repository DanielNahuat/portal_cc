<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMirrorUserScheduleDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mirror_user_schedule_detail', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_schedule')->nullable();
            $table->integer('id_operator')->nullable();
            $table->integer('id_day')->nullable();
            $table->string('mat', 3)->default('MSD');
            $table->time('time_start');
            $table->time('time_end');
            $table->integer('type_daily');
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
        Schema::dropIfExists('mirror_user_schedule_detail');
    }
}
