<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       //create user godwill, password 123456781, secured as safely as possible, without calling another seedeer

        $user = \App\Models\User::factory()->create([
            'name' => 'Godwill',
            'email' => 'godwill@belvadigital.com',
            'password' => bcrypt('123456781'),
        ]);
       
    }
}
