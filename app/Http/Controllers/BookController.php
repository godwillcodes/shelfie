<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use Illuminate\Http\Request;
use Inertia\Inertia;


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
            'author_id' => 'array', // Ensure 'author_ids' is an array
        ]);
    
        // Log the received data
        \Log::info('Received Data from Inertia:', [
            'name' => $request->input('name'),
            'isbn' => $request->input('isbn'),
            'author_id' => $request->input('author_ids'),
        ]);
    
        // Create a new book with the provided data
        $book = new Book([
            'name' => $request->input('name'),
            'isbn' => $request->input('isbn'),
        ]);
    
        // Save the book
        $book->save();
    
        // Associate the book with the selected authors
        if ($request->input('author_id')) {
            foreach ($request->input('author_id') as $authorId) {
                $author = Author::find($authorId);
                if ($author) {
                    $book->authors()->attach($author->id);
                }
            }
        }
    
        // Redirect back to the books list or a success page
        return redirect()->route('books');
    }

    //show single book details Inertia, depending on the id
    public function show($id)
    {
        $book = Book::with('authors')->find($id);
        // log
        \Log::info('Received Data from Inertia:', [
            'name' => $book->name,
            'isbn' => $book->isbn,
            'author_id' => $book->author_id,
        ]);
        return inertia('Books/ViewBook', ['book' => $book]);
    }
    
    public function test($id)
    {
        $book = Book::with('authors')->find($id);
        $bookData = [
            'id' => $book->id,
            'name' => $book->name,
            'isbn' => $book->isbn,
            'author_ids' => $book->authors->pluck('id')->toArray(), // Get author IDs

        ];
        return inertia('Books/EditBook', ['initialBookData' => $bookData]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'isbn' => 'required|string',
            'author_ids' => 'array', // Ensure 'author_ids' is an array
        ]);

        // Log the received data
        \Log::info('Received Data from Inertia:', [
            'name' => $request->input('name'),
            'id' => $id,
            'isbn' => $request->input('isbn'),
            'author_ids' => $request->input('author_ids'),
        ]);
    
        // Find the book
        $book = Book::find($id);
    
        if (!$book) {
            // Handle the case where the book is not found (e.g., return a 404 response)
            return response()->json(['message' => 'Book not found'], 404);
        }
    
        // Update the book with the provided data
        $book->name = $request->input('name');
        $book->isbn = $request->input('isbn');
    
        // Save the book
        $book->save();
    
        // Sync the book's authors with the selected authors
        if ($request->input('author_ids')) {
            $book->authors()->sync($request->input('author_ids'));
        } else {
            $book->authors()->sync([]);
        }
    
        // Redirect back to the books list or a success page
        return redirect()->route('books');
    }
    
    
    
    
}
