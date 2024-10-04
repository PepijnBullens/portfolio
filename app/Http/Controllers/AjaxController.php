<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log; // Import the Log facade

class AjaxController extends Controller
{
    public function getProjects()
    {
        $apiToken = env('API_TOKEN');
        $apiUrl = env('API_URL');

        $response = Http::withToken($apiToken)
        ->get($apiUrl . 'items/portfolio_projects', [
            'filter[is_private][_eq]' => '0',
            'sort' => 'order_number'
        ]);

        // Check response status and handle the response data
        if ($response->successful()) {
            $data = $response->json();

            $returnedData = [];
            foreach($data['data'] as $key => $item) {
                $returnedData[$key] = [
                    'date_created' => $item['date_created'],
                    'title' => $item['title'],
                    'description' => $item['description'],
                    'project_link' => $item['project_link'],
                ];
    
                $projectId = $item['id'];
    
                $itemResponse = Http::withToken($apiToken)
                ->get($apiUrl . 'items/portfolio_image', [
                    'filter[project_id][_eq]' => $projectId
                ]);
        
                // Check response status and handle the response data
                if ($itemResponse->successful()) {
                    $itemData = $itemResponse->json();
    
                    foreach($itemData['data'] as $image) {
                        $returnedData[$key]['images'][] = $apiUrl . 'assets/' . $image['image'];
                    }
                } else {
                    Log::error('Failed to fetch projects', [
                        'status' => $response->status(),
                        'body' => $response->body()
                    ]);
                }
            }
            return response()->json($returnedData);
        } else {
            Log::error('Failed to fetch projects', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
        }
        
        // Return an empty array if everything fails
        return response()->json([]);
    }
}