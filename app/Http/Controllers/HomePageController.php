<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log; // Import the Log facade

class HomePageController extends Controller
{
    public function index() {
        $baseUrl = config('app.url');
        $apiToken = env('API_TOKEN');
        $apiUrl = env('API_URL');
        return view('main', [
            'baseUrl' => $baseUrl,
            'profilePicture' => $this->fetchProfilePicture($apiToken, $apiUrl),
            'introText' => $this->fetchIntroText($apiToken, $apiUrl)
        ]);
    }

    public function cmsMain() {
        $baseUrl = config('app.url');
        return view('cms-main', [
            'baseUrl' => $baseUrl
        ]);
    }

    private function fetchProfilePicture($apiToken, $apiUrl) {
        $response = Http::withToken($apiToken)
            ->get($apiUrl . 'items/profile_picture');

        // Check response status and handle the response data
        if ($response->successful()) {
            $data = $response->json();

            // Check if data has the expected structure
            if (isset($data['data'][0]['image'])) {
                return $apiUrl . 'assets/' . $data['data'][0]['image'];
            } else {
                Log::error('Unexpected data structure', [
                    'data' => $data
                ]);
            }
        } else {
            Log::error('Failed to fetch profile picture', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
        }
        
        // Return a default image or null if everything fails
        return asset('placeholders/profile_image.png'); // Provide a default path
    }

    private function fetchIntroText($apiToken, $apiUrl) {
        $response = Http::withToken($apiToken)
            ->get($apiUrl . 'items/intro_text');

        // Check response status and handle the response data
        if ($response->successful()) {
            $data = $response->json();

            // Check if data has the expected structure
            if (isset($data['data'][0]['text'])) {
                return $data['data'][0]['text'];
            } else {
                Log::error('Unexpected data structure', [
                    'data' => $data
                ]);
            }
        } else {
            Log::error('Failed to fetch intro text', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
        }
        
        // Return a default text or null if everything fails
        return 'Error met het ophalen van deze tekst...'; // Provide a default text
    }
}