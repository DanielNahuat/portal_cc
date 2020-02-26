<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserTableseed::class);
        $this->call(StatusTableSeed::class);
        $this->call(DaysTableSeed::class);
        $this->call(TypeUserTableSeed::class);
        $this->call(MenuTable::class);
        $this->call(ProfileDetailTable::class);
    }
}