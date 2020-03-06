<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTOrCDurationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_or_C_duration', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('mat', 3)->default('TCD');
            $table->integer('id_trainer');
            $table->date('date_start');
            $table->date('date_end');
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
        Schema::dropIfExists('T_or_C_duration');
    }
}
