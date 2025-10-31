# 🎄 Christmas Photobooth

Aplikasi web photobooth bertema Natal yang dibuat dengan Next.js 15, TypeScript, Tailwind CSS, dan Framer Motion.

## ✨ Fitur

- 📸 **Capture Foto Real-time** - Ambil foto langsung dari kamera perangkat
- 🎅 **Filter Natal** - Berbagai pilihan filter bertema Natal (Santa Hat, Reindeer, Christmas Frame, Snowman)
- ❄️ **Efek Salju** - Animasi salju jatuh yang indah
- 🎨 **Desain Modern** - UI yang menarik dengan gradient dan animasi smooth
- 💾 **Download Foto** - Simpan foto dengan watermark "Merry Christmas 2025 🎄"
- 📱 **Responsif** - Berfungsi sempurna di desktop dan mobile
- 🔊 **Music Player** - Tombol untuk mengontrol musik latar (opsional)

## 🚀 Cara Menjalankan

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

3. **Buka Browser**
   ```
   http://localhost:3000
   ```

## 📁 Struktur Proyek

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Halaman utama (home)
│   ├── photobooth/
│   │   └── page.tsx        # Halaman photobooth
│   └── globals.css         # Global styles
├── components/
│   ├── CameraView.tsx      # Komponen kamera & capture
│   ├── SnowfallEffect.tsx  # Efek salju animasi
│   └── MusicPlayer.tsx     # Kontrol musik
└── public/
    └── assets/             # Folder untuk asset tambahan
```

## 🎨 Teknologi

- **Next.js 15** - React framework dengan App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animasi smooth
- **WebRTC API** - Akses kamera perangkat

## 🎯 Cara Menggunakan

1. Klik tombol **"Start Photobooth"** di halaman utama
2. Izinkan akses kamera saat diminta browser
3. Pilih filter Natal yang diinginkan
4. Klik tombol **"📸 Take Photo"** untuk mengambil gambar
5. Foto akan ditampilkan dengan countdown 3 detik
6. Klik **"💾 Download Photo"** untuk menyimpan atau **"🔁 Retake Photo"** untuk mengambil ulang

## 🎵 Menambahkan Musik (Opsional)

Untuk menambahkan musik latar:

1. Tambahkan file musik (format MP3) ke folder `/public/music/`
2. Uncomment baris di `components/MusicPlayer.tsx`:
   ```tsx
   <source src="/music/christmas.mp3" type="audio/mpeg" />
   ```

## 📝 Catatan

- Aplikasi memerlukan izin akses kamera dari browser
- Foto disimpan dengan format PNG
- Watermark otomatis ditambahkan: "Merry Christmas 2025 🎄"

## 🎁 Fitur Tambahan yang Bisa Dikembangkan

- [ ] Lebih banyak filter dan overlay
- [ ] Galeri foto yang telah diambil
- [ ] Share ke social media
- [ ] Template frame yang bisa dikustomisasi
- [ ] Sticker tambahan yang bisa dipindah-pindah
- [ ] Video recording

## 📄 License

Free to use untuk keperluan pribadi dan komersial.

---

**Merry Christmas! 🎄🎅⛄**
