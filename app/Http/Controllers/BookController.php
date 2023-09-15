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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'isbn' => 'required|string',
            'author_id' => 'required|exists:authors,id',
        ]);

        // Log the received data
        \Log::info('Received Data from Inertia:', [
            'name' => $request->input('name'),
            'isbn' => $request->input('isbn'),
            'author_id' => $request->input('author_id'),
        ]);

        // Create a new book with the provided data -there is a problem here
        $book = new Book([
            'name' => $request->input('name'),
            'isbn' => $request->input('isbn'),
        ]);

        // Associate the book with the selected author
        $author = Author::find($request->input('author_id'));
        $author->books()->save($book);

        // Redirect back to the books list or a success page
        return redirect()->route('books');
    }
}
