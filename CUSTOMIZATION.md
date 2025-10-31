# Customization Guide 🎨

Panduan lengkap untuk mengkustomisasi Christmas Photobooth sesuai kebutuhan Anda.

---

## 🎨 Mengubah Tema Warna

### 1. Ubah Gradient Background

Edit file `app/page.tsx` atau `app/photobooth/page.tsx`:

```tsx
// Default (Merah-Hijau)
className="bg-gradient-to-br from-red-700 via-green-700 to-red-900"

// Alternatif 1: Biru-Putih (Winter Theme)
className="bg-gradient-to-br from-blue-700 via-white to-blue-900"

// Alternatif 2: Ungu-Pink (Modern Theme)
className="bg-gradient-to-br from-purple-700 via-pink-700 to-purple-900"

// Alternatif 3: Hijau Monochrome
className="bg-gradient-to-br from-green-800 via-green-600 to-green-900"
```

### 2. Ubah Warna Tombol

```tsx
// Default (Hijau ke Merah)
className="bg-gradient-to-r from-green-500 to-red-600"

// Alternatif: Emas ke Kuning
className="bg-gradient-to-r from-yellow-500 to-amber-600"

// Alternatif: Biru ke Teal
className="bg-gradient-to-r from-blue-500 to-teal-600"
```

### 3. Ubah Warna Teks

```tsx
// Default
className="text-white"

// Alternatif dengan gradient
className="bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent"
```

---

## ❄️ Kustomisasi Efek Salju

Edit file `components/SnowfallEffect.tsx`:

### 1. Ubah Jumlah Salju

```tsx
// Ubah interval (ms) - Semakin kecil = Semakin banyak salju
const interval = setInterval(createSnowflake, 200); // Default: 200ms

// Lebih banyak salju
const interval = setInterval(createSnowflake, 100); // 100ms

// Lebih sedikit salju
const interval = setInterval(createSnowflake, 500); // 500ms
```

### 2. Ubah Ukuran Salju

```tsx
// Default
snowflake.style.fontSize = Math.random() * 10 + 10 + "px"; // 10-20px

// Salju lebih besar
snowflake.style.fontSize = Math.random() * 20 + 15 + "px"; // 15-35px

// Salju lebih kecil
snowflake.style.fontSize = Math.random() * 5 + 5 + "px"; // 5-10px
```

### 3. Ubah Kecepatan Jatuh

```tsx
// Default
snowflake.style.animationDuration = Math.random() * 3 + 2 + "s"; // 2-5s

// Lebih cepat
snowflake.style.animationDuration = Math.random() * 2 + 1 + "s"; // 1-3s

// Lebih lambat
snowflake.style.animationDuration = Math.random() * 5 + 3 + "s"; // 3-8s
```

### 4. Ubah Karakter Salju

```tsx
// Default
snowflake.innerHTML = "❄";

// Alternatif - Mix berbagai karakter
const snowChars = ["❄", "❅", "❆", "✻", "✼"];
snowflake.innerHTML = snowChars[Math.floor(Math.random() * snowChars.length)];

// Atau gunakan bintang
snowflake.innerHTML = "⭐";

// Atau gunakan bunga
snowflake.innerHTML = "🌸";
```

---

## 🎅 Menambah Filter Baru

### 1. Tambah Filter di Page

Edit `app/photobooth/page.tsx`:

```tsx
const filters = [
  { id: "santa", name: "Santa Hat", emoji: "🎅" },
  { id: "reindeer", name: "Reindeer", emoji: "🦌" },
  { id: "frame", name: "Christmas Frame", emoji: "🎄" },
  { id: "snowman", name: "Snowman", emoji: "⛄" },
  
  // TAMBAHKAN FILTER BARU DI SINI
  { id: "gift", name: "Gift Box", emoji: "🎁" },
  { id: "bell", name: "Christmas Bell", emoji: "🔔" },
  { id: "star", name: "Star", emoji: "⭐" },
  { id: "candy", name: "Candy Cane", emoji: "🍭" },
];
```

### 2. Implementasi Filter di CameraView

Edit `components/CameraView.tsx` di fungsi `drawFilter()`:

```tsx
switch (selectedFilter) {
  case "santa":
    ctx.fillText("🎅", width / 2, height / 6);
    break;
  
  case "reindeer":
    ctx.fillText("🦌", width / 2, height / 6);
    break;
  
  // TAMBAHKAN CASE BARU
  case "gift":
    ctx.fillText("🎁", width / 2, height / 2);
    break;
  
  case "bell":
    // Bell di pojok kanan atas
    ctx.fillText("🔔", width - 100, 100);
    break;
  
  case "star":
    // Star pattern
    ctx.fillText("⭐", width / 4, height / 4);
    ctx.fillText("⭐", (width * 3) / 4, height / 4);
    ctx.fillText("⭐", width / 2, height / 2);
    break;
}
```

---

## 📸 Kustomisasi Kualitas Foto

Edit `components/CameraView.tsx`:

### 1. Ubah Resolusi Kamera

```tsx
// Default (HD)
video: { facingMode: "user", width: 1280, height: 720 }

// Full HD
video: { facingMode: "user", width: 1920, height: 1080 }

// 4K (jika didukung)
video: { facingMode: "user", width: 3840, height: 2160 }

// Lower quality (untuk performa lebih baik)
video: { facingMode: "user", width: 640, height: 480 }
```

### 2. Ubah Format Export

```tsx
// Default (PNG - kualitas terbaik, ukuran besar)
const imageData = canvas.toDataURL("image/png");

// JPEG (kualitas bagus, ukuran lebih kecil)
const imageData = canvas.toDataURL("image/jpeg", 0.9); // 90% quality

// JPEG dengan kompresi lebih tinggi
const imageData = canvas.toDataURL("image/jpeg", 0.7); // 70% quality
```

