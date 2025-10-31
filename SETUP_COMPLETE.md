# Christmas Photobooth - Setup Complete! 🎄

Proyek Christmas Photobooth telah berhasil dibuat dan sedang berjalan!

## 📍 Akses Aplikasi

Buka browser dan kunjungi:
**http://localhost:3000**

## 🎯 Fitur yang Tersedia

### Halaman Home (/)
- Desain bertema Natal dengan gradient merah-hijau
- Animasi salju jatuh
- Tombol "Start Photobooth"
- Fitur cards yang menjelaskan kemampuan aplikasi
- Music player dengan kontrol mute/unmute

### Halaman Photobooth (/photobooth)
- Akses kamera real-time
- 4 pilihan filter:
  - 🎅 Santa Hat
  - 🦌 Reindeer
  - 🎄 Christmas Frame
  - ⛄ Snowman
- Countdown 3 detik sebelum foto diambil
- Preview filter real-time
- Watermark otomatis "Merry Christmas 2025 🎄"
- Tombol Download & Retake

## 🛠️ Teknologi

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- WebRTC (getUserMedia API)

## 📱 Responsif

Aplikasi ini responsif dan dapat digunakan di:
- Desktop
- Tablet
- Mobile (dengan kamera)

## 🎨 Kustomisasi

### Menambah Filter Baru
Edit file `app/photobooth/page.tsx` dan tambahkan filter di array `filters`.

### Mengubah Warna Tema
Edit file `tailwind.config.ts` untuk mengubah warna tema.

### Menambah Musik
1. Tambahkan file musik ke folder `/public/music/`
2. Uncomment baris di `components/MusicPlayer.tsx`
3. Update src dengan path file musik Anda

## 🚀 Development

```bash
npm run dev    # Jalankan development server
npm run build  # Build untuk production
npm start      # Jalankan production server
```

## 🎄 Selamat Mencoba!

Nikmati aplikasi Christmas Photobooth Anda dan sebarkan semangat Natal! 🎅✨
