# Troubleshooting Guide 🔧

Panduan untuk mengatasi masalah umum yang mungkin terjadi.

## 📷 Masalah Kamera

### Camera Not Working

**Problem**: Kamera tidak muncul atau menampilkan error

**Solusi**:
1. Pastikan browser mendukung `getUserMedia` API
2. Pastikan aplikasi berjalan di HTTPS (di production) atau localhost (di development)
3. Cek permission kamera di browser settings
4. Reload halaman dan izinkan akses kamera saat diminta

### Camera Permission Denied

**Problem**: Browser menolak akses kamera

**Solusi**:
1. Buka browser settings
2. Cari "Site Settings" atau "Privacy and Security"
3. Cari "Camera"
4. Pastikan localhost (atau domain Anda) diizinkan
5. Reload halaman

### Camera Shows Black Screen

**Problem**: Kamera aktif tapi layar hitam

**Solusi**:
1. Cek apakah ada aplikasi lain yang menggunakan kamera
2. Tutup aplikasi seperti Zoom, Teams, Skype
3. Restart browser
4. Coba browser lain

## 🎨 Masalah Tampilan

### Snowfall Not Showing

**Problem**: Efek salju tidak muncul

**Solusi**:
1. Cek console browser untuk error
2. Pastikan JavaScript enabled
3. Coba refresh halaman
4. Clear browser cache

### Styling Issues

**Problem**: Tampilan tidak sesuai atau berantakan

**Solusi**:
1. Clear browser cache
2. Pastikan Tailwind CSS ter-load dengan benar
3. Cek console untuk CSS errors
4. Rebuild project: `npm run build`

## 🖼️ Masalah Foto

### Download Not Working

**Problem**: Tombol download tidak berfungsi

**Solusi**:
1. Cek browser support untuk download attribute
2. Cek console untuk JavaScript errors
3. Pastikan popup blocker tidak memblokir download
4. Coba browser lain

### Photo Quality Poor

**Problem**: Kualitas foto hasil rendah

**Solusi**:
1. Edit `components/CameraView.tsx`
2. Tingkatkan resolution di `getUserMedia`:
   ```tsx
   video: { 
     facingMode: "user", 
     width: 1920,  // Tingkatkan dari 1280
     height: 1080  // Tingkatkan dari 720
   }
   ```

### Watermark Not Showing

**Problem**: Watermark tidak muncul di foto

**Solusi**:
1. Cek fungsi `takePhoto()` di `components/CameraView.tsx`
2. Pastikan canvas context tersedia
3. Cek ukuran font dan posisi watermark

## 🎵 Masalah Audio

### Music Not Playing

**Problem**: Musik tidak diputar

**Solusi**:
1. Pastikan file musik ada di folder `/public/music/`
2. Uncomment tag `<source>` di `MusicPlayer.tsx`
3. Pastikan path file benar
4. Cek console untuk audio errors
5. Beberapa browser memblokir autoplay - user harus klik play

## 🚀 Masalah Development

### npm install Failed

**Problem**: Error saat install dependencies

**Solusi**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang
npm install
```

### npm run dev Failed

**Problem**: Server tidak bisa dijalankan

**Solusi**:
1. Pastikan port 3000 tidak digunakan aplikasi lain
2. Atau gunakan port lain: `npm run dev -- -p 3001`
3. Cek `package.json` untuk script yang benar
4. Reinstall dependencies

### Build Failed

**Problem**: Error saat build production

**Solusi**:
```bash
# Clear .next folder
rm -rf .next

# Build ulang
npm run build
```

## 🌐 Masalah Browser

### Not Working in Safari

**Problem**: Aplikasi tidak berfungsi di Safari

**Solusi**:
1. Update Safari ke versi terbaru
2. Enable camera permission di Safari settings
3. Cek console untuk vendor prefix issues

### Not Working in Mobile

**Problem**: Tidak berfungsi di mobile browser

**Solusi**:
1. Pastikan menggunakan HTTPS (di production)
2. Cek camera permission di mobile settings
3. Gunakan Chrome atau Safari mobile (recommended)
4. Cek responsive design

## 📱 Masalah Performance

### App Running Slow

**Problem**: Aplikasi lambat atau lag

**Solusi**:
1. Reduce snowflake count di `SnowfallEffect.tsx`
2. Optimize animation duration
3. Close other tabs/applications
4. Clear browser cache
5. Reduce video resolution

### High Memory Usage

**Problem**: Memory tinggi atau crash

**Solusi**:
1. Pastikan camera stream di-stop saat unmount
2. Clear captured images setelah download
3. Limit snowflake count
4. Optimize canvas operations

## 🔍 Debugging Tips

### Check Console

Selalu cek browser console (F12) untuk error messages.

### Check Network Tab

Pastikan semua assets ter-load dengan benar.

### Test Different Browsers

Test di Chrome, Firefox, Safari, dan Edge.

### Check Device Camera

Pastikan camera hardware berfungsi dengan baik.

## 📞 Masih Ada Masalah?

Jika masalah masih berlanjut:

1. Cek error message di console
2. Baca dokumentasi browser tentang WebRTC/getUserMedia
3. Test di browser/device lain
4. Cek permission settings
5. Reinstall dependencies

---

**Good luck! 🎄✨**
