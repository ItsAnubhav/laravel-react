<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Create roles
        $roles = config('app-settings.roles');
        foreach ($roles as $role => $description) {
            Role::create([
                'name' => $role,
                'guard_name' => 'web'
            ]);
        }
        //create admin
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'status' => 'active',
            'theme_preference' => 'light',
            'gender' => 'male',
            'phone' => '1234567890',
            'date_of_birth' => '1990-01-01',
            'country_code' => 'US'
        ]);

        //create users
        User::factory(99)->create();

        //assign roles
        $users = User::all();

        foreach ($users as $user) {
            $user->assignRole('user');
        }
        $user->first()->assignRole('admin');
    }
}
