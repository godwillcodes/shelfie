<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use App\Models\Book;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'authors' => Author::count(),
            'books' => Book::count(),
            'users' => User::count(),
        ];
        return inertia('Dashboard', ['data' => $data]);
    }
}

