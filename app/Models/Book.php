<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['isbn', 'name'];

    /**
     * The authors that belong to the book.
     */
    public function authors()
    {
        return $this->belongsToMany(Author::class, 'author_book');
    }
}
