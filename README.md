# 🎄 Christmas Photobooth

Aplikasi web photobooth bertema Natal yang dibuat dengan Next.js 15, TypeScript, Tailwind CSS, dan Framer Motion.

🌐 **Live Demo:** [https://santasnapbooth.com/photobooth](https://santasnapbooth.com/photobooth)

## ✨ Fitur

- 📸 **Capture Foto Real-time** - Ambil foto langsung dari kamera perangkat dengan user gesture compliance
- 🎨 **4 Layout Gaya** - Classic Frame, Polaroid, Collage 2x2, dan Landscape Scene
- 🎅 **30+ Filter Natal** - Accessories, Color Effects, Christmas Vibes, Frames, dan Snow Effects
- ❄️ **Efek Salju Interaktif** - Animasi salju jatuh yang indah
- 🖼️ **Filter Kombinasi** - Mix multiple filters untuk efek unik
- 💾 **Download Foto HD** - Simpan foto dengan watermark "Merry Christmas 2025 🎄"
- 📱 **Fully Responsive** - Optimized untuk desktop, tablet, dan mobile
- 🔒 **Production-Ready** - HTTPS compatible dengan proper permission handling
- 🎯 **User Gesture Compliance** - Camera initialization following browser security best practices

## 🚀 Cara Menjalankan

### Development Mode

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

### Production Build

1. **Build untuk Production**
   ```bash
   npm run build
   ```

2. **Jalankan Production Server**
   ```bash
   npm start
   ```

### Deploy ke Hosting

Untuk deploy ke **Jagoan Hosting (cPanel)**, silakan baca panduan lengkap di:

📖 **[DEPLOYMENT_JAGOAN.md](./DEPLOYMENT_JAGOAN.md)**

## 📁 Struktur Proyek

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Halaman utama (home)
│   ├── photobooth/
│   │   └── page.tsx        # Halaman photobooth utama
│   └── globals.css         # Global styles
├── components/
│   ├── CameraViewFinal.tsx     # Production-ready camera dengan user gesture
│   ├── FilterSelector.tsx      # Selector 30+ filter Natal
│   ├── LayoutPreview.tsx       # Preview 4 layout styles
│   ├── PhotoResult.tsx         # Display & download hasil foto
│   ├── SnowfallEffect.tsx      # Efek salju animasi
│   └── layouts/
│       ├── LayoutClassic.tsx   # Classic frame layout
│       ├── LayoutPolaroid.tsx  # Polaroid style layout
│       ├── LayoutCollage.tsx   # Collage 2x2 layout
│       └── LayoutLandscape.tsx # Landscape scene layout
├── lib/
│   └── filterUtils.ts      # Filter processing utilities
├── public/
│   ├── assets/
│   │   └── overlays/       # Filter overlay images
│   └── music/              # Background music files
└── server.js               # Custom server untuk cPanel deployment
```

## 🎨 Teknologi

- **Next.js 15.5.6** - React framework dengan App Router dan standalone output
- **TypeScript** - Type safety dan better DX
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11** - Animasi smooth dan gesture handling
- **WebRTC API** - getUserMedia untuk akses kamera dengan proper permission handling
- **Canvas API** - Real-time filter processing dan image manipulation

## 🎯 Cara Menggunakan

1. Buka [santasnapbooth.com/photobooth](https://santasnapbooth.com/photobooth)
2. Pilih **Photo Layout Style** (Classic, Polaroid, Collage 2x2, atau Landscape)
3. Klik **"Show Filters & Effects"** untuk memilih filter
4. Klik **"🎥 Enable Camera"** - izinkan akses kamera saat browser meminta
5. Mix & match multiple filters untuk efek kreatif
6. Klik **"📸 Capture Photo"** (atau "Capture 4 Photos" untuk Collage)
7. Download hasil foto atau retake untuk mengambil ulang

## 🔒 Browser Permission & Security

Aplikasi ini mengikuti **browser security best practices**:

- ✅ **User Gesture Required** - Camera hanya bisa diaktifkan dari button click (user interaction)
- ✅ **HTTPS Only** - getUserMedia memerlukan secure context (HTTPS)
- ✅ **Permission Monitoring** - Real-time tracking camera permission state
- ✅ **Comprehensive Error Handling** - Clear error messages untuk setiap permission scenario
- ✅ **Progressive Enhancement** - Graceful fallback jika camera tidak tersedia

### Troubleshooting Camera Issues

**Camera tidak muncul?**
1. Pastikan HTTPS aktif (check URL bar 🔒)
2. Klik "Enable Camera" button (jangan auto-init)
3. Klik "Allow" saat browser meminta permission
4. Check Console (F12) untuk debug logs
5. Refresh page jika permission denied

**Production vs Local Behavior:**
- Local (HTTP): Browser lebih permisif dengan auto-init
- Production (HTTPS): Browser strict - butuh explicit user gesture

Lihat [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) untuk detail lengkap.

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

- [x] Multiple layout styles (Classic, Polaroid, Collage, Landscape)
- [x] 30+ filters dengan kombinasi
- [x] Real-time preview dengan canvas rendering
- [x] Production-ready camera handling
- [x] User gesture compliance
- [ ] Galeri foto yang telah diambil (localStorage)
- [ ] Share langsung ke social media
- [ ] QR code untuk download foto
- [ ] Template frame custom upload
- [ ] Sticker drag-and-drop
- [ ] Video recording mode
- [ ] Face detection untuk auto-positioning filters

## 🐛 Known Issues & Solutions

### Camera Permission Denied
- **Cause:** User clicked "Block" atau browser cache permission
- **Solution:** Clear site settings di browser, refresh, klik "Allow"

### Video Element Ref Null
- **Cause:** React ref timing issue
- **Solution:** Two-phase initialization (request stream → render video → attach stream)

### Black Screen Despite Permission Granted
- **Cause:** Video element not loaded or getUserMedia called without user gesture
- **Solution:** Ensure camera init from button click, wait for video metadata

Lihat [API_DOCS.md](./API_DOCS.md) dan [IMPLEMENTATION_EXAMPLES.tsx](./IMPLEMENTATION_EXAMPLES.tsx) untuk detail teknis.

## 📚 Dokumentasi Lengkap

- 📖 [QUICK_START.md](./QUICK_START.md) - Panduan cepat memulai
- 🚀 [DEPLOYMENT_JAGOAN.md](./DEPLOYMENT_JAGOAN.md) - Deploy ke Jagoan Hosting (cPanel)
- 🎨 [FILTERS_LAYOUTS_GUIDE.md](./FILTERS_LAYOUTS_GUIDE.md) - Panduan filter dan layout
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - Arsitektur aplikasi
- 🔧 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Problem solving guide
- 📐 [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) - Visual design guide

## 🤝 Contributing

Pull requests welcome! Untuk perubahan besar, silakan buka issue terlebih dahulu untuk diskusi.

## 📄 License

MIT License - Free to use untuk keperluan pribadi dan komersial.

---

**Merry Christmas! 🎄🎅⛄**

Made with ❤️ using Next.js 15 | [GitHub](https://github.com/AldyLoing/Christmas-Photobooth) | [Live Demo](https://santasnapbooth.com/photobooth)
