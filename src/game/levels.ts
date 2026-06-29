export type Difficulty = 'EZ' | 'MID' | 'HARD' | 'EXPERT' | 'ADVANCE';

export interface Level {
  id: number;
  size: number;
  grid: string[];
  targetCss: string;
  difficulty: Difficulty;
  concept: string;
  tips: { basic: string; pro: string };
  minSteps: number;
}

function buildLevels(): Level[] {
  return [
    // ===================== EZ (1-30): Belajar dasar translate =====================
    {
      id: 1, size: 5, difficulty: 'EZ', concept: 'Langkah Pertama', targetCss: 'translate', minSteps: 1,
      grid: ['.....', '.....', '..S..', '.....', '..E..'],
      tips: { basic: 'E ada di bawah S. Kamu perlu gerak vertikal ke bawah. Coba `margin-top: 200px`, `padding-top: 200px`, `top: 200px`, atau `translateY(200px)`. Coba-coba nilai px!', pro: '1 sel = 100px. Jarak vertikal S(2,2) ke E(2,4) = 2 langkah = 200px ke bawah. Ingat: nilai positif = turun untuk semua properti CSS. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 2, size: 5, difficulty: 'EZ', concept: 'Geser ke Kanan', targetCss: 'translateX', minSteps: 2,
      grid: ['.....', '..#..', '.S.E.', '.....', '.....'],
      tips: { basic: 'E di kanan S dalam satu baris. Kamu perlu gerak horizontal ke kanan. Coba `margin-left: 200px`, `left: 200px`, `translateX(200px)`, atau `padding-left: 200px`.', pro: '1 sel = 100px. Jarak horizontal S(1,2) ke E(3,2) = 2 langkah = 200px ke kanan. Tembok di (2,1) tidak mengganggu gerak horizontalmu. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 3, size: 5, difficulty: 'EZ', concept: 'Lompat ke Atas', targetCss: 'translateY', minSteps: 2,
      grid: ['..E..', '.##..', '....#', '.....', '..S..'],
      tips: { basic: 'E di atas S. Kamu perlu gerak vertikal ke atas (nilai negatif). Coba `margin-top: -400px`, `top: -400px`, `translateY(-400px)`, atau `padding-top` negatif.', pro: '1 sel = 100px. Jarak vertikal S(2,4) ke E(2,0) = 4 langkah ke atas = -400px. Tembok di (1,1) dan (2,1) — kamu lewati dengan lompatan langsung. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 4, size: 5, difficulty: 'EZ', concept: 'Belok Kanan', targetCss: 'L-Shape', minSteps: 3,
      grid: ['.....', '..E..', '..#..', '..#..', '.S...'],
      tips: { basic: 'Jalurnya tidak lurus — S ke E butuh gerak kanan dan atas. Coba `transform: translate(100px, -300px)` atau pakai `margin-left: 100px` + `margin-top: -300px`.', pro: '1 sel = 100px. S(1,4) ke E(2,1) = 1 langkah kanan (100px) + 3 langkah atas (-300px). Tembok di (2,2) dan (2,3) — lewati dengan lompat diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 5, size: 5, difficulty: 'EZ', concept: 'Belok Kiri', targetCss: 'Reverse L', minSteps: 3,
      grid: ['E....', '.#...', '.#...', '.....', '...S.'],
      tips: { basic: 'E di kiri atas, S di kanan bawah. Butuh gerak kiri (nilai X negatif) dan atas (nilai Y negatif). Coba `translate(-300px, -400px)` atau `margin-left: -300px` + `margin-top: -400px`.', pro: '1 sel = 100px. S(3,4) ke E(0,0) = 3 kiri (-300px) + 4 atas (-400px). Tembok di (1,1) dan (1,2) — tidak menghalangi rute diagonalmu. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 6, size: 5, difficulty: 'EZ', concept: 'Lurus Panjang', targetCss: 'Straight', minSteps: 3,
      grid: ['E....', '.....', '.....', '.....', '....S'],
      tips: { basic: 'S pojok kanan bawah, E pojok kiri atas. Diagonal penuh 5x5! Coba `translate(-400px, -400px)` atau pakai `left: -400px` + `top: -400px`.', pro: '1 sel = 100px. Grid 5x5, S(4,4) ke E(0,0) = 4 kiri + 4 atas = -400px masing-masing. Tebak dulu sebelum lihat solusi! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 7, size: 5, difficulty: 'EZ', concept: 'Zigzag Sederhana', targetCss: 'Zigzag', minSteps: 4,
      grid: ['..E..', '.....', '..#..', '..S..', '.....'],
      tips: { basic: 'E lurus di atas S. Tapi ada tembok di tengah — kamu tetap bisa lompat! Coba `translateY(-300px)`, `margin-top: -300px`, `top: -300px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(2,3) ke E(2,0) = 3 langkah ke atas = -300px. Tembok di (2,2) — translate langsung loncat ke koordinat akhir, tembok tidak masalah! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 8, size: 5, difficulty: 'EZ', concept: 'Koridor Sempit', targetCss: 'Narrow', minSteps: 3,
      grid: ['.....', '#####', 'S...E', '.....', '.....'],
      tips: { basic: 'S di kiri, E di kanan. Tembok di atas dan bawah membentuk koridor. Coba `translateX(400px)`, `margin-left: 400px`, atau `left: 400px`.', pro: '1 sel = 100px. S(0,2) ke E(4,2) = 4 langkah = 400px ke kanan. Tembok di baris 1 dan 3 — kamu lewat di tengah. Hitung sendiri jaraknya! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 9, size: 5, difficulty: 'EZ', concept: 'Turun Curam', targetCss: 'Downhill', minSteps: 2,
      grid: ['S....', '.....', '..#..', '..E..', '.....'],
      tips: { basic: 'S pojok kiri atas, E di kanan bawah. Butuh gerak kanan dan turun. Coba `translate(200px, 300px)`, `margin-left: 200px` + `margin-top: 300px`, atau `left: 200px` + `top: 300px`.', pro: '1 sel = 100px. S(0,0) ke E(2,3) = 2 kanan (200px) + 3 bawah (300px). Tembok di (2,2) — lewati karena gerak diagonal langsung loncat! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 10, size: 6, difficulty: 'EZ', concept: 'Lapangan Terbuka', targetCss: 'Free Move', minSteps: 3,
      grid: ['..E...', '......', '......', '......', '......', '..S...'],
      tips: { basic: 'E lurus di atas S dalam grid 6x6. Tidak ada tembok. Coba `translateY(-500px)`, `margin-top: -500px`, `top: -500px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(2,5) ke E(2,0) = 5 langkah = -500px. Tidak ada tembok — lintasan vertikal bersih! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 11, size: 6, difficulty: 'EZ', concept: 'Tangga', targetCss: 'Stairs', minSteps: 4,
      grid: ['......', '.....E', '......', '.#....', '......', 'S.....'],
      tips: { basic: 'Seperti anak tangga — S kiri bawah, E kanan atas. Butuh gerak kanan dan atas. Coba `translate(500px, -400px)` atau `margin-left: 500px` + `margin-top: -400px`.', pro: '1 sel = 100px. S(0,5) ke E(5,1) = 5 kanan (500px) + 4 atas (-400px). Tembok di (1,3) — tidak menghalangi rute diagonalmu. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 12, size: 6, difficulty: 'EZ', concept: 'Lompat Celah', targetCss: 'Gap Jump', minSteps: 3,
      grid: ['...E..', '......', '...#..', '......', '..S...', '......'],
      tips: { basic: 'E di kanan atas, S di kiri bawah. Ada tembok di tengah. Coba `translate(100px, -400px)` atau `left: 100px` + `top: -400px`.', pro: '1 sel = 100px. S(2,4) ke E(3,0) = 1 kanan (100px) + 4 atas (-400px). Tembok di (3,2) — lewati dengan lompatan diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 13, size: 6, difficulty: 'EZ', concept: 'U-Turn', targetCss: 'U Shape', minSteps: 4,
      grid: ['E.....', '......', '.#....', '......', '......', '.....S'],
      tips: { basic: 'Diagonal penuh grid 6x6! S kanan bawah, E kiri atas. Coba `translate(-500px, -500px)`, `margin-left: -500px` + `margin-top: -500px`, atau `left: -500px` + `top: -500px`.', pro: '1 sel = 100px. S(5,5) ke E(0,0) = 5 kiri + 5 atas = -500px masing-masing. Tembok di (2,2) — tidak masalah untuk lompatan diagonal besar. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 14, size: 6, difficulty: 'EZ', concept: 'Jalur Pandang', targetCss: 'Clear View', minSteps: 2,
      grid: ['..E...', '......', '......', '..S...', '......', '......'],
      tips: { basic: 'E lurus di atas S. Tidak ada tembok. Coba `translateY(-300px)`, `margin-top: -300px`, `top: -300px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(2,3) ke E(2,0) = 3 langkah = -300px. Atau coba diagonal `translate(-100px, -300px)` untuk variasi. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 15, size: 6, difficulty: 'EZ', concept: 'Jalan Lurus', targetCss: 'Walkway', minSteps: 4,
      grid: ['......', '......', 'S....E', '......', '......', '......'],
      tips: { basic: 'Garis lurus horizontal. S di kiri, E di kanan, baris sama. Coba `translateX(500px)`, `margin-left: 500px`, `left: 500px`, atau `padding-left: 500px`.', pro: '1 sel = 100px. S(0,2) ke E(5,2) = 5 langkah = 500px ke kanan. Tidak ada tembok — jalan tol horizontal! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 16, size: 6, difficulty: 'EZ', concept: 'Maze Mini', targetCss: 'Mini Maze', minSteps: 5,
      grid: ['.....E', '.#....', '.#....', '..#...', '....#.', 'S.....'],
      tips: { basic: 'Labirin kecil dengan 4 tembok tersebar. Cari jalur diagonal. Coba `translate(500px, -500px)` atau `margin-left: 500px` + `margin-top: -500px`.', pro: '1 sel = 100px. S(0,5) ke E(5,0) = 5 kanan + 5 atas. Tembok di (1,1),(1,2),(3,3),(4,4) — lewati semua dengan satu lompatan diagonal! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 17, size: 6, difficulty: 'EZ', concept: 'Potong Diagonal', targetCss: 'Cross Cut', minSteps: 3,
      grid: ['E.....', '......', '..#...', '......', '......', '.....S'],
      tips: { basic: 'S kanan bawah, E kiri atas. Diagonal penuh! Coba `translate(-500px, -500px)` atau pakai `left: -500px` + `top: -500px`.', pro: '1 sel = 100px. S(5,5) ke E(0,0) = 5 kiri + 5 atas = -500px. Tembok di (2,2) — translate loncat di atasnya, jadi tidak masalah! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 18, size: 6, difficulty: 'EZ', concept: 'Jalan Pintas', targetCss: 'Shortcut', minSteps: 2,
      grid: ['.....E', '......', '......', '..S...', '......', '......'],
      tips: { basic: 'E di kanan atas dari S. Butuh gerak kanan dan atas. Coba `translate(300px, -300px)` atau `margin-left: 300px` + `margin-top: -300px`.', pro: '1 sel = 100px. S(2,3) ke E(5,0) = 3 kanan (300px) + 3 atas (-300px). Tidak ada tembok — lintasan diagonal bersih dan pendek! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 19, size: 6, difficulty: 'EZ', concept: 'Lift', targetCss: 'Vertical', minSteps: 3,
      grid: ['..E...', '......', '..#...', '......', '..#...', '..S...'],
      tips: { basic: 'Naik lurus 5 langkah. Dua tembok di kolom 2 — apa mereka menghalangi? Coba `translateY(-500px)` atau `margin-top: -500px`.', pro: '1 sel = 100px. S(2,5) ke E(2,0) = 5 langkah = -500px. Tembok di (2,2) dan (2,4) — translate loncat langsung, jadi tembok tidak masalah! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 20, size: 6, difficulty: 'EZ', concept: 'Geser Samping', targetCss: 'Side Step', minSteps: 3,
      grid: ['......', '.....E', '......', 'S.....', '......', '......'],
      tips: { basic: 'S kiri, E kanan atas. Butuh gerak kanan dan atas. Coba `translate(500px, -200px)` atau `margin-left: 500px` + `margin-top: -200px`.', pro: '1 sel = 100px. S(0,3) ke E(5,1) = 5 kanan (500px) + 2 atas (-200px). Tidak ada tembok — bebas bergerak! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 21, size: 6, difficulty: 'EZ', concept: 'EZ Gauntlet', targetCss: 'EZ Run', minSteps: 5,
      grid: ['......', '...E..', '..#...', '..#...', '......', '.S....'],
      tips: { basic: 'Dua tembok di kolom 3. S kiri bawah, E kanan tengah. Coba `translate(200px, -400px)` atau `left: 200px` + `top: -400px`.', pro: '1 sel = 100px. S(1,5) ke E(3,1) = 2 kanan (200px) + 4 atas (-400px). Tembok di (3,2) dan (3,3) — lewati dengan lompat diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 22, size: 6, difficulty: 'EZ', concept: 'Kait Kanan', targetCss: 'Hook', minSteps: 4,
      grid: ['......', '#.....', '......', '.#....', '.....S', 'E.....'],
      tips: { basic: 'E di kiri bawah, S di kanan tengah. Butuh gerak kiri dan sedikit turun. Coba `translate(-500px, 100px)` atau `margin-left: -500px` + `margin-top: 100px`.', pro: '1 sel = 100px. S(5,4) ke E(0,5) = 5 kiri (-500px) + 1 bawah (100px). Tembok di (0,1) dan (1,3) — tidak di jalurmu. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 23, size: 6, difficulty: 'EZ', concept: 'Jalan Jauh', targetCss: 'Long Walk', minSteps: 5,
      grid: ['E.....', '......', '......', '......', '......', '.....S'],
      tips: { basic: 'Lintasi seluruh grid 6x6. S pojok kanan bawah, E pojok kiri atas. Coba `translate(-500px, -500px)` atau `left: -500px` + `top: -500px`.', pro: '1 sel = 100px. S(5,5) ke E(0,0) = 5 kiri + 5 atas = -500px. Satu lompatan besar melintasi grid! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 24, size: 6, difficulty: 'EZ', concept: 'Zigzag 2', targetCss: 'Serpentine', minSteps: 5,
      grid: ['......', '......', '..#...', '......', '..#...', 'S....E'],
      tips: { basic: 'S kiri, E kanan, baris sama (baris 5). Dua tembok di kolom 2. Coba `translateX(500px)` atau `margin-left: 500px`.', pro: '1 sel = 100px. S(0,5) ke E(5,5) = 5 kanan (500px). Tembok di (2,2) dan (2,4) — di baris berbeda, jadi tidak menghalangi gerak horizontalmu! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 25, size: 6, difficulty: 'EZ', concept: 'Pojokan', targetCss: 'Corner', minSteps: 4,
      grid: ['......', '......', '....#.', '......', '.S....', '....E.'],
      tips: { basic: 'S kiri bawah, E kanan bawah. Ada tembok di jalur lurus. Coba `translate(300px, 100px)` atau `margin-left: 300px` + `margin-top: 100px`.', pro: '1 sel = 100px. S(1,4) ke E(4,5) = 3 kanan (300px) + 1 bawah (100px). Tembok di (4,2) — lewati dengan diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 26, size: 6, difficulty: 'EZ', concept: 'Jarak Lebar', targetCss: 'Wide Gap', minSteps: 3,
      grid: ['E.....', '......', '......', '......', '......', 'S.....'],
      tips: { basic: 'S dan E di kolom 0. Lurus vertikal 5 langkah ke atas. Coba `translateY(-500px)`, `margin-top: -500px`, atau `top: -500px`.', pro: '1 sel = 100px. S(0,5) ke E(0,0) = 5 langkah = -500px. Tidak ada tembok — lurus dan sederhana. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 27, size: 6, difficulty: 'EZ', concept: 'Persimpangan', targetCss: 'Cross', minSteps: 4,
      grid: ['..E...', '......', '..#...', '......', '..#...', '..S...'],
      tips: { basic: 'S dan E kolom 2. Dua tembok di kolom 2 juga. Coba `translateY(-500px)` atau `margin-top: -500px`. Apakah tembok menghalangi?', pro: '1 sel = 100px. S(2,5) ke E(2,0) = 5 langkah = -500px. Tembok di (2,2) dan (2,4) — translate loncat langsung, jadi tembok tidak masalah! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 28, size: 6, difficulty: 'EZ', concept: 'Flank', targetCss: 'Flank Move', minSteps: 4,
      grid: ['......', 'E.....', '.#....', '......', '.#....', '....S.'],
      tips: { basic: 'S kanan bawah, E kiri atas. Dua tembok di kolom 1. Coba `translate(-400px, -400px)` atau `left: -400px` + `top: -400px`.', pro: '1 sel = 100px. S(4,5) ke E(0,1) = 4 kiri (-400px) + 4 atas (-400px). Tembok di (1,2) dan (1,4) — lewati dengan diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 29, size: 6, difficulty: 'EZ', concept: 'Lapangan 2', targetCss: 'Open Field 2', minSteps: 3,
      grid: ['......', '......', 'E.....', '......', '......', '....S.'],
      tips: { basic: 'S kanan bawah, E kiri tengah. Coba `translate(-400px, -300px)` atau `margin-left: -400px` + `margin-top: -300px`.', pro: '1 sel = 100px. S(4,5) ke E(0,2) = 4 kiri (-400px) + 3 atas (-300px). Tidak ada tembok — bebas! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 30, size: 6, difficulty: 'EZ', concept: 'EZ Master', targetCss: 'EZ Final', minSteps: 5,
      grid: ['E.....', '......', '..#...', '......', '..#...', '.....S'],
      tips: { basic: 'Level terakhir EZ! Diagonal penuh 6x6 dengan dua tembok. Coba `translate(-500px, -500px)` atau kombinasi `margin` + `top`.', pro: '1 sel = 100px. S(5,5) ke E(0,0) = 5 kiri + 5 atas = -500px. Dua tembok di (2,2) dan (2,4) — lewati semua! EZ selesai, lanjut MID! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },

    // ===================== MID (31-60): Tambah rotate & scale =====================
    {
      id: 31, size: 7, difficulty: 'MID', concept: 'Rotasi Pertama', targetCss: 'rotate', minSteps: 3,
      grid: ['......E', '......#', '......#', '......#', '......#', '......#', 'S.....'],
      tips: { basic: 'E di kanan atas. Coba `translate(600px, -600px) rotate(90deg)`. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.', pro: '1 sel = 100px. S(0,6) ke E(6,0) = 6 kanan + 6 atas. Tembok di kolom 6 baris 1-5 — dinding vertikal. Gabung `rotate(90deg)` agar pemain miring. Coba urutan terbalik — lihat bedanya!' }
    },
    {
      id: 32, size: 7, difficulty: 'MID', concept: 'Perkecil Diri', targetCss: 'scale', minSteps: 4,
      grid: ['.......', '..E....', '..#....', '.......', '..#....', '.......', '..S....'],
      tips: { basic: 'E lurus di atas S. Ada tembok di tengah. Coba `translateY(-500px) scale(0.5)` atau `margin-top: -500px` + `transform: scale(0.5)`.', pro: '1 sel = 100px. S(2,6) ke E(2,1) = 5 langkah = -500px. Tembok di (2,2) dan (2,4) — `scale(0.5)` membuatmu kecil saat lewat. Urutan properti penting: coba scale dulu baru translate!' }
    },
    {
      id: 33, size: 7, difficulty: 'MID', concept: 'Diagonal 45', targetCss: 'Dash', minSteps: 4,
      grid: ['E......', '.......', '..#....', '.......', '..#....', '.......', '......S'],
      tips: { basic: 'Diagonal penuh 7x7! Coba `translate(-600px, -600px) rotate(45deg)` atau `left: -600px` + `top: -600px` + `rotate(45deg)`.', pro: '1 sel = 100px. S(6,6) ke E(0,0) = 6 kiri + 6 atas = -600px. Tembok di (2,2) dan (2,4) — `rotate(45deg)` bikin pemain miring stylish saat meluncur diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 34, size: 7, difficulty: 'MID', concept: 'Belok Advanced', targetCss: 'Turn L', minSteps: 5,
      grid: ['.....E.', '.......', '....#..', '....#..', '....#..', '.......', 'S......'],
      tips: { basic: 'E di kanan atas. Tiga tembok vertikal di kolom 4. Coba `translate(500px, -600px)` atau `margin-left: 500px` + `margin-top: -600px`.', pro: '1 sel = 100px. S(0,6) ke E(5,0) = 5 kanan (500px) + 6 atas (-600px). Tembok di (4,2),(4,3),(4,4) — lewati semua dengan satu lompatan diagonal! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 35, size: 7, difficulty: 'MID', concept: 'Gerak Halus', targetCss: 'transition', minSteps: 5,
      grid: ['..E....', '.......', '..#....', '.......', '..#....', '.......', '....S..'],
      tips: { basic: 'E di kiri atas S. Dua tembok di kolom 2. Coba `translate(-200px, -600px)` atau `left: -200px` + `top: -600px`. Tambah `transition: transform 500ms` untuk gerak halus!', pro: '1 sel = 100px. S(4,6) ke E(2,0) = 2 kiri (-200px) + 6 atas (-600px). Tembok di (2,2) dan (2,4). `transition: all 300ms ease-in-out` — timing function bikin gerak alami. Eksperimen dengan berbagai ms!' }
    },
    {
      id: 36, size: 7, difficulty: 'MID', concept: 'Putar 180', targetCss: 'Spin', minSteps: 5,
      grid: ['E..#...', '.#.#...', '...#...', '.......', '..#...#', '.......', '..S....'],
      tips: { basic: 'E di kiri atas S. Banyak tembok berserakan. Coba `translate(-200px, -600px) rotate(180deg)` atau pakai `margin` + `top` + `rotate`.', pro: '1 sel = 100px. S(2,6) ke E(0,0) = 2 kiri + 6 atas. Tembok di (0,0)—tapi itu E! Tembok lain di (1,1),(3,1),(4,4),(4,5). `rotate(180deg)` = berputar setengah lingkaran, mengubah arah hadap.' }
    },
    {
      id: 37, size: 7, difficulty: 'MID', concept: 'Pintu Kecil', targetCss: 'Tiny Door', minSteps: 5,
      grid: ['.......', '....E..', '.......', '..#..#.', '.......', '..S....', '.......'],
      tips: { basic: 'E di kanan atas S. Dua tembok berjarak 1 sel — lebih kecil dari pemain! Coba `translate(200px, -400px) scale(0.3)` atau `margin-left: 200px` + `margin-top: -400px` + `scale(0.3)`.', pro: '1 sel = 100px. S(2,5) ke E(4,1) = 2 kanan (200px) + 4 atas (-400px). Tembok di (3,3) dan (4,3) — `scale(0.3)` cukup untuk lewat celah sempit di antaranya. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 38, size: 7, difficulty: 'MID', concept: 'Zigzag 3', targetCss: 'Double Zigzag', minSteps: 6,
      grid: ['.....E.', '.......', '....#..', '....#..', '.......', '..#....', 'S......'],
      tips: { basic: 'Dua belokan zigzag. Tiga tembok di kolom 4 dan satu di kolom 2. Coba `translate(500px, -600px)` atau kombinasi `margin` + `top`.', pro: '1 sel = 100px. S(0,6) ke E(5,0) = 5 kanan + 6 atas. Tembok di (4,2),(4,3),(1,5). Hitung sendiri total perpindahan X dan Y sebelum jalankan! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 39, size: 7, difficulty: 'MID', concept: 'Tembak Presisi', targetCss: 'Precise Aim', minSteps: 5,
      grid: ['E..#...', '.......', '...#...', '.......', '...#...', '.......', '..S....'],
      tips: { basic: 'Tiga tembok di kolom 3. S dan E di kolom 2 — rute aman? Coba `translate(-200px, -600px)` atau `left: -200px` + `top: -600px`.', pro: '1 sel = 100px. S(2,6) ke E(0,0) = 2 kiri (-200px) + 6 atas (-600px). Tembok di (3,0),(3,2),(3,4) — semua di kolom 3, bukan kolom 2. Lewat samping tembok dengan aman! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 40, size: 7, difficulty: 'MID', concept: 'Celah Sempit', targetCss: 'Squeeze', minSteps: 6,
      grid: ['.......', '.......', '..E.#..', '..#..#.', '...#...', '..S....', '.......'],
      tips: { basic: 'Tembok rapat! E 3 langkah di atas S. Celah sempit. Coba `translateY(-300px) scale(0.4)` atau `margin-top: -300px` + `scale(0.4)`.', pro: '1 sel = 100px. S(2,5) ke E(2,2) = 3 langkah = -300px. Tembok di (2,3),(3,3),(3,4),(4,3) — `scale(0.4)` bikin muat lewat celah sempit di antara tembok! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 41, size: 7, difficulty: 'MID', concept: 'Tangga 2', targetCss: 'Step Up', minSteps: 6,
      grid: ['.....E.', '....#..', '.......', '..#....', '.......', '..#....', 'S......'],
      tips: { basic: 'Tangga dengan tembok berselang di kolom 1, 3, dan 5. Coba `translate(500px, -600px)` atau `margin-left: 500px` + `margin-top: -600px`.', pro: '1 sel = 100px. S(0,6) ke E(5,0) = 5 kanan (500px) + 6 atas (-600px). Tembok di (1,1),(3,3),(3,5) — lewati langsung dengan diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 42, size: 8, difficulty: 'MID', concept: 'Spiral MID', targetCss: 'Spiral', minSteps: 6,
      grid: ['....E..#', '........', '.###...#', '...#....', '...##...', '........', '..#.....', 'S.......'],
      tips: { basic: 'Labirin spiral 8x8 dengan banyak tembok. Coba `translate(400px, -700px)` atau `left: 400px` + `top: -700px`.', pro: '1 sel = 100px. S(0,7) ke E(4,0) = 4 kanan (400px) + 7 atas (-700px). Tembok di (1,2),(2,2),(3,2),(3,3),(4,3),(4,4),(2,6) — potong langsung semua labirin! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 43, size: 8, difficulty: 'MID', concept: 'Persimpangan', targetCss: 'Intersection', minSteps: 6,
      grid: ['........', '..E.....', '........', '..####..', '........', '........', 'S.......', '........'],
      tips: { basic: 'Tembok horizontal 4 sel di baris 3. S di bawah, E di atas. Coba `translate(200px, -500px)` atau `margin-left: 200px` + `margin-top: -500px`.', pro: '1 sel = 100px. S(0,6) ke E(2,1) = 2 kanan (200px) + 5 atas (-500px). Tembok dari (2,3) ke (5,3) — lewati ujung kiri tembok! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 44, size: 8, difficulty: 'MID', concept: 'Full Spin', targetCss: '360', minSteps: 5,
      grid: ['.......E', '.......#', '.......#', '.......#', '.......#', '.......#', '.......#', 'S......'],
      tips: { basic: 'Diagonal penuh 8x8 dengan dinding di kolom 7. Tambah `rotate(360deg)` untuk putaran penuh. Coba `translate(700px, -700px) rotate(360deg)`.', pro: '1 sel = 100px. S(0,7) ke E(7,0) = 7 kanan + 7 atas. Tembok di kolom 7 baris 1-6 — dinding vertikal. `rotate(360deg)` = kembali ke arah semula! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 45, size: 8, difficulty: 'MID', concept: 'S-Curve', targetCss: 'Snake', minSteps: 7,
      grid: ['.......E', '........', '..###...', '........', '...###..', '........', '........', 'S.......'],
      tips: { basic: 'Pola S: tembok kiri lalu kanan. Coba `translate(700px, -700px)` atau pakai `margin-left: 700px` + `margin-top: -700px`.', pro: '1 sel = 100px. S(0,7) ke E(7,0) = 7 kanan + 7 atas. Tembok di (2,2),(3,2),(4,2) dan (3,4),(4,4),(5,4) — bentuk S! Lompat langsung melewati semua. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 46, size: 8, difficulty: 'MID', concept: 'Pintu Gerbang', targetCss: 'Gate', minSteps: 6,
      grid: ['........', 'E.......', '........', '..#..#..', '........', '........', '.......S', '........'],
      tips: { basic: 'E kiri atas, S kanan bawah. Dua tembok berjauhan. Coba `translate(-700px, -500px) scale(0.6)` atau `left: -700px` + `top: -500px` + `scale(0.6)`.', pro: '1 sel = 100px. S(7,6) ke E(0,1) = 7 kiri (-700px) + 5 atas (-500px). Tembok di (3,3) dan (6,3) — `scale(0.6)` untuk lewat dengan aman di antara mereka. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 47, size: 8, difficulty: 'MID', concept: 'Belokan Tajam', targetCss: 'Bend', minSteps: 6,
      grid: ['........', '.....E..', '........', '....#...', '....#...', '........', '..S.....', '........'],
      tips: { basic: 'S kiri bawah, E kanan atas. Dua tembok di kolom 4. Coba `translate(300px, -500px)` atau `margin-left: 300px` + `margin-top: -500px`.', pro: '1 sel = 100px. S(2,6) ke E(5,1) = 3 kanan (300px) + 5 atas (-500px). Tembok di (4,3) dan (4,4) — lewati dari kiri dengan diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 48, size: 8, difficulty: 'MID', concept: 'Dual Axis', targetCss: 'X&Y Combo', minSteps: 5,
      grid: ['........', '........', 'E..##...', '........', '........', '....S...', '........', '........'],
      tips: { basic: 'Tembok ganda `##` di tengah. S kanan bawah, E kiri atas. Coba `translate(-400px, -300px)` atau `left: -400px` + `top: -300px`.', pro: '1 sel = 100px. S(4,5) ke E(0,2) = 4 kiri (-400px) + 3 atas (-300px). Tembok `##` di (2,2) dan (3,2) — lewati dengan diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 49, size: 8, difficulty: 'MID', concept: 'Gelombang', targetCss: 'Wave', minSteps: 7,
      grid: ['........', '.....E..', '........', '........', '....#...', '........', '........', 'S.......'],
      tips: { basic: 'E kanan atas, S kiri bawah. Satu tembok di tengah. Coba `translate(500px, -600px)` atau `margin-left: 500px` + `margin-top: -600px`.', pro: '1 sel = 100px. S(0,7) ke E(5,1) = 5 kanan (500px) + 6 atas (-600px). Tembok di (4,4) — lewati dengan lompat diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 50, size: 8, difficulty: 'MID', concept: 'MID Boss', targetCss: 'Mid Boss', minSteps: 7,
      grid: ['........', 'E.......', '........', '..#..#..', '........', '..#..#..', '........', '.......S'],
      tips: { basic: 'Boss MID! Empat tembok berpasangan. Gabung `translate(-700px, -600px) rotate(180deg) scale(0.7)` atau pakai kombinasi properti lain.', pro: '1 sel = 100px. S(7,7) ke E(0,1) = 7 kiri + 6 atas. Tembok di (3,3),(6,3),(3,5),(6,5). `rotate(180deg)` + `scale(0.7)` — semua teknik dalam satu baris! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 51, size: 8, difficulty: 'MID', concept: 'Lari Koridor', targetCss: 'Hallway', minSteps: 5,
      grid: ['.....E..', '........', '........', '........', '........', '........', '.....S..', '........'],
      tips: { basic: 'Lurus vertikal. S dan E di kolom 5. Coba `translateY(-600px)`, `margin-top: -600px`, `top: -600px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(5,6) ke E(5,0) = 6 langkah = -600px. Tidak ada tembok — koridor bersih! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 52, size: 8, difficulty: 'MID', concept: 'Lompat Celah', targetCss: 'Leap', minSteps: 6,
      grid: ['........', '........', '..E..#..', '........', '..####..', '........', '..S..#..', '........'],
      tips: { basic: 'E lurus di atas S. Tembok panjang horizontal di tengah. Coba `translateY(-400px)` atau `margin-top: -400px`.', pro: '1 sel = 100px. S(2,6) ke E(2,2) = 4 langkah = -400px. Tembok `####` di baris 4 kolom 2-5 — lompati semua dengan satu gerakan vertikal! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 53, size: 8, difficulty: 'MID', concept: 'Putar Muat', targetCss: 'Spin Fit', minSteps: 6,
      grid: ['.....E..', '........', '.....#..', '.....#..', '.....#..', '........', '.....S..', '........'],
      tips: { basic: 'S dan E kolom 5. Tiga tembok vertikal di kolom 5. Coba `rotate(90deg) scale(0.6)` + `translateY(-600px)` atau pakai `margin-top` + `rotate` + `scale`.', pro: '1 sel = 100px. S(5,6) ke E(5,0) = 6 langkah = -600px. Tembok di (5,2),(5,3),(5,4) — `rotate(90deg)` + `scale(0.6)` bikin pemain muat lewat celah sempit antar tembok! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 54, size: 8, difficulty: 'MID', concept: 'Switchback', targetCss: 'Reverse', minSteps: 7,
      grid: ['........', '..E.....', '........', '..#.....', '..#.....', '........', '.....S..', '........'],
      tips: { basic: 'S kanan bawah, E kiri atas. Dua tembok di kolom 2. Coba `translate(-300px, -500px)` atau `left: -300px` + `top: -500px`.', pro: '1 sel = 100px. S(5,6) ke E(2,1) = 3 kiri (-300px) + 5 atas (-500px). Tembok di (2,3) dan (2,4) — lewati dari kanan dengan diagonal. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 55, size: 8, difficulty: 'MID', concept: 'Gerak Lambat', targetCss: 'Slow Motion', minSteps: 5,
      grid: ['E.......', '........', '........', '........', '........', '........', '........', '.......S'],
      tips: { basic: 'Diagonal penuh 8x8. Coba `transition: all 1000ms ease` untuk gerakan super lambat! Gunakan `translate(-700px, -700px)` atau kombinasi `left` + `top`.', pro: 'S(7,7) ke E(0,0) = 7 kiri + 7 atas = -700px. `cubic-bezier(0.68, -0.55, 0.27, 1.55)` — efek bouncing yang keren. Tidak ada tembok — fokus ke timing function!' }
    },
    {
      id: 56, size: 8, difficulty: 'MID', concept: 'Perbesar', targetCss: 'Enlarge', minSteps: 6,
      grid: ['........', '.....E..', '........', '........', '........', '........', '.....S..', '........'],
      tips: { basic: 'S dan E kolom 5. Coba `translateY(-500px) scale(1.5)` — pemain membesar 50% saat mencapai E! Atau pakai `margin-top: -500px` + `scale(1.5)`.', pro: '1 sel = 100px. S(5,6) ke E(5,1) = 5 langkah = -500px. `scale(1.5)` bikin pemain besar — urutan transform penting. Coba scale dulu baru translate, lihat bedanya! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 57, size: 8, difficulty: 'MID', concept: 'MID Precision', targetCss: 'Aim', minSteps: 6,
      grid: ['........', 'E.......', '........', '..#..#..', '........', '..#..#..', '........', '....S...'],
      tips: { basic: 'Empat tembok berpasangan. S kanan bawah, E kiri atas. Coba `translate(-400px, -600px)` atau `left: -400px` + `top: -600px`.', pro: '1 sel = 100px. S(4,7) ke E(0,1) = 4 kiri (-400px) + 6 atas (-600px). Tembok di (3,3),(6,3),(3,5),(6,5) — cari jalur diagonal bersih di antara mereka! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 58, size: 8, difficulty: 'MID', concept: 'Wave Runner', targetCss: 'Undulate', minSteps: 7,
      grid: ['........', '........', '....E...', '........', '.....#..', '........', '....S...', '........'],
      tips: { basic: 'S dan E di kolom 4. Satu tembok di kolom 4 juga. Coba `translateY(-400px)` atau `margin-top: -400px`.', pro: '1 sel = 100px. S(4,6) ke E(4,2) = 4 langkah = -400px. Tembok di (4,4) — translate loncat langsung, jadi tembok tidak masalah! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 59, size: 8, difficulty: 'MID', concept: 'Gravity', targetCss: 'Fall', minSteps: 6,
      grid: ['........', '........', '........', '........', '..E.....', '........', '........', '..S.....'],
      tips: { basic: 'S dan E di kolom 2. Coba `translateY(-300px)`, `margin-top: -300px`, `top: -300px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(2,7) ke E(2,4) = 3 langkah = -300px. Tidak ada tembok — gravitasi membawamu ke atas! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 60, size: 8, difficulty: 'MID', concept: 'MID Master', targetCss: 'MID Final', minSteps: 7,
      grid: ['........', '.....E..', '........', '........', '..#..#..', '........', '........', '..S.....'],
      tips: { basic: 'Level akhir MID! Dua tembok diagonal. Gabung `translate(300px, -600px) rotate(180deg) scale(0.8)` atau pakai kombinasi properti lain.', pro: '1 sel = 100px. S(2,7) ke E(5,1) = 3 kanan + 6 atas. Tembok di (4,4) dan (7,4) — akhir MID yang spektakuler! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },

    // ===================== HARD (61-90): Multi-transform kompleks =====================
    {
      id: 61, size: 9, difficulty: 'HARD', concept: 'Chain Transform', targetCss: 'Chain', minSteps: 8,
      grid: ['........E', '........#', '........#', '........#', '........#', '........#', '........#', '........#', 'S.......'],
      tips: { basic: 'Koridor panjang dengan tembok di kolom 8 baris 1-7. Coba `translate(800px, -800px)` atau `margin-left: 800px` + `margin-top: -800px`.', pro: '1 sel = 100px. S(0,8) ke E(8,0) = 8 kanan + 8 atas = diagonal penuh grid 9x9! Tembok di (8,1) sampai (8,7) — lewati semua. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 62, size: 9, difficulty: 'HARD', concept: 'Waktu Tepat', targetCss: 'Timing', minSteps: 7,
      grid: ['.........', '.........', '....E....', '.........', '....#....', '.........', '....#....', '.........', '....S....'],
      tips: { basic: 'S dan E kolom 4. Dua tembok di kolom 4. Coba `translateY(-600px)` atau `margin-top: -600px`. Eksperimen dengan `transition-duration: 200ms` vs `800ms`.', pro: '1 sel = 100px. S(4,8) ke E(4,2) = 6 langkah = -600px. Tembok di (4,4) dan (4,6) — lewati. Cari timing paling nyaman dipandang. Ini soal feeling, bukan benar-salah.' }
    },
    {
      id: 63, size: 9, difficulty: 'HARD', concept: 'Spiral Labirin', targetCss: 'Spiral Maze', minSteps: 8,
      grid: ['........E', '........#', '.........', '.......#.', '.........', '......#..', '.........', 'S........', '.........'],
      tips: { basic: 'Pola spiral berlapis dengan 3 tembok diagonal. Coba `translate(700px, -700px)` atau `left: 700px` + `top: -700px`.', pro: 'S(0,7) ke E(7,0) = 7 kanan + 7 atas. Tembok di (8,1), (7,3), (6,5) — potong langsung semua spiral! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 64, size: 9, difficulty: 'HARD', concept: 'Jalan Buntu', targetCss: 'Dead End', minSteps: 8,
      grid: ['........E', '.........', '....#....', '.........', '....#....', '.........', '....#....', '.........', '....S....'],
      tips: { basic: 'Tiga tembok segaris di kolom 4. S di tengah bawah. Jangan masuk jalur buntu — lompati! Coba `translate(300px, -800px)` atau `margin-left: 300px` + `margin-top: -800px`.', pro: '1 sel = 100px. S(4,8) ke E(7,0) = 3 kanan (300px) + 8 atas (-800px). Tembok di (4,2),(4,4),(4,6) — lewati dari jauh dengan diagonal besar! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 65, size: 9, difficulty: 'HARD', concept: 'Koridor HARD', targetCss: 'Hard Hall', minSteps: 8,
      grid: ['.......E', '........', '........', '....#...', '........', '....#...', '........', '........', 'S.......'],
      tips: { basic: 'Koridor dengan dua celah di kolom 4. Coba `translate(700px, -800px)` atau `margin-left: 700px` + `margin-top: -800px`.', pro: '1 sel = 100px. S(0,8) ke E(7,0) = 7 kanan (700px) + 8 atas (-800px). Tembok di (4,3) dan (4,5) — lewati dengan diagonal presisi! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 66, size: 9, difficulty: 'HARD', concept: 'Triple Combo', targetCss: '3-in-1', minSteps: 8,
      grid: ['.......E', '........', '........', '........', '....#...', '........', '........', '........', 'S.......'],
      tips: { basic: 'Gabungkan translate + rotate + scale. Coba `translate(700px, -800px) rotate(90deg) scale(0.8)` atau pakai `margin` + `top` + `rotate` + `scale`.', pro: '1 sel = 100px. S(0,8) ke E(7,0) = 7 kanan + 8 atas. Tembok di (4,4). Coba scale ditaruh pertama vs terakhir — urutan properti transform SANGAT penting!' }
    },
    {
      id: 67, size: 9, difficulty: 'HARD', concept: 'Jalur Ingatan', targetCss: 'Memory', minSteps: 9,
      grid: ['........E', '.........', '.........', '.........', '....#....', '.........', '.........', '.........', '........S'],
      tips: { basic: 'S di kanan bawah, E di kanan atas. Satu tembok di tengah. Coba `translate(-100px, -800px)` atau `left: -100px` + `top: -800px`.', pro: '1 sel = 100px. S(8,8) ke E(7,0) = 1 kiri (-100px) + 8 atas (-800px). Tembok di (4,4) — lewati. Hampir vertikal penuh dengan sedikit geser kiri! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 68, size: 9, difficulty: 'HARD', concept: 'Akurasi HARD', targetCss: 'Exact Aim', minSteps: 8,
      grid: ['.........', '.........', '....E....', '.........', '....#....', '.........', '....#....', '.........', '....S....'],
      tips: { basic: 'S dan E kolom 4. Dua tembok di kolom 4 juga. Coba `translateY(-600px)`, `margin-top: -600px`, atau `top: -600px`.', pro: '1 sel = 100px. S(4,8) ke E(4,2) = 6 langkah = -600px. Tembok di (4,4) dan (4,6) — translate loncat langsung, jadi tembok di kolom yang sama TIDAK masalah! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 69, size: 9, difficulty: 'HARD', concept: 'Slalom', targetCss: 'Slalom', minSteps: 9,
      grid: ['.......E.', '.........', '.........', '....#....', '.........', '....#....', '.........', '.........', 'S.......'],
      tips: { basic: 'Dua tembok diagonal di kolom 4. Cari jalur zigzag optimal. Coba `translate(700px, -800px)` atau `margin-left: 700px` + `margin-top: -800px`.', pro: '1 sel = 100px. S(0,8) ke E(7,0) = 7 kanan + 8 atas. Tembok di (4,3) dan (4,5) — selesaikan dalam satu gerakan diagonal! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 70, size: 10, difficulty: 'HARD', concept: 'Maze Kompleks', targetCss: 'Complex', minSteps: 10,
      grid: ['..........', '..........', '....E.....', '....#.....', '..........', '....#.....', '..........', '....#.....', '..........', '....S.....'],
      tips: { basic: 'Tiga tembok vertikal di kolom 4. S di bawah, E di atas. Coba `translateY(-700px)` atau `margin-top: -700px`.', pro: '1 sel = 100px. S(4,9) ke E(4,2) = 7 langkah = -700px. Tembok di (4,3),(4,5),(4,7) — lurus ke atas lewati semua tembok! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 71, size: 10, difficulty: 'HARD', concept: 'Labirin Asli', targetCss: 'Full Maze', minSteps: 10,
      grid: ['........E.', '........#.', '..........', '.......#..', '..........', '......#...', '..........', '.........', 'S.........', '..........'],
      tips: { basic: 'Tembok di berbagai posisi diagonal. Cari jalur bersih. Coba `translate(700px, -800px)` atau `left: 700px` + `top: -800px`.', pro: 'S(0,8) ke E(7,0) = 7 kanan + 8 atas. Tembok di (8,1), (7,3), (6,5) — potong semua tembok dengan satu lompatan! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 72, size: 10, difficulty: 'HARD', concept: 'Kaskade Waktu', targetCss: 'Cascade', minSteps: 9,
      grid: ['.........E', '..........', '..........', '..........', '....#.....', '..........', '..........', '..........', '..........', 'S........'],
      tips: { basic: 'S kiri bawah, E kanan atas. Satu tembok. Coba `translate(800px, -900px)` atau `margin-left: 800px` + `margin-top: -900px`. Tambah `transition-delay: 200ms` untuk efek cascade.', pro: '1 sel = 100px. S(0,9) ke E(8,0) = 8 kanan + 9 atas. Tembok di (4,4). Delay membuat efek cascade sinematik — gabung dengan timing function yang tepat!' }
    },
    {
      id: 73, size: 10, difficulty: 'HARD', concept: 'Zigzag HARD', targetCss: 'Hard Zigzag', minSteps: 10,
      grid: ['..........', '.........E', '..........', '....#.....', '..........', '....#.....', '..........', '....#.....', '..........', 'S........'],
      tips: { basic: 'Zigzag panjang dengan tiga tembok di kolom 4. Butuh lompatan besar. Coba `translate(800px, -800px)` atau `margin-left: 800px` + `margin-top: -800px`.', pro: '1 sel = 100px. S(0,9) ke E(8,1) = 8 kanan (800px) + 8 atas (-800px). Tembok di (4,3),(4,5),(4,7) — diagonal langsung lewati semua! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 74, size: 10, difficulty: 'HARD', concept: 'Gauntlet HARD', targetCss: 'Hard Run', minSteps: 9,
      grid: ['.........E', '..........', '..........', '..........', '..........', '.....#....', '..........', '..........', '..........', 'S........'],
      tips: { basic: 'Lintasan terbuka dengan satu tembok di tengah. Coba `translate(800px, -900px)` atau `margin-left: 800px` + `margin-top: -900px`.', pro: '1 sel = 100px. S(0,9) ke E(8,0) = 8 kanan (800px) + 9 atas (-900px). Tembok di (5,5) — lompat jauh melewatinya! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 75, size: 10, difficulty: 'HARD', concept: 'HARD Boss', targetCss: 'HARD Boss', minSteps: 10,
      grid: ['..........', '....E.....', '..........', '..........', '....#.....', '..........', '..........', '....#.....', '..........', '....S.....'],
      tips: { basic: 'Boss level! Dua tembok di kolom 4. S di bawah, E di atas. Gabung `translate(0px, -800px) rotate(180deg) scale(1.2)` atau pakai `margin` + `top` + `rotate` + `scale`.', pro: '1 sel = 100px. S(4,9) ke E(4,1) = 8 langkah = -800px. Tembok di (4,4) dan (4,7) — `rotate(180deg)` + `scale(1.2)` bikin gaya boss sejati! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 76, size: 10, difficulty: 'HARD', concept: 'Jarak Tempuh', targetCss: 'Long Haul', minSteps: 8,
      grid: ['.........E', '..........', '..........', '..........', '..........', '..........', '..........', '..........', '..........', '........S'],
      tips: { basic: 'S di kanan bawah, E di kanan atas. Lurus vertikal 9 langkah. Coba `translateY(-900px)`, `margin-top: -900px`, `top: -900px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(8,9) ke E(8,0) = 9 langkah = -900px. Tidak ada tembok — jarak tempuh vertikal terjauh! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 77, size: 10, difficulty: 'HARD', concept: 'Crossfire', targetCss: 'Cross Maze', minSteps: 10,
      grid: ['..........', '........E.', '..........', '..........', '....#..#..', '..........', '..........', '..........', '..S.......', '..........'],
      tips: { basic: 'Dua tembok di tengah. S kiri bawah, E kanan atas. Coba `translate(500px, -700px)` atau `margin-left: 500px` + `margin-top: -700px`.', pro: '1 sel = 100px. S(2,8) ke E(7,1) = 5 kanan (500px) + 7 atas (-700px). Tembok di (4,4) dan (7,4) — diagonal bersih lewati keduanya! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 78, size: 10, difficulty: 'HARD', concept: 'Scale Extreme', targetCss: 'Tiny', minSteps: 9,
      grid: ['.........E', '..........', '..........', '....#.....', '..........', '....#.....', '..........', '....#.....', '..........', 'S........'],
      tips: { basic: 'Tiga tembok di kolom 4. `scale(0.4)` diperlukan. Coba `translate(800px, -900px) scale(0.4) rotate(45deg)` atau pakai `margin` + `top` + `scale`.', pro: '1 sel = 100px. S(0,9) ke E(8,0) = 8 kanan + 9 atas. Tembok di (4,3),(4,5),(4,7) — `scale(0.4)` + `rotate(45deg)` = kombinasi maksimal lewati semua! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 79, size: 10, difficulty: 'HARD', concept: 'Gerak Bouncing', targetCss: 'Bounce', minSteps: 9,
      grid: ['..........', 'E.........', '..........', '..........', '....#.....', '..........', '..........', '..........', '.....#...', '........S'],
      tips: { basic: 'S kanan bawah, E kiri atas. Dua tembok. Coba `translate(-800px, -800px)` atau `left: -800px` + `top: -800px`. Tambah `cubic-bezier()` untuk efek bouncing.', pro: 'S(8,9) ke E(0,1) = 8 kiri + 8 atas. Tembok di (4,4) dan (5,8). `cubic-bezier(0.68, -0.55, 0.27, 1.55)` — bouncing membuat gerakan terasa hidup! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 80, size: 10, difficulty: 'HARD', concept: 'Spiral Luar', targetCss: 'Outer Spiral', minSteps: 10,
      grid: ['.........E', '..........', '..........', '..........', '....#.....', '..........', '..........', '..........', '..........', 'S........'],
      tips: { basic: 'S kiri bawah, E kanan atas. Satu tembok di tengah. Coba `translate(800px, -900px)` atau `margin-left: 800px` + `margin-top: -900px`.', pro: '1 sel = 100px. S(0,9) ke E(8,0) = 8 kanan + 9 atas. Tembok di (4,4) — langsung ke tujuan! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 81, size: 10, difficulty: 'HARD', concept: 'Ketahanan', targetCss: 'Endurance', minSteps: 10,
      grid: ['..........', '..........', '..........', '..........', 'E.........', '..........', '..........', '..........', '..........', '........S'],
      tips: { basic: 'S kanan bawah, E kiri tengah. Coba `translate(-800px, -500px)` atau `left: -800px` + `top: -500px`. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.', pro: '1 sel = 100px. S(8,9) ke E(0,4) = 8 kiri (-800px) + 5 atas (-500px). Tidak ada tembok — lintasan diagonal bersih! Hitung sendiri koordinatnya.' }
    },
    {
      id: 82, size: 10, difficulty: 'HARD', concept: 'Slalom 2', targetCss: 'Slalom Hard', minSteps: 10,
      grid: ['..........', '.........E', '..........', '..........', '....#..#..', '..........', '..........', '....#..#..', '..........', 'S........'],
      tips: { basic: 'Empat tembok berpasangan. Cari celah diagonal. Coba `translate(800px, -800px)` atau `margin-left: 800px` + `margin-top: -800px`.', pro: '1 sel = 100px. S(0,9) ke E(8,1) = 8 kanan + 8 atas. Tembok di (4,4),(7,4),(4,7),(7,7) — lewati tengah semua! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 83, size: 10, difficulty: 'HARD', concept: 'Speed Run', targetCss: 'Speed Run', minSteps: 8,
      grid: ['....E.....', '..........', '..........', '..........', '..........', '..........', '..........', '..........', '..........', '....S.....'],
      tips: { basic: 'Kecepatan adalah kunci! S dan E kolom 4. Coba `translateY(-900px)` atau `margin-top: -900px`. Pakai `transition: all 150ms` untuk respons super cepat.', pro: '1 sel = 100px. S(4,9) ke E(4,0) = 9 langkah = -900px. Coba `transition: transform 100ms linear` — gerakan instan! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 84, size: 10, difficulty: 'HARD', concept: 'Switch HARD', targetCss: 'Flip Path', minSteps: 10,
      grid: ['..........', '.....E....', '..........', '..........', '.....#....', '..........', '..........', '.....#....', '..........', '.....S....'],
      tips: { basic: 'Dua tembok di kolom 5. S dan E di kolom 5. Aman? Coba `translateY(-800px)` atau `margin-top: -800px`.', pro: '1 sel = 100px. S(5,9) ke E(5,1) = 8 langkah = -800px. Tembok di (5,4) dan (5,7) — lewati semua karena translate loncat langsung! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 85, size: 10, difficulty: 'HARD', concept: 'Full Transform', targetCss: 'All Skills', minSteps: 9,
      grid: ['.........E', '..........', '..........', '..........', '..........', '..........', '..........', '..........', '..........', 'S........'],
      tips: { basic: 'Gunakan translate + rotate + scale + transition sekaligus! Coba `translate(800px, -900px) rotate(360deg) scale(1.5)` atau kombinasi properti lain.', pro: '1 sel = 100px. S(0,9) ke E(8,0) = 8 kanan + 9 atas. Tidak ada tembok — waktunya bereksperimen dengan semua properti CSS!' }
    },
    {
      id: 86, size: 10, difficulty: 'HARD', concept: 'Maze Dalam', targetCss: 'Inner Maze', minSteps: 10,
      grid: ['..........', '........E.', '..........', '..........', '....#..#..', '..........', '..........', '....#..#..', '..........', '........S'],
      tips: { basic: 'Dua pasang tembok. S kanan bawah, E kanan atas. Coba `translate(-100px, -800px)` atau `left: -100px` + `top: -800px`.', pro: '1 sel = 100px. S(8,9) ke E(7,1) = 1 kiri (-100px) + 8 atas (-800px). Tembok di (4,4),(7,4),(4,7),(7,7) — lewati dari samping! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 87, size: 10, difficulty: 'HARD', concept: 'HARD Final', targetCss: 'Last Hard', minSteps: 9,
      grid: ['..........', '..........', '....E.....', '..........', '..........', '..........', '..........', '..........', '..........', '....S.....'],
      tips: { basic: 'Akhiri HARD dengan bersih. S dan E kolom 4. Coba `translateY(-700px)`, `margin-top: -700px`, `top: -700px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(4,9) ke E(4,2) = 7 langkah = -700px. Tidak ada tembok — selesaikan dengan sempurna! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 88, size: 10, difficulty: 'HARD', concept: 'Pemanasan EXPERT', targetCss: 'Warm Up', minSteps: 10,
      grid: ['.........E', '..........', '..........', '..........', '..........', '..........', '..........', '..........', '..........', '.........S'],
      tips: { basic: 'S dan E di kolom 9. S di kanan bawah, E di kanan atas. Coba `translate(-100px, -900px)` atau `left: -100px` + `top: -900px`.', pro: '1 sel = 100px. S(9,9) ke E(8,0) = 1 kiri (-100px) + 9 atas (-900px). Pemanasan untuk EXPERT — hampir vertikal penuh! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 89, size: 10, difficulty: 'HARD', concept: 'Review HARD', targetCss: 'Review', minSteps: 9,
      grid: ['..........', '........E.', '..........', '..........', '..........', '..........', '..........', '..........', '..........', 'S........'],
      tips: { basic: 'Review semua teknik HARD. S kiri bawah, E kanan atas. Coba `translate(700px, -800px)` atau `margin-left: 700px` + `margin-top: -800px`.', pro: '1 sel = 100px. S(0,9) ke E(7,1) = 7 kanan (700px) + 8 atas (-800px). Tidak ada tembok — selesaikan dengan efisien! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 90, size: 10, difficulty: 'HARD', concept: 'HARD Master', targetCss: 'HARD Final', minSteps: 10,
      grid: ['.........E', '..........', '..........', '..........', '..........', '..........', '..........', '..........', '..........', '........S'],
      tips: { basic: 'HARD selesai! S di kanan bawah, E di kanan atas. Coba `translate(800px, -900px) rotate(720deg) scale(2)` — grand finale! Atau pakai kombinasi properti lain.', pro: '1 sel = 100px. S(8,9) ke E(8,0) = 9 langkah = -900px. Tidak ada tembok. `rotate(720deg)` = dua putaran penuh. Siap ke EXPERT? Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },

    // ===================== EXPERT (91-120): Keyframe, opacity, animasi =====================
    {
      id: 91, size: 11, difficulty: 'EXPERT', concept: 'Keyframe Pertama', targetCss: '@keyframes', minSteps: 8,
      grid: ['..........E', '...........#', '...........#', '...........#', '...........#', '...........#', '...........#', '...........#', '...........#', '...........#', 'S.........#'],
      tips: { basic: 'Buat @keyframes dengan nama bebas. 100% { transform: translate(1000px, -1000px); } atau pakai `margin-left` + `margin-top` di keyframe.', pro: '1 sel = 100px. S(0,10) ke E(10,0) = 10 kanan + 10 atas. Tembok di kolom 10 baris 1-9. Animation: `move 2s ease-in-out` — gerakan otomatis tanpa klik!' }
    },
    {
      id: 92, size: 11, difficulty: 'EXPERT', concept: 'Hantu CSS', targetCss: 'opacity', minSteps: 8,
      grid: ['..........E', '...........', '...........', '....#......', '...........', '....#......', '...........', '....#......', '...........', '...........', 'S..........'],
      tips: { basic: 'Coba `opacity: 0.5` — pemain jadi tembus pandang! Gabung dengan `translate(900px, -1000px)` atau `margin-left: 900px` + `margin-top: -1000px`.', pro: '1 sel = 100px. S(0,10) ke E(9,0) = 9 kanan + 10 atas. Tembok di (4,3),(4,5),(4,7). Opacity 0.5 + `blur(2px)` = efek ghost. Coba kombinasi filter lainnya!' }
    },
    {
      id: 93, size: 11, difficulty: 'EXPERT', concept: 'Jalur SVG', targetCss: 'offset-path', minSteps: 10,
      grid: ['...........', '.......E...', '...........', '...........', '....#......', '...........', '...........', '....#......', '...........', '...........', '...S.......'],
      tips: { basic: 'Coba `offset-path: path("M 300,800 L 700,200")` — ikuti garis SVG! Atau pakai `translate(400px, -900px)` + `margin-top` secara manual.', pro: '1 sel = 100px. S(3,10) ke E(7,1) = 4 kanan + 9 atas. Tembok di (4,4) dan (4,7). offset-path bikin gerakan sangat presisi mengikuti path yang ditentukan!' }
    },
    {
      id: 94, size: 11, difficulty: 'EXPERT', concept: 'Titik Pivot', targetCss: 'transform-origin', minSteps: 9,
      grid: ['...........', '........E..', '...........', '...........', '...........', '...........', '...........', '...........', '...........', '...........', '........S..'],
      tips: { basic: 'S dan E di kolom 8. Lurus vertikal. Coba `translateY(-900px) rotate(45deg)` dengan `transform-origin: top left`.', pro: '1 sel = 100px. S(8,10) ke E(8,1) = 9 langkah = -900px. Pivot beda = gerakan beda. Coba `center`, `top right`, `bottom left` — lihat perbedaannya!' }
    },
    {
      id: 95, size: 11, difficulty: 'EXPERT', concept: 'Multi Waypoint', targetCss: 'Waypoints', minSteps: 10,
      grid: ['..........E', '...........', '...........', '...........', '....#......', '...........', '...........', '....#......', '...........', '...........', 'S..........'],
      tips: { basic: 'Buat keyframe 3 tahap: 0%{} 50%{transform:...} 100%{transform:...} atau pakai `translate(900px, -1000px)` langsung.', pro: 'S(0,10) ke E(9,0) = 9 kanan + 10 atas. Tembok di (4,4) dan (4,7). Makin banyak waypoint = makin halus gerakan. Coba 5 waypoint dengan % ganjil!' }
    },
    {
      id: 96, size: 11, difficulty: 'EXPERT', concept: 'Ukuran Mikro', targetCss: 'Micro Scale', minSteps: 9,
      grid: ['...........', '........E..', '...........', '...........', '.....#.....', '...........', '...........', '.....#.....', '...........', '...........', '........S..'],
      tips: { basic: 'S dan E kolom 8. Dua tembok di kolom 5. Coba `translateY(-900px) scale(0.25)` atau `margin-top: -900px` + `scale(0.25)`.', pro: '1 sel = 100px. S(8,10) ke E(8,1) = 9 langkah = -900px. Tembok di (5,4) dan (5,7) — dengan scale(0.25) sangat kecil, celah sempit bukan masalah!' }
    },
    {
      id: 97, size: 11, difficulty: 'EXPERT', concept: '3D Depth', targetCss: 'perspective', minSteps: 10,
      grid: ['...........', '.......E...', '...........', '...........', '...........', '...........', '...........', '...........', '...........', '...........', '...S.......'],
      tips: { basic: 'Coba `perspective(800px) rotateX(45deg)` ditambah `translate(400px, -900px)` — maze jadi 3D! Bisa juga pakai `margin` + `top`.', pro: '1 sel = 100px. S(3,10) ke E(7,1) = 4 kanan + 9 atas. Tidak ada tembok. Perspective + rotateX/Y = ilusi 3D. Coba variasi nilai perspective!' }
    },
    {
      id: 98, size: 11, difficulty: 'EXPERT', concept: 'Animasi Penuh', targetCss: 'Full Animation', minSteps: 10,
      grid: ['.........E.', '...........', '...........', '...........', '...........', '...........', '...........', '...........', '...........', '...........', 'S........'],
      tips: { basic: 'Gabung animation + transform + transition! Coba `translate(800px, -1000px)` + `animation: move 3s ease-in-out infinite`.', pro: '1 sel = 100px. S(0,10) ke E(8,0) = 8 kanan + 10 atas. Tidak ada tembok. `animation: move 3s ease-in-out infinite` — pemain bergerak otomatis tanpa henti!' }
    },
    {
      id: 99, size: 12, difficulty: 'EXPERT', concept: 'Maze EXPERT', targetCss: 'Expert Maze', minSteps: 12,
      grid: ['............', '............', '.......E....', '.......#....', '............', '.......#....', '............', '.......#....', '............', '.......#....', '............', '.......S....'],
      tips: { basic: 'Empat tembok vertikal di kolom 7. S bawah, E atas. Coba `translateY(-900px)` atau `margin-top: -900px`. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.', pro: '1 sel = 100px. S(7,11) ke E(7,2) = 9 langkah = -900px. Tembok di (7,3),(7,5),(7,7),(7,9) — lompat vertikal besar lewati semua!' }
    },
    {
      id: 100, size: 12, difficulty: 'EXPERT', concept: 'Level 100!', targetCss: 'Century', minSteps: 12,
      grid: ['........E...', '............', '............', '............', '.....#......', '............', '............', '.....#......', '............', '............', '............', '........S...'],
      tips: { basic: 'Level 100! Coba sesuatu spektakuler. `translate(500px, -1100px) rotate(360deg) scale(1.5)` atau pakai kombinasi `margin` + `top` + `rotate` + `scale`.', pro: '1 sel = 100px. S(8,11) ke E(8,0) — cari sendiri! Tembok di (5,4) dan (5,7). Style untuk legenda CSS sejati! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 101, size: 12, difficulty: 'EXPERT', concept: 'EXPERT Dalam', targetCss: 'Deep Expert', minSteps: 12,
      grid: ['............', '.........E..', '............', '............', '............', '............', '............', '............', '............', '............', '............', '.........S..'],
      tips: { basic: 'EXPERT menguji fokusmu. S dan E di kolom 9. Coba `translateY(-1000px)`, `margin-top: -1000px`, `top: -1000px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(9,11) ke E(9,1) = 10 langkah = -1000px. Tidak ada tembok — fokus dan hitung dengan tepat! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 102, size: 12, difficulty: 'EXPERT', concept: 'Rantai Keyframe', targetCss: 'Keyframe Chain', minSteps: 11,
      grid: ['............', '............', '.......E....', '............', '............', '............', '............', '............', '............', '............', '............', '.......S....'],
      tips: { basic: 'S dan E kolom 7. Buat 5 waypoint dengan % ganjil: 13%, 37%, 62%, 88%, 100% atau pakai `translateY(-1000px)` langsung.', pro: '1 sel = 100px. S(7,11) ke E(7,1) = 10 langkah = -1000px. % ganjil bikin gerakan organik, tidak kaku. Coba sendiri variasinya! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 103, size: 12, difficulty: 'EXPERT', concept: 'Presisi Pixel', targetCss: 'Pixel Perfect', minSteps: 11,
      grid: ['.........E..', '............', '............', '............', '............', '............', '............', '............', '............', '............', '............', '.........S..'],
      tips: { basic: '1 pixel salah = gagal. Kamu perlu hitung koordinat exact! Coba `translate(-100px, -1100px)` atau `left: -100px` + `top: -1100px`.', pro: '1 sel = 100px. S(9,11) ke E(9,0) — cari sendiri! Hitung sekali, benar selamanya. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 104, size: 12, difficulty: 'EXPERT', concept: 'Spiral EXPERT', targetCss: 'Deep Spiral', minSteps: 12,
      grid: ['........E...', '............', '............', '............', '............', '............', '............', '............', '............', '............', '............', '........S...'],
      tips: { basic: 'S dan E di kolom 8. Lurus vertikal 11 langkah. Coba `translateY(-1100px)` atau `margin-top: -1100px`.', pro: '1 sel = 100px. S(8,11) ke E(8,0) = 11 langkah = -1100px. Tidak ada tembok — atau ada rute lebih baik? Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 105, size: 12, difficulty: 'EXPERT', concept: 'Pusat Maze', targetCss: 'Core', minSteps: 11,
      grid: ['............', '....E.......', '............', '............', '............', '............', '............', '............', '............', '............', '............', '....S.......'],
      tips: { basic: 'S dan E kolom 4. Lurus ke atas 10 langkah. Coba `translateY(-1000px)`, `margin-top: -1000px`, `top: -1000px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(4,11) ke E(4,1) = 10 langkah = -1000px. Tidak ada tembok — fokus lurus ke atas! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 106, size: 12, difficulty: 'EXPERT', concept: 'Switch EXPERT', targetCss: 'Flip Expert', minSteps: 12,
      grid: ['.........E..', '............', '............', '............', '............', '............', '............', '............', '............', '............', '............', '........S...'],
      tips: { basic: 'S(8,11) ke E(9,0) — diagonal tipis: 1 kanan + 11 atas. Coba `translate(100px, -1100px)` atau `margin-left: 100px` + `margin-top: -1100px`.', pro: '1 sel = 100px. Hitung sendiri koordinat S dan E dari grid. Tepatkan nilai X dan Y! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 107, size: 12, difficulty: 'EXPERT', concept: 'Master Opacity', targetCss: 'Phantom', minSteps: 11,
      grid: ['........E...', '............', '............', '............', '............', '............', '............', '............', '............', '............', '............', '........S...'],
      tips: { basic: 'Opacity rendah + filter blur = efek ghost keren. Coba `opacity: 0.3; filter: blur(1px)` + `translateY(-1100px)` atau `margin-top: -1100px`.', pro: '1 sel = 100px. S(8,11) ke E(8,0) = 11 langkah = -1100px. `opacity: 0.3; filter: blur(1px)` — jadi hantu CSS sejati! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 108, size: 12, difficulty: 'EXPERT', concept: 'Waktu EXPERT', targetCss: 'Expert Timing', minSteps: 12,
      grid: ['............', '.........E..', '............', '............', '............', '............', '............', '............', '............', '............', '............', 'S...........'],
      tips: { basic: 'Timing + presisi = kunci EXPERT. S kiri bawah, E kanan atas. Coba `translate(900px, -1000px)` atau `margin-left: 900px` + `margin-top: -1000px`.', pro: '1 sel = 100px. S(0,11) ke E(9,1) = 9 kanan (900px) + 10 atas (-1000px). Transition yang pas = sukses di EXPERT!' }
    },
    {
      id: 109, size: 12, difficulty: 'EXPERT', concept: 'EXPERT Akhir', targetCss: 'Endurance', minSteps: 12,
      grid: ['............', '........E...', '............', '............', '............', '............', '............', '............', '............', '............', '............', '........S...'],
      tips: { basic: 'Terus fokus pada tujuan. S dan E kolom 8. Coba `translateY(-1000px)`, `margin-top: -1000px`, `top: -1000px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(8,11) ke E(8,1) = 10 langkah = -1000px. Jangan menyerah — satu langkah pada satu waktu! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 110, size: 12, difficulty: 'EXPERT', concept: 'EXPERT Boss', targetCss: 'EXPERT Boss', minSteps: 12,
      grid: ['.........E..', '............', '............', '............', '............', '............', '............', '............', '............', '............', '............', '.........S..'],
      tips: { basic: 'Boss EXPERT! translate + rotate + scale + opacity + animation! Coba `translate(900px, -1000px) scale(0.5) rotate(270deg)` atau kombinasi properti lain.', pro: '1 sel = 100px. S(9,11) ke E(9,0) = cari sendiri! Master style EXPERT sejati — buktikan kemampuanmu!' }
    },
    {
      id: 111, size: 13, difficulty: 'EXPERT', concept: 'EXPERT 13', targetCss: 'Unlucky', minSteps: 12,
      grid: ['.............', '........E....', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '........S....'],
      tips: { basic: 'Grid 13x13. S dan E kolom 8. Lompatan vertikal 11 langkah. Coba `translateY(-1100px)` atau `margin-top: -1100px`.', pro: '1 sel = 100px. S(8,12) ke E(8,1) = 11 langkah = -1100px. Tidak ada tembok — lurus ke atas! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 112, size: 13, difficulty: 'EXPERT', concept: 'Lebar EXPERT', targetCss: 'Wide Run', minSteps: 12,
      grid: ['.............', '.............', '.............', '.............', '.............', '.............', '........E....', '.............', '.............', '.............', '.............', '.............', '.............S'],
      tips: { basic: 'S pojok kanan bawah, E di tengah kanan. Coba `translate(-400px, -600px)` atau `left: -400px` + `top: -600px`.', pro: '1 sel = 100px. S(12,12) ke E(8,6) = 4 kiri (-400px) + 6 atas (-600px). Tidak ada tembok — hitung diagonal dengan tepat! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 113, size: 13, difficulty: 'EXPERT', concept: 'Memori EXPERT', targetCss: 'Memory', minSteps: 12,
      grid: ['.............', '..E..........', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '..S..........'],
      tips: { basic: 'S dan E kolom 2. Lurus ke atas 11 langkah. Coba `translateY(-1100px)`, `margin-top: -1100px`, `top: -1100px`, atau `padding-top` negatif.', pro: '1 sel = 100px. S(2,12) ke E(2,1) = 11 langkah = -1100px. Ingat koordinat awalmu! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 114, size: 13, difficulty: 'EXPERT', concept: 'Kecepatan EXPERT', targetCss: 'Speed', minSteps: 11,
      grid: ['.............', '..........E..', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '..........S..'],
      tips: { basic: 'Prioritas kecepatan! S dan E kolom 10. Coba `transition: all 150ms` + `translateY(-1100px)` atau `margin-top: -1100px`.', pro: '1 sel = 100px. S(10,12) ke E(10,1) = 11 langkah = -1100px. `transition: transform 100ms linear` — respons secepat kilat! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 115, size: 13, difficulty: 'EXPERT', concept: 'Puncak EXPERT', targetCss: 'Summit', minSteps: 12,
      grid: ['.............', '.............', '.....E.......', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.....S.......'],
      tips: { basic: 'Pendakian 10 langkah. S dan E kolom 5. Coba `translateY(-1000px)` atau `margin-top: -1000px`. Jangan menyerah — puncak sudah dekat!', pro: '1 sel = 100px. S(5,12) ke E(5,2) = 10 langkah = -1000px. Tidak ada tembok — fokus pada tujuan! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 116, size: 13, difficulty: 'EXPERT', concept: 'Persiapan ADVANCE', targetCss: 'Pre-Advance', minSteps: 12,
      grid: ['.............', '.............', '.........E...', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.........S...'],
      tips: { basic: 'S dan E kolom 9. Coba `translateY(-1000px)` atau `margin-top: -1000px`. Bersiap untuk ADVANCE — tingkatan paling sulit!', pro: '1 sel = 100px. S(9,12) ke E(9,2) = 10 langkah = -1000px. Persiapan mental untuk tantangan terberat! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 117, size: 13, difficulty: 'EXPERT', concept: 'Review EXPERT', targetCss: 'Review', minSteps: 12,
      grid: ['.............', '.............', '.............', '........E....', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '........S....'],
      tips: { basic: 'Review semua teknik EXPERT sebelum masuk ADVANCE. S kanan bawah, E kiri tengah. Coba `translate(-500px, -900px)` atau `left: -500px` + `top: -900px`.', pro: '1 sel = 100px. S(8,12) ke E(3,3) = 5 kiri (-500px) + 9 atas (-900px). Tidak ada tembok — hitung dengan presisi! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 118, size: 13, difficulty: 'EXPERT', concept: 'EXPERT Final 2', targetCss: 'Last Expert', minSteps: 12,
      grid: ['.............', '.............', '.............', '.............', '........E....', '.............', '.............', '.............', '.............', '.............', '.............', '.............', '........S....'],
      tips: { basic: 'Tinggal 2 level lagi menuju ADVANCE. S dan E kolom 8. Coba `translateY(-800px)` atau `margin-top: -800px`.', pro: '1 sel = 100px. S(8,12) ke E(8,4) = 8 langkah = -800px. Kuatkan mental — ADVANCE menanti! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 119, size: 13, difficulty: 'EXPERT', concept: 'Pintu ADVANCE', targetCss: 'Gate', minSteps: 12,
      grid: ['.............', '.............', '.............', '.............', '.............', '.............', '.....E.......', '.............', '.............', '.............', '.............', '.............', '.....S.......'],
      tips: { basic: 'Pintu gerbang menuju ADVANCE. S dan E kolom 5. Coba `translateY(-600px)`, `margin-top: -600px`, atau `top: -600px`.', pro: '1 sel = 100px. S(5,12) ke E(5,6) = 6 langkah = -600px. Selesaikan dengan sempurna! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 120, size: 13, difficulty: 'EXPERT', concept: 'EXPERT Master', targetCss: 'EXPERT Final', minSteps: 12,
      grid: ['.............', '.............', '.............', '.............', '.............', '.........E...', '.............', '.............', '.............', '.............', '.............', '.............', '.........S...'],
      tips: { basic: 'EXPERT selesai! S dan E kolom 9. Coba `translate(800px, -700px) rotate(1080deg) scale(0.3)` atau kombinasi properti lain. Kamu layak masuk ADVANCE!', pro: '1 sel = 100px. S(9,12) ke E(9,5) = cari sendiri! `rotate(1080deg)` = 3 putaran penuh. Master style sejati!' }
    },

    // ===================== ADVANCE (121-150): Puncak permainan =====================
    {
      id: 121, size: 14, difficulty: 'ADVANCE', concept: 'Gerbang ADVANCE', targetCss: 'Grand Opening', minSteps: 13,
      grid: ['..............', '..............', '..............', '..............', '..............', '..............', '.......E......', '.....#........', '..............', '.......#......', '..............', '..............', '..............', '.......S......'],
      tips: { basic: 'Selamat datang di ADVANCE! S dan E kolom 7. Ada tembok di (4,7) dan (9,7). Coba `translateY(-700px)` atau `margin-top: -700px`. Hati-hati dengan tembok!', pro: '1 sel = 100px. S(7,13) ke E(7,6) = 7 langkah = -700px. Tembok di (4,7) dan (9,7) — cari jalur diagonal bersih di antara mereka. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 122, size: 14, difficulty: 'ADVANCE', concept: 'Jalur Sempurna', targetCss: 'Perfect Route', minSteps: 14,
      grid: ['..............', '..............', '..............', '..............', '..............', '..............', '..............', '.....#........', '..............', '..............', '......#.......', '..............', '..............', '..............S'],
      tips: { basic: 'Dua tembok tersebar. S pojok kanan bawah. Coba `translate(-700px, -700px)` atau `left: -700px` + `top: -700px`.', pro: 'S(14,13) ke E(7,6) = 7 kiri + 7 atas. Tembok di (5,7) dan (6,10) — hitung sendiri koordinat dan cari rute diagonal yang aman. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 123, size: 14, difficulty: 'ADVANCE', concept: 'Koridor Epik', targetCss: 'Epic Hall', minSteps: 13,
      grid: ['..............', '..............', '..............', '..............', '.#............', '..............', '..............', '..............', '..............', '........#.....', '..............', '..............', '..............', '..............E'],
      tips: { basic: 'Dua tembok di pojok. Cari S di grid — ada di mana? Gunakan `margin-left`, `left`, `translateX`, atau `padding-left` untuk gerak horizontal.', pro: 'S di (0,13) dan E di (14,13). Butuh 14 kanan + 1 turun = `translate(1400px, 100px)`. Tembok di (1,4) dan (9,9). Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 124, size: 14, difficulty: 'ADVANCE', concept: 'Master Scale', targetCss: 'Tiny Master', minSteps: 13,
      grid: ['..............', '..............', '..............', '..............', '..............', '.....#........', '..............', '........#.....', '..............', '..............', '..............', '..............', '..............', '..............S'],
      tips: { basic: 'Dua tembok. S pojok kanan bawah. Coba `translate(-1300px, -1300px) scale(0.2)` atau `left: -1300px` + `top: -1300px` + `scale(0.2)`.', pro: '1 sel = 100px. S(13,13) ke E(0,0) = 13 kiri + 13 atas. Tembok di (5,5) dan (7,8). `scale(0.2)` bikin super kecil — lewati celah mana pun! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 125, size: 14, difficulty: 'ADVANCE', concept: 'Maze Omega', targetCss: 'Omega Maze', minSteps: 14,
      grid: ['..............', '..............', '..............', '..............', '..............', '..............', '..............', '......#.......', '.....#........', '..............', '.......#......', '..............', '..............', '..............S'],
      tips: { basic: 'Tiga tembok di tengah. S pojok kanan bawah. Coba `translate(-1300px, -1300px)` atau `left: -1300px` + `top: -1300px`. Rencanakan rute dengan teliti!', pro: 'S(13,13) ke E(0,0) = 13 kiri + 13 atas. Tembok di (7,7), (8,5), (10,7) — lewati semua dengan satu lompatan diagonal besar! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 126, size: 14, difficulty: 'ADVANCE', concept: 'Spiral Master', targetCss: 'Ultra Spiral', minSteps: 14,
      grid: ['..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '......#.......', '..............', '.......#......', '..............', '..............S'],
      tips: { basic: 'Dua tembok di kuadran kiri bawah. S di kanan bawah. Coba `translate(-700px, -700px)` atau `left: -700px` + `top: -700px`.', pro: '1 sel = 100px. S(13,13) ke E(6,6) = 7 kiri + 7 atas. Tembok di (9,6) dan (11,7) — diagonal bersih menuju pusat! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 127, size: 14, difficulty: 'ADVANCE', concept: 'Presisi Grand', targetCss: 'Flawless', minSteps: 13,
      grid: ['..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '......#.......', '..............', '..............', '..............S'],
      tips: { basic: 'Hanya satu tembok — tapi jangan remehkan. S pojok kanan bawah. Coba `translate(-700px, -1300px)` atau `left: -700px` + `top: -1300px`.', pro: 'S(14,13) ke E(7,0) = 7 kiri + 13 atas. Tembok di (10,6) — ADVANCE tidak memberi ampun! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 128, size: 14, difficulty: 'ADVANCE', concept: 'Sinkronisasi', targetCss: 'Perfect Sync', minSteps: 14,
      grid: ['..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '......#.......', '..............', '..............S'],
      tips: { basic: 'Satu tembok di kiri bawah. Timing + transform + keyframe! Coba `translate(-700px, -1300px)` atau `left: -700px` + `top: -1300px`.', pro: 'S(13,13) ke E(6,0) = 7 kiri + 13 atas. Tembok di (11,6) — lewati dengan presisi. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 129, size: 14, difficulty: 'ADVANCE', concept: 'Kehampaan', targetCss: 'Void', minSteps: 13,
      grid: ['..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '.....#........', '..............', '..............', '......#.......', '..............S'],
      tips: { basic: 'Dua tembok di tengah kiri. S pojok kanan bawah. Coba `translate(-1400px, -700px)` atau `left: -1400px` + `top: -700px`. Keahlianmu yang berbicara!', pro: 'S(14,13) ke E(0,6) = 14 kiri + 7 atas. Tembok di (9,5) dan (12,6) — diagonal besar melintasi grid! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 130, size: 14, difficulty: 'ADVANCE', concept: 'Grand Finale', targetCss: 'Epic Finish', minSteps: 14,
      grid: ['..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............', '..............S'],
      tips: { basic: '20 level tersisa! S pojok kanan bawah, E pojok kiri atas. Tunjukkan kemampuan maksimalmu dengan `translate(-1300px, -1300px) rotate(720deg) scale(0.1)`.', pro: '1 sel = 100px. S(13,13) ke E(0,0) = 13 kiri + 13 atas. Tidak ada tembok — tapi ini ADVANCE! `rotate(720deg)` + `scale(0.1)` = gaya maksimal!' }
    },
    {
      id: 131, size: 15, difficulty: 'ADVANCE', concept: 'Maze Raksasa', targetCss: 'Giga Grid', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Grid 15x15 dengan satu tembok di pusat. Buktikan kemampuanmu! Coba `translate(-1400px, -1400px)` atau `left: -1400px` + `top: -1400px`.', pro: 'S(14,14) ke E(0,0) = 14 kiri + 14 atas. Tembok di (7,7) — lewati dengan lompatan diagonal raksasa! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 132, size: 15, difficulty: 'ADVANCE', concept: 'Ujian Akhir', targetCss: 'Final Exam', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Ujian akhir. Satu tembok di baris 8. Semua teknik diuji! Coba `translate(-1400px, -1400px)` atau kombinasi `margin` + `top` + `scale` + `rotate`.', pro: 'S(14,14) ke E(0,0) = 14 kiri + 14 atas. Tembok di (8,7). Kombinasikan translate, rotate, scale, opacity, keyframe. Buktikan kau master CSS!' }
    },
    {
      id: 133, size: 15, difficulty: 'ADVANCE', concept: 'Jalur Takdir', targetCss: 'Destiny', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Satu tembok di (9,7). S pojok kanan bawah. Coba `translate(-700px, -700px) scale(0.5)` atau `left: -700px` + `top: -700px` + `scale(0.5)`.', pro: 'S(14,14) ke E(7,7) = 7 kiri + 7 atas. Tembok di (9,7) — lewati dengan diagonal. Hanya kau dan tujuannya. Fokus! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 134, size: 15, difficulty: 'ADVANCE', concept: 'Kedamaian', targetCss: 'Zen', minSteps: 13,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............S'],
      tips: { basic: 'Tenangkan pikiran. Satu tembok di (12,7). Coba `translate(-1500px, -1400px)` atau `left: -1500px` + `top: -1400px`. Butuh ketenangan dan fokus.', pro: 'S(15,14) ke E(0,0) = 15 kiri + 14 atas. Tembok di (12,7) — lewati dengan tenang. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 135, size: 15, difficulty: 'ADVANCE', concept: 'Master Stroke', targetCss: 'Grand Master', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Satu gerakan untuk menguasai semuanya. S pojok kanan bawah. Coba `translate(-1400px, -700px) rotate(360deg)` atau kombinasi `margin` + `top` + `rotate`.', pro: 'S(14,14) ke E(0,7) = 14 kiri + 7 atas. Tidak ada tembok. Hitung sendiri koordinat dan pilih gaya dengan bijak! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 136, size: 15, difficulty: 'ADVANCE', concept: 'CSS Dewa', targetCss: 'Transcend', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '.......#.......', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Dua tembok berdampingan di (7,7) dan (8,7). CSS Dewa — atau hanya manusia? Coba `translate(-1500px, -1400px)` + `rotate` + `scale`.', pro: 'S(15,14) ke E(0,0) = 15 kiri + 14 atas. Tembok di (7,7) dan (8,7) — lewati dengan rotate + scale kombinasi! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 137, size: 15, difficulty: 'ADVANCE', concept: 'Ujian Berat', targetCss: 'Ultimate Trial', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............S'],
      tips: { basic: 'Ujian paling berat. Satu tembok tak terduga di (11,7). Coba `translate(-1500px, -1300px)` atau `left: -1500px` + `top: -1300px`. Jangan lengah!', pro: 'S(15,13) ke E(0,0) = 15 kiri + 13 atas. Tembok di (11,7) — satu kesalahan dan gagal total. Fokus penuh! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 138, size: 15, difficulty: 'ADVANCE', concept: 'Omega', targetCss: 'The End?', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Hampir selesai! Satu tembok di (10,7). Coba `translate(-1400px, -1400px) opacity(0.5)` atau `left: -1400px` + `top: -1400px` + `opacity`. Jangan menyerah!', pro: 'S(14,14) ke E(0,0) = 14 kiri + 14 atas. Tembok di (10,7) — kau sudah sejauh ini, selesaikan dengan gemilang! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 139, size: 15, difficulty: 'ADVANCE', concept: 'Satu Lagi', targetCss: 'One Left', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Satu level lagi menuju akhir. Tembok di (6,7). Coba `translate(-1500px, -1400px) scale(0.1)` atau kombinasi `margin` + `top` + `scale`. Berikan yang terbaik!', pro: 'S(15,14) ke E(0,0) = 15 kiri + 14 atas. Tembok di (6,7) — `scale(0.1)` bikin kamu super kecil. Selesaikan dengan gemilang! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 140, size: 15, difficulty: 'ADVANCE', concept: 'Jalur Omega', targetCss: 'Omega Path', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Jalur takdir! Sejarah menanti. Selesaikan dengan gemilang. Coba `translate(-1500px, -1400px) rotate(720deg) scale(2)` atau kombinasi properti lain.', pro: 'S(15,14) ke E(0,0) = 15 kiri + 14 atas. Tidak ada tembok. `rotate(720deg)` = dua putaran penuh. Jadikan ini spektakuler!' }
    },
    {
      id: 141, size: 15, difficulty: 'ADVANCE', concept: 'Transcendence', targetCss: 'Beyond CSS', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Satu tembok terakhir di (7,7). Kau telah melampaui batas CSS biasa. Coba `translate(-1400px, -1400px) scale(0.3) rotate(540deg)` atau kombinasi lain.', pro: 'S(14,14) ke E(0,0) = 14 kiri + 14 atas. Tembok di (7,7). `rotate(540deg)` = 1.5 putaran. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 142, size: 15, difficulty: 'ADVANCE', concept: 'Puncak', targetCss: 'Peak', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Puncak gunung CSS. Coba `translate(-800px, -1400px)` atau `left: -800px` + `top: -1400px`. Nikmati pemandangan dari atas!', pro: 'S(15,14) ke E(7,0) = 8 kiri + 14 atas. Tidak ada tembok. Pilih antara speed atau style — keduanya valid! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 143, size: 15, difficulty: 'ADVANCE', concept: 'Keabadian', targetCss: 'Timeless', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............S'],
      tips: { basic: 'Hampir usai. Tembok di (11,7). Coba `translate(-1500px, -1300px) opacity(0.2)` atau `left: -1500px` + `top: -1300px` + `opacity`. Bertahanlah!', pro: 'S(15,13) ke E(0,0) = 15 kiri + 13 atas. Tembok di (11,7). `opacity(0.2)` bikin efek hantu di detik-detik akhir. Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 144, size: 15, difficulty: 'ADVANCE', concept: 'Warisan', targetCss: 'Legacy', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Apa yang akan kau tinggalkan sebagai warisan CSS-mu? Tembok di (9,7). Coba `translate(-1500px, -1300px) scale(0.5) rotate(1080deg)`.', pro: 'S(15,13) ke E(0,0) = 15 kiri + 13 atas. Tembok di (9,7). `rotate(1080deg)` = 3 putaran penuh. Jadikan ini legendaris! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 145, size: 15, difficulty: 'ADVANCE', concept: 'Awal Baru', targetCss: 'Genesis', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Akhir adalah awal yang baru. Selesaikan dengan indah. Coba `translate(-1400px, -1400px) rotate(1440deg)` atau kombinasi properti lain.', pro: 'S(14,14) ke E(0,0) = 14 kiri + 14 atas. Tidak ada tembok. `rotate(1440deg)` = 4 putaran penuh. Selesaikan dengan gaya yang tak terlupakan!' }
    },
    {
      id: 146, size: 15, difficulty: 'ADVANCE', concept: 'CSS Nirwana', targetCss: 'Nirvana', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Nirwana CSS. Satu tembok di (8,7). Coba `translate(-800px, -700px) scale(0.8)` atau `left: -800px` + `top: -700px` + `scale(0.8)`.', pro: 'S(15,14) ke E(7,7) = 8 kiri + 7 atas. Tembok di (8,7) — lewati dengan diagonal presisi. Kedamaian sejati dalam kode! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 147, size: 15, difficulty: 'ADVANCE', concept: 'Pencerahan', targetCss: 'Enlightened', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '.......#.......', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Kau telah mencapai pencerahan CSS. 4 level lagi! Tembok di (7,7). Coba `translate(-1500px, -1400px) scale(0.1) rotate(2160deg)` atau kombinasi lain.', pro: 'S(15,14) ke E(0,0) = 15 kiri + 14 atas. Tembok di (7,7). `rotate(2160deg)` = 6 putaran penuh. Cahaya pencerahan CSS! Kamu bisa pakai properti lain seperti margin, padding, top, left, atau transform.' }
    },
    {
      id: 148, size: 15, difficulty: 'ADVANCE', concept: 'Abadi', targetCss: 'Immortal', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Abadi dalam CSS! Namamu akan dikenang sebagai legenda. Coba `translate(-1400px, -1400px) rotate(1800deg) scale(5)` atau kombinasi properti lain.', pro: 'S(14,14) ke E(0,0) = 14 kiri + 14 atas. Tidak ada tembok. `rotate(1800deg)` = 5 putaran penuh. Jadilah abadi dalam CSS!' }
    },
    {
      id: 149, size: 15, difficulty: 'ADVANCE', concept: 'Sebelum Akhir', targetCss: 'One Step Away', minSteps: 14,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'Satu langkah lagi menuju keabadian CSS. Rasakan momen ini! Coba `translate(-1500px, -1400px) rotate(900deg) scale(0.05)` atau kombinasi properti lain.', pro: 'S(15,14) ke E(0,0) = 15 kiri + 14 atas. Tidak ada tembok. `rotate(900deg)` = 2.5 putaran. Yang terakhir sebelum final...' }
    },
    {
      id: 150, size: 15, difficulty: 'ADVANCE', concept: 'CSS APEX', targetCss: 'THE FINAL FRONTIER', minSteps: 15,
      grid: ['...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............', '...............S'],
      tips: { basic: 'TAK ADA TEMBOK. Hanya kau dan CSS-mu. Coba `translate(-1500px, -1400px) rotate(1440deg) scale(4)` atau kombinasi properti lain. Buktikan kau adalah MASTER CSS!', pro: 'S(15,14) ke E(0,0) = 15 kiri + 14 atas. Tidak ada tembok karena kau sudah melampaui batas. `rotate(1440deg)` = 4 putaran. JADILAH LEGENDA CSS!' }
    },

  ];
}

export const levels: Level[] = buildLevels();

const DIFFICULTY_TIER_LABELS: Record<Difficulty, { label: string; color: string; }> = {
  EZ: { label: 'EASY', color: '#00e5ff' },
  MID: { label: 'MEDIUM', color: '#7c3aed' },
  HARD: { label: 'HARD', color: '#f43f5e' },
  EXPERT: { label: 'EXPERT', color: '#fbbf24' },
  ADVANCE: { label: 'ADVANCE', color: '#fff' },
};

export function getDifficultyLabel(d: Difficulty) { return DIFFICULTY_TIER_LABELS[d]; }

export function parseGrid(gridStr: string[]) {
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };
  const walls = new Set<string>();

  for (let y = 0; y < gridStr.length; y++) {
    for (let x = 0; x < gridStr[y].length; x++) {
      const cell = gridStr[y][x];
      if (cell === 'S') start = { x, y };
      else if (cell === 'E') end = { x, y };
      else if (cell === '#') walls.add(`${x},${y}`);
    }
  }

  return { start, end, walls };
}
