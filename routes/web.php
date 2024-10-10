<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\pageController;
use App\Http\Controllers\AjaxController;

Route::get('/', [pageController::class, 'index']);

Route::get('/get-projects-request', [AjaxController::class, 'getProjects'])->name('get.projects.request');
Route::post('/get-projects-by-name-request', [AjaxController::class, 'getProjectsByName'])->name('get.projects.by.name.request');

Route::get('/get-skills-request', [AjaxController::class, 'getSkills'])->name('get.skills.request');
Route::post('/get-skills-by-name-request', [AjaxController::class, 'getSkillsByName'])->name('get.skills.by.name.request');

Route::get('/get-about-me-request', [AjaxController::class, 'getAboutMe'])->name('get.about.me.request');