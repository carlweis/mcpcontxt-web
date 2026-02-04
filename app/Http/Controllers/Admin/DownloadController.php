<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Download;
use Inertia\Inertia;
use Inertia\Response;

class DownloadController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/downloads', [
            'downloads' => Download::latest()->paginate(50),
        ]);
    }
}
