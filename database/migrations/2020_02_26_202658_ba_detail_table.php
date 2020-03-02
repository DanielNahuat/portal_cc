<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BaDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ba_detail', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('mat', 3)->default('BAD');
            $table->string('id_tu_detail');
            $table->string('id_basic_actions');
            $table->string('id_menu');
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
        Schema::dropIfExists('ba_detail');
    }
}
