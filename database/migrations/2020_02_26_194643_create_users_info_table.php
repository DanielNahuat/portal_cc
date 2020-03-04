<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_info', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('mat', 3)->default('INF');
            $table->integer('id_user');
            $table->string('name');
            $table->string('last_name');
            $table->string('address')->nullable();
            $table->string('phone');
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_phone')->nullable();
            $table->string('notes')->nullable();
            $table->string('description')->nullable();
            $table->string('gender');
            $table->string('birthdate');
            $table->string('profile_picture')->nullable();
            $table->date('entrance_date')->nullable();
            $table->string('biotime_status')->nullable();
            $table->string('access_code')->nullable();
            

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
        Schema::dropIfExists('users_info');
    }
}
