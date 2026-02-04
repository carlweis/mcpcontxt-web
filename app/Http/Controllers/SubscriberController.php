<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:subscribers'],
        ]);

        Subscriber::create([
            'email' => $request->email,
            'source' => $request->source ?? 'website',
        ]);

        return back()->with('success', "You're on the list!");
    }
}
