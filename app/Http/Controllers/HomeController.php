<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('home', [
            'launched' => config('app.launched', false),
            'version' => config('app.version', '1.0.0'),
        ]);
    }
}
