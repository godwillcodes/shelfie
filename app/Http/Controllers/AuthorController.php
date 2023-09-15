<?php

namespace App\Http\Controllers;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::with('books')->get();
        return inertia('Authors', ['authors' => $authors]);
    }
    
    public function show($id)
    {
        $author = Author::with('books')->find($id);
        return inertia('Author', ['author' => $author]);
    }
}
