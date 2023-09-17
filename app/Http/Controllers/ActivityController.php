<?php

namespace App\Http\Controllers;
use App\Models\User;

use Spatie\Activitylog\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function getAllLogs()
    {
        // Query all activity logs and users from the database
        $activityLogs = Activity::with('causer')->get();
        $users = User::all();
        // Pass the activityLogs and users data to the 'ActivityLog' component
        return inertia('ActivityLog', ['activityLogs' => $activityLogs, 'users' => $users]);
        
    }
}
