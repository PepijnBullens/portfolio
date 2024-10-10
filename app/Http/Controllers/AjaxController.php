<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log; // Import the Log facade
use DateTime;

class AjaxController extends Controller
{
    public function getAboutMe()
    {
        return $this->getAboutMeData();
    }

    private function getAboutMeData() {
        $apiToken = env('API_TOKEN');
        $apiUrl = env('API_URL');

        $filter = [
            'sort' => 'order_number'
        ];

        $response = Http::withToken($apiToken)
        ->get($apiUrl . 'items/about_me', $filter);

        // Check response status and handle the response data
        if ($response->successful()) {
            $data = $response->json();
            foreach($data['data'] as $key => $item) {
                $returnedData[$key] = [
                    'title' => $item['title'],
                    'image' => $apiUrl . 'assets/' . $item['image'],
                    'description' => $item['description']
                ];
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

    public function getSkillsByName(Request $request) {

        $query = $request->input('query');

        return $this->getSkillsData($query);
    }

    public function getSkills()
    {
        return $this->getSkillsData();
    }

    private function getSkillsData($query = null) {
        $apiToken = env('API_TOKEN');
        $apiUrl = env('API_URL');

        $filter = [
            'fields' => '*,portfolio_skills.*',
            'sort' => 'order_number'
        ];

        if ($query) {
            $filter['filter[name][_contains]'] = $query;
        }

        $response = Http::withToken($apiToken)
        ->get($apiUrl . 'items/skills', $filter);

        // Check response status and handle the response data
        if ($response->successful()) {
            $data = $response->json();

            $returnedData = [];
            foreach($data['data'] as $key => $item) {
                $inFuture = false;
                $date = $item['date'];
                $startDate = new DateTime($date);
                $currentDate = new DateTime();
                $interval = $startDate->diff($currentDate);
                $years = $interval->y;
                $months = $interval->m;

                $returnedDate = '';

                if ($startDate > $currentDate) {
                    $inFuture = true;
                }

                if (!$inFuture) {
                    if($years > 0) { 
                        $returnedDate .= $years . " jaar"; 
                    } 
                    if($years > 0 && $months > 0) { 
                        $returnedDate .= " en "; 
                    }
                    if ($months == 1) { 
                        $returnedDate .= $months . " maand";
                    } else if ($months > 1) {
                        $returnedDate .= $months . " maanden"; 
                    } else if($years == 0 && $months == 0) {
                        $returnedDate .= 'minder dan 1 maand';
                    }
                    $returnedDate .= ' ervaring';
                } else {
                    $returnedDate .= 'toekomstige vaardigheid';
                } 

                $returnedData[$key] = [
                    'name' => $item['name'],
                    'image' => $apiUrl . 'assets/' . $item['image'],
                    'date' => $returnedDate
                ];
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

    public function getProjects()
    {
        return $this->getProjectsData();
    }

    private function getProjectsData() {
        $apiToken = env('API_TOKEN');
        $apiUrl = env('API_URL');

        $filter = [
            'fields' => '*.*.*'
        ];

        $response = Http::withToken($apiToken)
        ->get($apiUrl . 'items/portfolio_relations', $filter);

        // Check response status and handle the response data
        if ($response->successful()) {
            $data = $response->json();
            $returnedData = [];

            foreach($data['data'] as $item) {
                if($item['project_id'][0]['portfolio_projects_id']['is_private'] === false) {
                    $skills = [];
                    $images = [];
    
                    foreach($item['skill_ids'] as $key => $skill) {
                        $skills[$key] = [
                            'name' => $skill['skills_id']['name'],
                            'image' => $apiUrl . 'assets/' . $skill['skills_id']['image']
                        ];
                    }
    
                    foreach($item['image_ids'] as $key => $image) {
                        $images[$key] = $apiUrl . 'assets/' . $image['portfolio_image_id']['image'];
                    }
    
                    $returnedData[] = [
                        'title' => $item['project_id'][0]['portfolio_projects_id']['title'],
                        'description' => $item['project_id'][0]['portfolio_projects_id']['description'],
                        'images' => $images,
                        'skills' => $skills
                    ];
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