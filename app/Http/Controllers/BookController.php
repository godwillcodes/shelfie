<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('authors')->get();
        $authors = Author::all(); // Fetch all authors to populate the dropdown
        return inertia('Books', ['books' => $books, 'authors' => $authors]);
    }

    public function allBooks()
    {
        $books = Book::all();
        return response()->json(['books' => $books]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'isbn' => 'required|string',
        ]);
    
        // Log the received data
        \Log::info('Received Data from Inertia:', [
            'name' => $request->input('name'),
            'isbn' => $request->input('isbn'),
            'author_id' => $request->input('author_id'),
        ]);
    
        // Create a new book with the provided data
        $book = new Book([
            'name' => $request->input('name'),
            'isbn' => $request->input('isbn'),
        ]);
    
        // Save the book
        $book->save();
    
        // Associate the book with the selected author
        if ($request->input('author_id')) {
            $author = Author::find($request->input('author_id'));
            $book->authors()->attach($author->id);
        }
    
        // Redirect back to the books list or a success page
        return redirect()->route('books');
    }
    
}
