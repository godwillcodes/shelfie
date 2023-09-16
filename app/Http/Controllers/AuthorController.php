<?php
namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
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

    public function allAuthors()
    {
        $authors = Author::all();
        return response()->json(['authors' => $authors]);
    }
    //store a new author
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);
    
        // Log the received data
        \Log::info('Received Data from Inertia:', [
            'name' => $request->input('name'),
            'book_id' => $request->input('book_id'),
        ]);
    
        // Create a new author with the provided data
        $author = new Author([
            'name' => $request->input('name'),
        ]);
    
        // Save the author
        $author->save();
    
        // If a book ID is selected, associate the author with the book
        if ($request->input('book_id')) {
            $book = Book::find($request->input('book_id'));
            $book->authors()->attach($author->id);
        }
    
        // Redirect back to the authors list or a success page
        return redirect()->route('authors');
    }
    
    

}
