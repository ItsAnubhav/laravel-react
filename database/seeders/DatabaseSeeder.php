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

        //create users
        User::factory(100)->create();

        //assign roles
        $users = User::all();

        foreach ($users as $user) {
            $user->assignRole('user');
        }
        $user->first()->assignRole('admin');
    }
}
