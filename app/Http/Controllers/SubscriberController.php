<?php

namespace App\Http\Controllers;

use App\Mail\NewSubscriberNotification;
use App\Mail\WaitlistConfirmation;
use App\Models\Subscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubscriberController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:subscribers'],
        ]);

        $subscriber = Subscriber::create([
            'email' => $request->email,
            'source' => $request->source ?? 'website',
        ]);

        Mail::to($subscriber->email)->queue(new WaitlistConfirmation);
        Mail::to(config('mcpcontxt.admin_notification_email'))->queue(new NewSubscriberNotification($subscriber));

        return back()->with('success', "You're on the list!");
    }
}
