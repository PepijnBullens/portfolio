<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\AjaxController;

Route::get('/', [HomePageController::class, 'index']);

Route::get('/get-projects-request', [AjaxController::class, 'getProjects'])->name('get.projects.request');
Route::post('/get-projects-by-name-request', [AjaxController::class, 'getProjectsByName'])->name('get.projects.by.name.request');