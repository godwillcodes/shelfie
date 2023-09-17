<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\ActivityController;
use Spatie\Activitylog\Models\Activity;
use App\Models\User;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/books', function () {
    return Inertia::render('Books');
})->middleware(['auth', 'verified'])->name('books');

Route::get('/authors', function () {
    return Inertia::render('Authors');
})->middleware(['auth', 'verified'])->name('authors');

Route::get('/activity-log', function () {
    // Fetch the activity logs data from the database
    $activityLogs = Activity::with('causer')->get();
        $users = User::all();
        // Pass the activityLogs and users data to the 'ActivityLog' component
        return inertia('ActivityLog', ['activityLogs' => $activityLogs, 'users' => $users]);
})->middleware(['auth', 'verified'])->name('ActivityLog');

//route for adding books
Route::get('/add-book', function () {
    return Inertia::render('Books/AddBook');
})->middleware(['auth', 'verified'])->name('addbook');

//route for adding authors
Route::get('/add-author', function () {
    return Inertia::render('Authors/AddAuthor');
})->middleware(['auth', 'verified'])->name('addauthor');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/books', [BookController::class, 'index'])->name('books');
Route::get('/authors', [AuthorController::class, 'index'])->name('authors');
Route::get('/list-authors', [AuthorController::class, 'allAuthors'])->name('allauthors');
Route::post('/add-book', [BookController::class, 'store'])->name('addbook');
Route::post('/add-author', [AuthorController::class, 'store'])->name('addauthor');
Route::get('/list-books', [BookController::class, 'allBooks'])->name('allbooks');
Route::get('/view-book/{id}', [BookController::class, 'show'])->name('viewbook');
Route::get('/view-author/{id}', [AuthorController::class, 'show'])->name('viewauthor');
//update author endpoints
Route::get('/update-author/{id}', [AuthorController::class, 'test'])->name('updateauthor');
Route::put('/update-author-deets/{id}', [AuthorController::class, 'update'])->name('updateauthordeets');
//update book endpoints
Route::get('/update-book/{id}', [BookController::class, 'test'])->name('updatebook');
Route::put('/update-book-deets/{id}', [BookController::class, 'update'])->name('updatebookdeets');
//get activity logs
Route::get('/activity-logss', [ActivityController::class, 'getAllLogs'])->name('activitylogs');

require __DIR__.'/auth.php';
