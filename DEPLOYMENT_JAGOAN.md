# 🚀 Deployment ke Jagoan Hosting (cPanel)

Panduan lengkap deploy Christmas Photobooth ke Jagoan Hosting dengan cPanel.

## 📋 Persyaratan

- ✅ Project Next.js sudah siap deploy
- ✅ Sudah melakukan testing di localhost
- ✅ Paket hosting yang memiliki akses Terminal
- ✅ Node.js version minimal 18.17 atau lebih tinggi

## 🔧 Persiapan Sebelum Upload

### Langkah 1: Pastikan Project Berjalan di Localhost

Jalankan development server untuk memastikan semua berfungsi:

```bash
npm run dev
```

Buka browser dan akses `http://localhost:3000`

### Langkah 2: Build Project untuk Production

Jalankan command berikut untuk membuat production build:

```bash
npm run build
```

✅ **Build sudah berhasil!** File `server.js` dan `package.json` sudah dikonfigurasi dengan benar.

### Langkah 3: Compress Project ke Format ZIP

**PENTING:** Compress **SEMUA** file kecuali folder `node_modules`

**File yang harus di-compress:**
- ✅ `app/` folder
- ✅ `components/` folder
- ✅ `lib/` folder
- ✅ `public/` folder
- ✅ `.next/` folder (hasil build)
- ✅ `package.json`
- ✅ `server.js`
- ✅ `next.config.ts`
- ✅ `tsconfig.json`
- ✅ `tailwind.config.ts`
- ✅ `postcss.config.mjs`
- ✅ File README dan dokumentasi lainnya (opsional)

**File yang TIDAK perlu:**
- ❌ `node_modules/` folder (akan diinstall di server)
- ❌ `.git/` folder
- ❌ `.env.local` (jika ada, upload manual nanti)

**Cara compress di Windows:**
1. Pilih semua file yang diperlukan
2. Klik kanan → Send to → Compressed (zipped) folder
3. Beri nama: `christmas-photobooth.zip`

## 📤 Upload ke cPanel

### Langkah 4: Setup Node.js App di cPanel

1. Login ke cPanel Jagoan Hosting
2. Cari menu **"Setup Node.js App"**
3. Klik **"Create Application"**
4. Isi form dengan data:
   - **Node.js version**: 18.17 atau lebih tinggi
   - **Application mode**: Production
   - **Application root**: `christmas-photobooth` (atau nama folder yang Anda inginkan)
   - **Application URL**: pilih domain/subdomain Anda
   - **Application startup file**: `server.js`
   - **Port**: akan otomatis di-generate (biasanya 8080)
5. Klik **"Create"**

### Langkah 5: Upload File ZIP

1. Buka **File Manager** di cPanel
2. Navigasi ke folder aplikasi yang telah dibuat (misal: `christmas-photobooth`)
3. Klik **"Upload"**
4. Upload file `christmas-photobooth.zip`
5. Setelah upload selesai, klik kanan file ZIP → **"Extract"**
6. Hapus file ZIP setelah extract selesai

### Langkah 6: Install Dependencies

1. Kembali ke menu **"Setup Node.js App"**
2. Klik pada aplikasi Anda
3. Copy **"Enter to the virtual environment"** command
   - Contoh: `source /home/santasna/nodevenv/SantaSnapBooth/18/bin/activate && cd /home/santasna/SantaSnapBooth`
4. Buka **"Terminal"** di cPanel
5. Paste command tersebut dan tekan Enter
6. **PENTING: Cek apakah folder `.next` ada:**
```bash
ls -la | grep .next
```
   - Jika **TIDAK ADA**, berarti Anda belum upload hasil build! Kembali ke localhost, jalankan `npm run build`, dan compress ulang dengan menyertakan folder `.next`

7. Jalankan command install dependencies:

```bash
npm install --include=dev
```

⏱️ Tunggu hingga proses install selesai (bisa memakan waktu beberapa menit)

**PENTING:** Jangan gunakan `npm install --production` karena akan skip devDependencies seperti TypeScript yang dibutuhkan untuk membaca `next.config.ts`!

### Langkah 7: Restart Aplikasi

1. Kembali ke menu **"Setup Node.js App"**
2. Klik tombol **"Restart"** pada aplikasi Anda
3. Tunggu hingga status menjadi "Running"

### Langkah 8: Testing

Buka URL website Anda di browser. Jika muncul halaman Christmas Photobooth seperti di localhost, berarti deployment **BERHASIL!** 🎉

## 🔍 Troubleshooting

### Error: "Application failed to start" atau "503 Service Unavailable"

**Penyebab Umum:**
- Aplikasi Node.js belum running
- Dependencies belum terinstall
- Build belum dilakukan atau folder `.next` tidak ter-upload

**Solusi:**
1. Cek status aplikasi di menu "Setup Node.js App" - pastikan status "Running"

2. Cek log error di cPanel Terminal:
```bash
cd /home/username/christmas-photobooth
cat logs/error.log
```

3. Pastikan dependencies sudah terinstall:
```bash
# Masuk virtual environment
source /home/username/nodevenv/christmas-photobooth/18/bin/activate && cd /home/username/christmas-photobooth

# Install dependencies
npm install --production
```

4. Pastikan folder `.next` ter-upload (hasil dari `npm run build`)

5. Restart aplikasi di menu "Setup Node.js App"

### Error: "Cannot find module"

**Solusi:**
```bash
# Masuk ke virtual environment dulu
source /home/username/nodevenv/christmas-photobooth/18/bin/activate && cd /home/username/christmas-photobooth

# Install ulang dependencies
rm -rf node_modules
npm install --production
```

### Kamera tidak berfungsi

**Penyebab:** Browser memerlukan HTTPS untuk akses kamera

**Solusi:**
1. Aktifkan SSL Certificate di cPanel (Let's Encrypt gratis)
2. Akses website menggunakan `https://` bukan `http://`

### Performa lambat

**Solusi:**
1. Pastikan sudah build dengan `npm run build` sebelum upload
2. Gunakan paket hosting dengan RAM minimal 1GB
3. Pastikan folder `.next` ter-upload dengan lengkap

## 📝 Update Aplikasi

Jika ada perubahan code dan ingin update:

1. **Di localhost:**
```bash
npm run build
```

2. **Compress ulang** file yang berubah (atau semua file kecuali `node_modules`)

3. **Upload ke cPanel** dan extract (timpa file lama)

4. **Restart aplikasi** di menu "Setup Node.js App"

## 🎯 Checklist Deployment

- [ ] Build berhasil di localhost (`npm run build`)
- [ ] Compress file ZIP tanpa `node_modules`
- [ ] Setup Node.js App di cPanel
- [ ] Upload dan extract ZIP
- [ ] Copy virtual environment path
- [ ] Install dependencies via Terminal (`npm install --production`)
- [ ] Restart aplikasi
- [ ] SSL aktif untuk akses kamera
- [ ] Testing fitur kamera dan download

## 📞 Support

Jika mengalami kendala, hubungi support Jagoan Hosting dengan menyertakan:
- Screenshot error
- Isi file log (`logs/error.log`)
- Versi Node.js yang digunakan

---

**Happy Deploying! 🎄🎅⛄**
