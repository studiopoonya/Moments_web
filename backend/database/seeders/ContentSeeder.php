<?php

namespace Database\Seeders;

use App\Models\BookingStep;
use App\Models\ClientBrand;
use App\Models\Faq;
use App\Models\HeroWord;
use App\Models\Package;
use App\Models\PortfolioItem;
use App\Models\Product;
use App\Models\SpecialOffer;
use App\Models\Testimonial;
use App\Models\WhyUsItem;
use Illuminate\Database\Seeder;

// Seeds the content that used to be hardcoded in the frontend's i18n files,
// so the admin-managed tables start out matching what was already live on
// the landing page instead of showing up empty.
class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedProducts();
        $this->seedPackages();
        $this->seedClients();
        $this->seedTestimonials();
        $this->seedPortfolio();
        $this->seedSpecialOffers();
        $this->seedFaqs();
        $this->seedHeroWords();
        $this->seedWhyUsItems();
        $this->seedBookingSteps();
    }

    private function seedProducts(): void
    {
        if (Product::count() > 0) {
            return;
        }

        $items = [
            [
                'badge' => 'Photobooth Event',
                'name' => 'Photobooth Event',
                'description' => 'Photobooth klasik andalan kami — desain rounded compact bernuansa mewah, cocok untuk wedding, birthday, hingga corporate event.',
                'tags' => ['Unlimited Print', 'Ring Light Custom', 'Semua Jenis Acara'],
            ],
            [
                'badge' => 'AI Photobooth',
                'name' => 'AI Photobooth',
                'description' => 'Photobooth dengan sentuhan teknologi AI untuk pengalaman foto yang lebih personal dan interaktif.',
                'tags' => [],
            ],
            [
                'badge' => 'Mingle Photobooth',
                'name' => 'Mingle Photobooth',
                'description' => 'Photobooth yang bisa berkeliling menemani tamu bersosialisasi di sepanjang acara.',
                'tags' => [],
            ],
            [
                'badge' => 'Virtual Photobooth',
                'name' => 'Virtual Photobooth',
                'description' => 'Photobooth virtual untuk menjangkau tamu yang hadir secara online di acara hybrid kamu.',
                'tags' => [],
            ],
        ];

        foreach ($items as $i => $item) {
            Product::create([...$item, 'sort_order' => $i]);
        }
    }

    private function seedPackages(): void
    {
        if (Package::count() > 0) {
            return;
        }

        $items = [
            ['emoji' => '🎞️', 'name' => 'Paket 2 Jam', 'meta' => '2 Jam · Cetak 2R atau 4R', 'price' => 'Rp1.799.000', 'description' => 'Cocok untuk acara kecil hingga menengah tanpa mengurangi kualitas.', 'highlight' => false],
            ['emoji' => '⭐', 'name' => 'Paket 3 Jam', 'meta' => '3 Jam · Cetak 2R atau 4R', 'price' => 'Rp2.299.000', 'description' => 'Pilihan paling populer untuk semua jenis acara.', 'highlight' => true],
            ['emoji' => '🎉', 'name' => 'Bundling Photo + Video', 'meta' => '3 Jam · Photobooth + Videobooth', 'price' => 'Rp4.150.000', 'description' => 'Ideal untuk pernikahan dan event besar yang ingin dokumentasi lengkap.', 'highlight' => false],
            ['emoji' => '✨', 'name' => 'Paket Custom', 'meta' => 'Durasi & setup fleksibel', 'price' => 'Contact Us', 'description' => 'Penawaran khusus untuk kebutuhan korporat atau acara skala besar.', 'highlight' => false],
        ];

        foreach ($items as $i => $item) {
            Package::create([...$item, 'sort_order' => $i]);
        }
    }

    private function seedClients(): void
    {
        if (ClientBrand::count() > 0) {
            return;
        }

        $names = ['Moeloet', 'Tiki', 'Nutana', 'Cinepolis', 'Trueve Makeup', 'Bridestory Market'];

        foreach ($names as $i => $name) {
            ClientBrand::create(['name' => $name, 'sort_order' => $i]);
        }
    }

    private function seedTestimonials(): void
    {
        if (Testimonial::count() > 0) {
            return;
        }

        $row1 = [
            ['name' => 'Amanda Putri', 'handle' => '@amandaputri', 'text' => 'Fotonya bagus banget dan hasil print-nya rapi. Crew-nya juga ramah, on time pula!'],
            ['name' => 'Rizky Firmansyah', 'handle' => '@rizkyf', 'text' => 'Booth-nya compact tapi kualitas fotonya premium. Tamu wedding kami betah antre foto.'],
            ['name' => 'Clara Wijaya', 'handle' => '@clarawijaya', 'text' => 'Props-nya lucu-lucu, unlimited print-nya beneran nggak dibatesin. Worth it harganya.'],
            ['name' => 'Denny Saputra', 'handle' => '@dennysaputra', 'text' => 'Buat corporate event kita, setup-nya cepat dan hasilnya terlihat profesional banget.'],
        ];
        $row2 = [
            ['name' => 'Novita Sari', 'handle' => '@novitasari', 'text' => 'Dari booking sampai hari-H komunikasinya lancar, respon admin-nya juga cepat.'],
            ['name' => 'Bagas Pratama', 'handle' => '@bagaspratama', 'text' => 'Ring light-nya bikin hasil foto flawless walau venue-nya agak gelap.'],
            ['name' => 'Sabrina Halim', 'handle' => '@sabrinahalim', 'text' => 'Harga masuk akal untuk kualitas segini. Bakal pakai lagi buat acara berikutnya.'],
            ['name' => 'Fajar Ramadhan', 'handle' => '@fajarr', 'text' => 'Tim-nya sigap pas ada kendala teknis kecil, langsung dibantu tanpa mengganggu acara.'],
        ];

        foreach ($row1 as $i => $item) {
            Testimonial::create([...$item, 'row' => 1, 'sort_order' => $i]);
        }
        foreach ($row2 as $i => $item) {
            Testimonial::create([...$item, 'row' => 2, 'sort_order' => $i]);
        }
    }

    private function seedPortfolio(): void
    {
        if (PortfolioItem::count() > 0) {
            return;
        }

        $items = [
            ['seed' => 'poonya1', 'label' => 'The Wedding of Andika & Monic'],
            ['seed' => 'poonya2', 'label' => 'Tiki 55th Anniversary'],
            ['seed' => 'poonya3', 'label' => "Gala Sky's Birthday Party"],
            ['seed' => 'poonya4', 'label' => 'Poonya x Community Fest'],
            ['seed' => 'poonya5', 'label' => 'Exhibition Booth — Jakarta Expo'],
            ['seed' => 'poonya6', 'label' => "Sahil's Open House"],
        ];

        foreach ($items as $i => $item) {
            PortfolioItem::create([
                'image_path' => "https://picsum.photos/seed/{$item['seed']}/500/620",
                'label' => $item['label'],
                'sort_order' => $i,
            ]);
        }
    }

    private function seedSpecialOffers(): void
    {
        if (SpecialOffer::count() > 0) {
            return;
        }

        SpecialOffer::create([
            'image_path' => 'https://picsum.photos/seed/promo1/500/650',
            'title' => 'Contoh Promo — ganti dengan gambar promo asli',
            'sort_order' => 0,
        ]);
    }

    private function seedFaqs(): void
    {
        if (Faq::count() > 0) {
            return;
        }

        $items = [
            ['question' => 'Berapa lama waktu yang dibutuhkan untuk setup?', 'answer' => 'Setup photobooth biasanya memakan waktu sekitar 30 menit, dan tim kami datang lebih awal untuk memastikan semuanya siap sebelum acara dimulai.'],
            ['question' => 'Apakah bisa cancel atau reschedule?', 'answer' => 'Bisa, hubungi admin kami minimal H-3 sebelum acara untuk reschedule tanggal. Kebijakan pembatalan akan diinformasikan saat konfirmasi booking.'],
            ['question' => 'Apakah photobooth bisa untuk event outdoor?', 'answer' => 'Bisa, selama ada sumber listrik dan area yang cukup teduh. Tim kami akan membantu survei lokasi jika diperlukan.'],
            ['question' => 'Berapa ukuran area yang dibutuhkan untuk pemasangan?', 'answer' => 'Cukup area sekitar 2x2 meter untuk booth, backdrop, dan ruang gerak tamu yang nyaman.'],
            ['question' => 'Apakah ada minimum durasi sewa?', 'answer' => 'Paket termudah kami mulai dari 2 jam, cocok untuk acara kecil hingga menengah.'],
            ['question' => 'Apakah file digital diberikan setelah acara?', 'answer' => 'Ya, seluruh foto softcopy dapat diunduh melalui QR Code atau dikirim ke email setelah acara selesai.'],
            ['question' => 'Bagaimana cara pembayaran dan apakah ada DP?', 'answer' => 'Booking dikonfirmasi dengan DP untuk mengunci tanggal, sisanya dilunasi sebelum atau di hari acara sesuai kesepakatan.'],
            ['question' => 'Apakah tersedia area layanan di luar Jabodetabek?', 'answer' => 'Untuk saat ini kami fokus melayani area Jabodetabek. Untuk lokasi lain, silakan hubungi kami untuk diskusi lebih lanjut.'],
        ];

        foreach ($items as $i => $item) {
            Faq::create([...$item, 'sort_order' => $i]);
        }
    }

    private function seedHeroWords(): void
    {
        if (HeroWord::count() > 0) {
            return;
        }

        $words = ['Wedding', 'Birthday Party', 'Corporate Event', 'Community Event', 'Exhibition'];

        foreach ($words as $i => $word) {
            HeroWord::create(['word' => $word, 'sort_order' => $i]);
        }
    }

    private function seedWhyUsItems(): void
    {
        if (WhyUsItem::count() > 0) {
            return;
        }

        $items = [
            ['icon' => 'HandHeart', 'title' => 'Heart to Heart Service', 'text' => 'Staff ramah dan profesional yang melayani tamu Anda dengan hangat.'],
            ['icon' => 'BadgeCheck', 'title' => 'Premium tapi Affordable', 'text' => 'Kualitas kelas premium dengan harga yang tetap masuk akal.'],
            ['icon' => 'Printer', 'title' => 'Print Berkualitas & Unlimited', 'text' => 'Cetak foto tajam, tahan lama, dan tanpa batas selama acara.'],
            ['icon' => 'Sparkles', 'title' => 'Crew Berpengalaman', 'text' => 'Terbiasa menangani berbagai skala acara, dari intimate hingga gala.'],
            ['icon' => 'Clock', 'title' => 'Setup Cepat', 'text' => 'Desain compact kami siap terpasang sekitar 30 menit sebelum acara dimulai.'],
            ['icon' => 'Palette', 'title' => 'Custom Frame & Ring Light', 'text' => 'Template dan ring light disesuaikan dengan tema acara untuk hasil foto flawless.'],
        ];

        foreach ($items as $i => $item) {
            WhyUsItem::create([...$item, 'sort_order' => $i]);
        }
    }

    private function seedBookingSteps(): void
    {
        if (BookingStep::count() > 0) {
            return;
        }

        $items = [
            ['icon' => 'CalendarCheck', 'title' => 'Booking', 'text' => 'Pilih paket, tentukan tanggal acara, dan hubungi kami via WhatsApp atau isi form. Konfirmasi dalam 1×24 jam.'],
            ['icon' => 'PartyPopper', 'title' => 'Persiapan', 'text' => 'Tim kami menyiapkan custom frame sesuai tema acara Anda. Setup peralatan 30 menit sebelum acara dimulai.'],
            ['icon' => 'Camera', 'title' => 'Sesi Foto', 'text' => 'Tamu bebas berfoto sepuasnya! Crew kami siap membantu, dengan properti lucu dan lighting profesional.'],
            ['icon' => 'Share2', 'title' => 'Cetak & Share', 'text' => 'Foto langsung dicetak di tempat dan file digital dikirim via QR Code atau email. Kenangan siap dibawa pulang!'],
        ];

        foreach ($items as $i => $item) {
            BookingStep::create([...$item, 'sort_order' => $i]);
        }
    }
}
