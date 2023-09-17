<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Author extends Model
{
    use LogsActivity;
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];
    public $timestamps = true;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'created_at', 'updated_at'      
        ]);
    }

    /**
     * The books that belong to the author.
     */
    public function books()
    {
        // return $this->hasMany(Book::class);
        return $this->belongsToMany(Book::class, 'author_book');
    }

}
