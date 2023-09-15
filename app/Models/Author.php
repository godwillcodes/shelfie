<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    /**
     * The books that belong to the author.
     */
    public function books()
    {
        // return $this->hasMany(Book::class);
        return $this->belongsToMany(Book::class, 'author_book');
    }

}
