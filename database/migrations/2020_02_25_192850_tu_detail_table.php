<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TuDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tu_detail', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('mat', 3)->default('TUD');
            $table->string('id_type_user');
            $table->string('id_menu');
            $table->string('basic_actions')->default("[1,66,71]");
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
        Schema::dropIfExists('tu_detail');
    }
}
