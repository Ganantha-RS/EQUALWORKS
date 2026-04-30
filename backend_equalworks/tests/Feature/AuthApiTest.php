<?php

use App\Models\User;

test('users can register and receive a token', function () {
    $this->postJson('/api/auth/register', [
        'name' => 'Mawar',
        'email' => 'mawar@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ])
        ->assertCreated()
        ->assertJsonPath('user.email', 'mawar@example.com')
        ->assertJsonStructure(['token']);
});

test('users can login and logout', function () {
    User::factory()->create([
        'email' => 'test@example.com',
        'password' => 'password123',
    ]);

    $token = $this->postJson('/api/auth/login', [
        'email' => 'test@example.com',
        'password' => 'password123',
    ])
        ->assertSuccessful()
        ->json('token');

    $this->withToken($token)
        ->getJson('/api/auth/me')
        ->assertSuccessful()
        ->assertJsonPath('data.email', 'test@example.com');

    $this->withToken($token)
        ->postJson('/api/auth/logout')
        ->assertSuccessful();
});

test('protected routes reject guests', function () {
    $this->getJson('/api/enrollments')->assertUnauthorized();
});
