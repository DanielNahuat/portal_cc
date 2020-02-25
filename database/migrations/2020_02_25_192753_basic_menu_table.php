<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BasicMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('basic_menu', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('mat', 3)->default('BAM');
            $table->string('name', 100);
            $table->string('icon', 100);
            $table->string('link', 100);
             $table->string('prioridad', 10);
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
        Schema::dropIfExists('basic_menu');
    }
}
