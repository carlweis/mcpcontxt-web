<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\DownloadRequestController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SubscriberController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::post('/subscribe', [SubscriberController::class, 'store'])->name('subscribe');
Route::post('/download/request', DownloadRequestController::class)->name('download.request');
Route::get('/download', DownloadController::class)->name('download')->middleware('signed');

// Redirect /dashboard to /admin for backwards compatibility
Route::redirect('/dashboard', '/admin')->name('dashboard');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', Admin\DashboardController::class)->name('dashboard');
    Route::get('/subscribers', [Admin\SubscriberController::class, 'index'])->name('subscribers');
    Route::get('/subscribers/export', [Admin\SubscriberController::class, 'export'])->name('subscribers.export');
    Route::get('/downloads', Admin\DownloadController::class)->name('downloads');
});

require __DIR__.'/settings.php';
