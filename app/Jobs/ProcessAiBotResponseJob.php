<?php

namespace App\Jobs;

use App\Models\Channel;
use App\Models\Message;
use App\Services\GeminiService;
use App\Services\SyncBotService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessAiBotResponseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Channel $channel,
        public string $prompt,
        public array $chatHistory
    ) {}

    /**
     * Execute the job.
     */
    public function handle(GeminiService $gemini, SyncBotService $bot): void
    {
        try {
            // Kita bisa menggunakan system instruction umum atau mendeteksi instruksi khusus berdasarkan prompt
            $systemInstruction = "Kamu adalah SyncBot, asisten AI profesional dan ramah untuk platform StandUp-Sync (Briefly). 
Tugas utamamu adalah membantu tim pengembang perangkat lunak (software engineering) dalam menjalankan stand-up meeting asinkron, melacak progres harian, mendeteksi kendala (blocker), dan memberikan rangkuman yang ringkas serta akurat.

Aturan Komunikasi:
1. Selalu gunakan nada bicara yang profesional, menyemangati, dan ringkas (concise).
2. Format jawabanmu menggunakan Markdown yang rapi (gunakan bullet points, bold untuk penekanan, dan emoji yang relevan seperti 🚀, ⚠️, ✅).
3. Jika ditanya mengenai progres tim, analisis riwayat pesan yang diberikan dan jawab berdasarkan fakta dari data tersebut.
4. Jangan membuat asumsi di luar riwayat pesan yang dilampirkan.";

            if (stripos($this->prompt, 'blocker') !== false) {
                $systemInstruction = "Analisis daftar laporan stand-up harian berikut. 
1. Identifikasi setiap anggota tim yang mencantumkan tag [blocker] atau menyatakan sedang mengalami kendala.
2. Buatkan daftar rincian blocker tersebut dalam bentuk poin-poin.
3. Berikan saran tindakan (action item) singkat atau rekomendasikan siapa anggota tim lain yang mungkin bisa membantu menyelesaikan kendala tersebut.

Format Output yang Diharapkan:
### ⚠️ Laporan Blocker
- **[Nama User]**: [Rincian Blocker] -> *Saran: [Tindakan/Rekomendasi Bantuan]*";
            } elseif (stripos($this->prompt, 'rekap') !== false || stripos($this->prompt, 'summary') !== false) {
                $systemInstruction = "Buatkan rangkuman eksekutif (executive summary) dari seluruh laporan stand-up berikut untuk dibaca oleh Project Owner / Manager.
Rangkum menjadi 3 bagian utama:
1. 🎯 **Pencapaian Utama (Key Accomplishments)**: Fitur atau tugas besar apa saja yang berhasil diselesaikan.
2. ⏳ **Pekerjaan yang Sedang Berjalan (Work In Progress)**: Apa yang sedang fokus dikerjakan saat ini.
3. 🛑 **Kendala & Risiko (Risks & Blockers)**: Kendala utama yang membutuhkan perhatian Owner.";
            }

            // Dapatkan response dari Gemini
            $aiResponse = $gemini->generateResponse($this->prompt, $this->chatHistory, $systemInstruction);

            if ($aiResponse) {
                // Kirim respons kembali ke channel via SyncBotService
                $bot->sendMessage($this->channel, $aiResponse);
            }
        } catch (\Exception $e) {
            Log::error('Gagal memproses ProcessAiBotResponseJob: ' . $e->getMessage());
            // Beri tahu user bahwa bot gagal merespons
            $bot->sendMessage($this->channel, "⚠️ Maaf, saya sedang mengalami gangguan saat mencoba memproses permintaanmu.");
        }
    }
}
