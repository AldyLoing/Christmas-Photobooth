# Deployment Guide - Christmas Photobooth 🎄

Panduan untuk mendeploy aplikasi Christmas Photobooth ke berbagai platform.

## 🚀 Deploy ke Vercel (Recommended)

Vercel adalah platform hosting terbaik untuk Next.js karena dibuat oleh tim yang sama.

### Langkah-langkah:

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Christmas Photobooth"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik "New Project"
   - Import repository Anda
   - Klik "Deploy"

3. **Selesai!**
   - Aplikasi akan otomatis di-deploy
   - Anda akan mendapat URL gratis seperti `your-app.vercel.app`

## 📦 Deploy ke Netlify

### Langkah-langkah:

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy**
   - Kunjungi [netlify.com](https://netlify.com)
   - Connect ke Git repository
   - Deploy

## 🐳 Deploy dengan Docker

### Membuat Dockerfile:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### Build & Run:

```bash
docker build -t christmas-photobooth .
docker run -p 3000:3000 christmas-photobooth
```

## ☁️ Deploy ke Cloud Services

### AWS (Amazon Web Services)
- Gunakan AWS Amplify untuk deploy otomatis dari Git
- Atau gunakan EC2 dengan PM2

### Google Cloud Platform
- Deploy menggunakan Cloud Run
- Atau gunakan App Engine

### Azure
- Deploy menggunakan Azure Static Web Apps
- Atau Azure App Service

## 🔧 Environment Variables

Jika Anda menambahkan fitur yang memerlukan environment variables:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-api.com
```

## 📝 Catatan Penting

1. **Camera Permission**: Pastikan aplikasi di-deploy dengan HTTPS untuk camera access
2. **Browser Support**: Aplikasi memerlukan browser modern dengan support WebRTC
3. **Mobile**: Pastikan camera permission diizinkan di mobile browser

## 🎯 Production Checklist

- [ ] Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- [ ] Test di mobile devices
- [ ] Test camera permission
- [ ] Test download functionality
- [ ] Optimize images (jika ada)
- [ ] Enable compression
- [ ] Setup analytics (opsional)
- [ ] Setup error monitoring (opsional)

## 📊 Performance Tips

1. **Image Optimization**: Gunakan Next.js Image component untuk gambar
2. **Code Splitting**: Next.js sudah handle ini secara otomatis
3. **Caching**: Vercel/Netlify handle ini secara otomatis
4. **CDN**: Gunakan CDN untuk static assets

## 🔒 Security

1. Pastikan aplikasi di-deploy dengan HTTPS
2. Tidak perlu backend API (semua berjalan di client-side)
3. Tidak ada data yang disimpan di server

---

**Happy Deploying! 🎅🎄**
