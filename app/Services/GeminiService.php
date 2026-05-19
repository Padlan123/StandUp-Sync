<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
    protected $model;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key');
        $this->model = config('services.gemini.model', 'gemini-1.5-flash');
    }

    /**
     * Kirim prompt ke Gemini dan dapatkan teks jawaban
     */
    public function generateResponse(string $prompt, array $chatHistory = [], string $systemInstruction = null): ?string
    {
        $url = "{$this->baseUrl}/{$this->model}:generateContent?key={$this->apiKey}";

        // Susun contents (riwayat + prompt baru)
        $contents = [];
        foreach ($chatHistory as $msg) {
            $contents[] = [
                'role' => $msg['role'], // 'user' atau 'model'
                'parts' => [['text' => $msg['content']]]
            ];
        }
        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $prompt]]
        ];

        $payload = [
            'contents' => $contents,
            'generationConfig' => [
                'temperature' => (float) config('services.gemini.temperature', 0.7),
                'maxOutputTokens' => (int) config('services.gemini.max_tokens', 2048),
            ]
        ];

        // Tambahkan system instruction jika ada
        if ($systemInstruction) {
            $payload['systemInstruction'] = [
                'parts' => [['text' => $systemInstruction]]
            ];
        }

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($url, $payload);

            if ($response->successful()) {
                $data = $response->json();
                return $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
            }

            Log::error('Gemini API Error: ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('Gemini Service Exception: ' . $e->getMessage());
            return null;
        }
    }
}
