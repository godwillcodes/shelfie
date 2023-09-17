<?php
namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;


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
        return inertia('Authors/ViewAuthor', ['author' => $author]);
    }

    public function test($id){
        $author = Author::with('books')->find($id);
         // Ensure you retrieve the necessary data
        $authorData = [
            'id' => $author->id,
            'name' => $author->name,
            'book_ids' => $author->books->pluck('id')->toArray(),
        ];
        return inertia('Authors/EditAuthor', ['initialAuthorData' => $authorData]);
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
            'book_ids' => 'array', // Ensure 'book_ids' is an array
        ]);
    
        // Log the received data
        \Log::info('Received Data from Inertia:', [
            'name' => $request->input('name'),
            'book_ids' => $request->input('book_ids'),
        ]);
    
        // Create a new author with the provided data
        $author = new Author([
            'name' => $request->input('name'),
        ]);
    
        // Save the author
        $author->save();
    
        // If book IDs are selected, associate the author with each book
        if ($request->input('book_ids')) {
            foreach ($request->input('book_ids') as $bookId) {
                $book = Book::find($bookId);
                if ($book) {
                    $book->authors()->attach($author->id);
                }
            }
        }
    
        // Redirect back to the authors list or a success page
        return redirect()->route('authors');
    }
    //edit an author
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string',
            'book_ids' => 'array', // Ensure 'book_ids' is an array
        ]);

        // Find the author by ID
        $author = Author::find($id);

        if (!$author) {
            return response()->json(['error' => 'Author not found'], 404);
        }

        // Update the author's name
        $author->name = $request->input('name');
        $author->save();

        // Sync the author's associated books
        if ($request->input('book_ids')) {
            $author->books()->sync($request->input('book_ids'));
        } else {
            // If no books are selected, detach all existing books
            $author->books()->detach();
        }

        // Return a success response or a redirect
        return redirect()->route('authors');
    }


}
