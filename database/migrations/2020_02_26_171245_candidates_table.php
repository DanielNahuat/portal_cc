<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CandidatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_vacancy')->unsigned();
            $table->string('mat', 3)->default('CAN');
            $table->string('name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('mail');
            $table->string('channel');
            $table->string('listening_test');
            $table->string('grammar_test');
            $table->string('typing_test');
            $table->string('personality_test');
            $table->string('recording')->default('');
            $table->string('cv')->default('');
            $table->boolean('status')->default(1);
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
        Schema::dropIfExists('candidates');
    }
}
