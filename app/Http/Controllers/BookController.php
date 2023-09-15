<?php

namespace App\Http\Controllers;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        //return all books to inertia
        $books = Book::all();
        return inertia('Books', ['books' => $books]);
    }
    
}