### 3. Ubah Watermark

```tsx
// Default
ctx.fillText("Merry Christmas 2025 🎄", canvas.width - 20, canvas.height - 20);

// Custom text
ctx.fillText("Your Company Name", canvas.width - 20, canvas.height - 20);

// Multiple lines
ctx.fillText("Merry Christmas!", canvas.width - 20, canvas.height - 50);
ctx.fillText("www.yoursite.com", canvas.width - 20, canvas.height - 20);

// Change style
ctx.font = "bold 30px Poppins"; // Lebih besar
ctx.fillStyle = "rgba(255, 215, 0, 1)"; // Warna emas solid
ctx.shadowColor = "rgba(0, 0, 0, 0.8)"; // Shadow lebih gelap
```

---

## ⏱️ Kustomisasi Countdown

Edit `components/CameraView.tsx`:

### 1. Ubah Durasi Countdown

```tsx
// Default (3 detik)
setCountdown(3);

// Countdown 5 detik
setCountdown(5);

// Tanpa countdown (langsung ambil foto)
setCountdown(0);
takePhoto(); // Panggil langsung
```

### 2. Ubah Interval Countdown

```tsx
// Default (1 detik per count)
const timer = setInterval(() => {
  // ...
}, 1000); // 1000ms = 1 detik

// Lebih cepat (0.5 detik)
}, 500);

// Lebih lambat (1.5 detik)
}, 1500);
```

---

## 🎵 Kustomisasi Musik

### 1. Tambahkan Musik

1. Download file musik MP3
2. Simpan di folder `public/music/`
3. Edit `components/MusicPlayer.tsx`:

```tsx
<audio ref={audioRef} loop muted={isMuted}>
  <source src="/music/jingle-bells.mp3" type="audio/mpeg" />
</audio>
```

### 2. Playlist Multiple Songs

```tsx
const [currentSong, setCurrentSong] = useState(0);
const songs = [
  "/music/jingle-bells.mp3",
  "/music/silent-night.mp3",
  "/music/we-wish-you.mp3",
];

// Di audio element
<source src={songs[currentSong]} type="audio/mpeg" />

// Tambah tombol next
<button onClick={() => setCurrentSong((currentSong + 1) % songs.length)}>
  Next Song ⏭️
</button>
```

---

## 🖼️ Menggunakan Gambar Custom untuk Filter

### 1. Tambahkan Gambar

Simpan gambar PNG dengan transparansi di `public/assets/overlays/`

### 2. Update CameraView Component

Edit `components/CameraView.tsx`:

```tsx
// Di bagian preview filter (untuk preview real-time)
{selectedFilter === "custom" && (
  <img 
    src="/assets/overlays/santa-hat.png"
    alt="Santa Hat"
    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 object-contain"
  />
)}

// Di fungsi drawFilter (untuk hasil foto)
case "custom":
  const img = new Image();
  img.src = "/assets/overlays/santa-hat.png";
  img.onload = () => {
    ctx.drawImage(img, x, y, width, height);
  };
  break;
```

---

## 🔤 Mengubah Font

### 1. Tambahkan Font Custom

Edit `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&display=swap');

/* Atau font lain */
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
```

### 2. Update Tailwind Config

Edit `tailwind.config.ts`:

```tsx
fontFamily: {
  christmas: ["Mountains of Christmas", "cursive"],
  pacifico: ["Pacifico", "cursive"],
},
```

### 3. Gunakan Font Baru

```tsx
<h1 className="font-christmas text-5xl">
  Merry Christmas! 🎄
</h1>
```

---

## 🎭 Animasi Custom

### 1. Tambahkan Keyframe Baru

Edit `tailwind.config.ts`:

```tsx
keyframes: {
  // Bounce effect
  bounce: {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-25px)" },
  },
  
  // Rotate effect
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  
  // Pulse effect
  pulse: {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.5" },
  },
}

animation: {
  bounce: "bounce 1s ease-in-out infinite",
  spin: "spin 3s linear infinite",
  pulse: "pulse 2s ease-in-out infinite",
}
```

### 2. Gunakan Animasi

```tsx
<div className="animate-bounce">🎁</div>
<div className="animate-spin">⭐</div>
<div className="animate-pulse">🎄</div>
```

---

## 📱 Responsive Design

### Ubah Breakpoint

```tsx
// Default
<div className="text-5xl md:text-7xl">

// Custom breakpoints
<div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
```

### Hide Elements on Mobile

```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">Desktop Only</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">Mobile Only</div>
```

---

## 🎯 Tips & Tricks

1. **Test di Multiple Browsers**: Pastikan test di Chrome, Firefox, Safari
2. **Optimize Images**: Gunakan format WebP untuk gambar yang lebih kecil
3. **Add Loading States**: Tambahkan skeleton atau spinner saat loading
4. **Error Handling**: Tangani edge cases dengan baik
5. **Accessibility**: Tambahkan alt text dan aria labels

---

## 🚀 Advanced Customization

### Add Face Detection

Gunakan library seperti `face-api.js` atau `MediaPipe` untuk detect wajah dan auto-position filters.

### Add Photo Effects

Tambahkan filter Instagram-like dengan library seperti `CamanJS` atau custom canvas filters.

### Add Backend

Simpan foto ke database dengan Next.js API routes + Supabase/Firebase.

### Add Social Share

Integrate dengan Web Share API untuk share ke social media.

---

**Selamat Berkreasi! 🎨✨**
