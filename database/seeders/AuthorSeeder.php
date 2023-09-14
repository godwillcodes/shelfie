<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Author;
use App\Models\Book;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create authors
        $authors = [
            ['name' => 'Harper Lee'],
            ['name' => 'George Orwell'],
            ['name' => 'F. Scott Fitzgerald'],
            ['name' => 'Jane Austen'],
            ['name' => 'J.D. Salinger'],
            ['name' => 'J.R.R. Tolkien'],
            ['name' => 'J.K. Rowling'],
            ['name' => 'Dan Brown'],
            ['name' => 'Paulo Coelho'],
        ];

        foreach ($authors as $authorData) {
            $author = Author::create($authorData);

            // Create books and associate them with the author
            $books = [];
            switch ($authorData['name']) {
                case 'Harper Lee':
                    $books[] = [
                        'name' => 'To Kill a Mockingbird',
                        'isbn' => 'ISBN1',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    break;

                case 'George Orwell':
                    $books[] = [
                        'name' => '1984',
                        'isbn' => 'ISBN2',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    break;

                case 'F. Scott Fitzgerald':
                    $books[] = [
                        'name' => 'The Great Gatsby',
                        'isbn' => 'ISBN3',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    break;

                case 'Jane Austen':
                    $books[] = [
                        'name' => 'Pride and Prejudice',
                        'isbn' => 'ISBN4',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    break;

                case 'J.D. Salinger':
                    $books[] = [
                        'name' => 'The Catcher in the Rye',
                        'isbn' => 'ISBN5',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    break;

                case 'J.R.R. Tolkien':
                    $books[] = [
                        'name' => 'The Lord of the Rings',
                        'isbn' => 'ISBN6',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    $books[] = [
                        'name' => 'The Hobbit',
                        'isbn' => 'ISBN7',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    break;

                case 'J.K. Rowling':
                    $books[] = [
                        'name' => 'Harry Potter and the Sorcerer\'s Stone',
                        'isbn' => 'ISBN8',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    break;

                case 'Dan Brown':
                    $books[] = [
                        'name' => 'The Da Vinci Code',
                        'isbn' => 'ISBN9',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    break;

                case 'Paulo Coelho':
                    $books[] = [
                        'name' => 'The Alchemist',
                        'isbn' => 'ISBN10',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    break;

                // Add more authors and books here...
            }

            foreach ($books as $bookData) {
                $book = new Book($bookData);
                $book->created_at = $bookData['created_at'];
                $author->books()->save($book);
            }
        }
    }
}
