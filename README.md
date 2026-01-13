<div align="center">

# 🎄 SantaSnap Photobooth

### The Modern Web-Based Christmas Photo Experience

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://santasnapbooth.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Transform moments into magical Christmas memories with professional photo layouts, festive filters, and instant downloads.**

[Live Demo](https://santasnapbooth.com/) • [Report Bug](https://github.com/AldyLoing/Christmas-Photobooth/issues) • [Request Feature](https://github.com/AldyLoing/Christmas-Photobooth/issues)

</div>

---

## 📖 Project Overview

**SantaSnap Photobooth** is a production-ready, browser-based Christmas photobooth application that brings the magic of the holidays to any device. Built with cutting-edge web technologies, it enables users to capture, style, and share festive photos instantly—no installation, no hardware, just pure holiday joy.

Perfect for:
- 🎉 Holiday events and corporate parties
- 🏪 Retail experiences and pop-up shops
- 🎅 Virtual Santa meet-and-greets
- 💼 Marketing campaigns and brand activations
- 👨‍👩‍👧‍👦 Family gatherings and remote celebrations

---

## 🎯 The Problem

Traditional photo booths are:
- **Expensive** – Hardware costs $2,000-$10,000+
- **Limited** – Fixed location, requires setup crew
- **Inaccessible** – Not available for remote/virtual events
- **Slow** – Physical printing delays, manual sharing

Modern users expect:
✅ Instant access from any device  
✅ Professional quality without professional equipment  
✅ Immediate digital sharing capabilities  
✅ Zero friction from idea to captured memory  

---

## ✨ The Solution

SantaSnap delivers enterprise-grade photobooth capabilities through a secure, browser-based platform:

| Traditional Booth | SantaSnap |
|-------------------|-----------|
| $5K+ hardware | Free, browser-based |
| On-site only | Works anywhere with internet |
| Hired attendants | Self-service |
| Print & scan to share | Instant digital download |
| Fixed filters | 30+ dynamic Christmas filters |
| 1-2 layouts | 4 professional layouts |

**Key Differentiators:**
- **Zero Installation** – Works instantly in any modern browser
- **Enterprise Security** – HTTPS-only, user gesture compliance
- **Production-Grade** – Built with Next.js 15, TypeScript, and professional architecture
- **Mobile-First** – Responsive design optimized for all devices

---

## 🏗️ How It Works

```
User Opens Browser
      ↓
[ Home Page ] → Click "Start Photobooth"
      ↓
[ Permission Request ] → User grants camera access
      ↓
[ Live Camera Preview ] ← Real-time filter application
      ↓
Select Layout + Filters → Live canvas rendering
      ↓
[ 3-2-1 Countdown ] → Capture moment
      ↓
[ Photo Result ] → Automatic watermark & processing
      ↓
Download HD Image → Instant sharing
```

**Technical Flow:**
1. **Secure Camera Access** – Browser `getUserMedia()` API with permission handling
2. **Real-Time Rendering** – HTML5 Canvas with filter layering
3. **Layout Processing** – Dynamic composition based on selected template
4. **Export Pipeline** – High-resolution PNG generation with watermarking

---

## 🚀 Key Features

### 📸 Camera & Capture
- **Real-time Preview** with live filter application
- **User Gesture Compliance** following browser security best practices
- **Multi-device Support** – Desktop webcams, mobile cameras, tablets
- **3-Second Countdown** with visual feedback

### 🎨 Creative Tools
- **30+ Christmas Filters** across 5 categories:
  - 🎅 **Accessories** – Santa hats, reindeer antlers, elf ears
  - 🌈 **Color Effects** – Warm glow, cool winter, sepia vintage
  - ✨ **Christmas Vibes** – Snow overlay, bokeh lights, sparkles
  - 🖼️ **Frames** – Gold ornaments, candy canes, holly borders
  - ❄️ **Snow Effects** – Gentle flurries, blizzard, frost

- **4 Professional Layouts**:
  - **Classic Frame** – Single photo with elegant border
  - **Polaroid Style** – Vintage instant camera aesthetic
  - **Collage 2x2** – Four photos in grid layout
  - **Landscape Scene** – Wide-angle Christmas background

### 💾 Export & Sharing
- **HD Downloads** – Full-resolution PNG exports
- **Automatic Watermarking** – "Merry Christmas 2025 🎄" branding
- **Instant Preview** – See results before download
- **One-Click Share** – Download and distribute immediately

### 🎄 User Experience
- **Snowfall Animation** – Interactive falling snow effect
- **Background Music** – Optional festive soundtrack (with controls)
- **Fully Responsive** – Optimized for mobile, tablet, desktop
- **Fast Loading** – Optimized assets and code splitting

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | Server-side rendering, routing, optimization |
| **Language** | TypeScript 5.6 | Type safety and developer experience |
| **UI Library** | React 19 | Component-based architecture |
| **Styling** | Tailwind CSS 3.4 | Utility-first responsive design |
| **Animation** | Framer Motion 11 | Smooth transitions and effects |
| **Canvas Processing** | HTML5 Canvas API | Real-time image manipulation |
| **Media Handling** | getUserMedia API | Secure camera access |
| **Build Tool** | Turbopack | Fast development and production builds |
| **Deployment** | Custom Node.js server | Production hosting |

### Why This Stack?
- **Next.js 15**: Latest features, excellent SEO, optimized performance
- **TypeScript**: Catches bugs before runtime, better IDE support
- **Tailwind CSS**: Rapid UI development, consistent design system
- **Framer Motion**: Professional animations without complexity

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- Modern browser (Chrome, Firefox, Safari, Edge)
- HTTPS environment for camera access (localhost works too)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/AldyLoing/Christmas-Photobooth.git
cd Christmas-Photobooth

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start

# Server runs on port specified in server.js (default: 3000)
```

### Environment Configuration

Create a `.env.local` file in the project root:

```env
# Application Settings
NEXT_PUBLIC_APP_NAME=SantaSnap Photobooth
NEXT_PUBLIC_APP_URL=https://santasnapbooth.com

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_MUSIC=true
NEXT_PUBLIC_ENABLE_SNOW=true

# Analytics (if using)
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

> **⚠️ Security Note:** Never commit actual API keys or secrets to Git. Use `.env.local` for sensitive data and ensure it's in `.gitignore`.

---

## 💡 Usage & Examples

### Basic Usage

1. **Open the Application**
   ```
   Navigate to: https://santasnapbooth.com/
   ```

2. **Start Photobooth**
   - Click the "Start Photobooth" button
   - Grant camera permission when prompted

3. **Select Your Style**
   - Choose a layout (Classic, Polaroid, Collage, Landscape)
   - Apply filters (mix and match multiple filters)
   - Preview in real-time

4. **Capture the Moment**
   - Click "Take Photo" button
   - Wait for 3-2-1 countdown
   - Smile! 📸

5. **Download & Share**
   - Review your photo
   - Click "Download" for HD PNG file
   - Share on social media or print

### Advanced Customization

**Adding Custom Filters:**
```typescript
// lib/filterUtils.ts
export const customFilter = (ctx: CanvasRenderingContext2D) => {
  ctx.filter = 'sepia(0.5) saturate(1.5)';
  // Your custom filter logic
};
```

**Creating New Layouts:**
```typescript
// components/layouts/LayoutCustom.tsx
export default function LayoutCustom({ imageData }) {
  // Your layout composition logic
  return (
    <div className="custom-layout">
      {/* Layout structure */}
    </div>
  );
}
```

---

## 🎯 Use Cases

### 🏢 Enterprise & Events
- **Corporate Holiday Parties** – Branded watermarks for company events
- **Trade Shows** – Attract booth visitors with interactive experiences
- **Product Launches** – Create shareable moments around new products

### 🛍️ Retail & Marketing
- **Shopping Malls** – Drive foot traffic with photo activations
- **Brand Campaigns** – User-generated content at scale
- **Pop-up Experiences** – Temporary installations without equipment costs

### 👨‍👩‍👧 Personal & Social
- **Family Gatherings** – Create lasting holiday memories
- **Virtual Parties** – Connect remote participants with shared photo moments
- **Social Media Content** – Generate engaging Christmas posts

### 🎓 Education & Nonprofit
- **School Events** – Fundraisers and holiday celebrations
- **Community Programs** – Free public photo experiences
- **Charity Drives** – Increase engagement at donation events

---

## 🗺️ Roadmap

### ✅ Completed (v1.0)
- [x] Core camera functionality with security compliance
- [x] 30+ Christmas filters across 5 categories
- [x] 4 professional photo layouts
- [x] HD export with watermarking
- [x] Responsive mobile-first design
- [x] Production deployment

### 🚧 In Progress (v1.1)
- [ ] Custom watermark text/logo upload
- [ ] Photo gallery and session history
- [ ] Social media direct sharing (Facebook, Instagram, Twitter)
- [ ] QR code generation for easy download

### 🔮 Future (v2.0+)
- [ ] Video recording with filters
- [ ] AI-powered background removal
- [ ] Animated GIF creation
- [ ] Multi-language support (English, Spanish, French, German)
- [ ] Admin dashboard for event organizers
- [ ] Email delivery of photos
- [ ] Cloud storage integration (Dropbox, Google Drive)
- [ ] Printable templates (4x6, 5x7 formats)

**Community Requests Welcome!** [Submit feature ideas →](https://github.com/AldyLoing/Christmas-Photobooth/issues)

---

## 🌍 Impact

### Social Impact
- **Democratizes Professional Photography** – No expensive equipment needed
- **Connects Remote Communities** – Virtual participation in celebrations
- **Accessibility** – Works on devices people already own

### Environmental Impact
- **Zero Physical Waste** – No printed photos, film, or chemical processing
- **No Hardware Production** – Eliminates manufacturing of specialized equipment
- **Lower Carbon Footprint** – Digital-only, no shipping or transportation

### Economic Impact
- **Reduces Event Costs** – Eliminates $500-2000+ photobooth rental fees
- **Empowers Small Businesses** – Affordable marketing tool
- **Creates Opportunities** – Open-source foundation for entrepreneurs

---

## 🎯 Target Market

### Primary Users
| Segment | Use Case | Market Size |
|---------|----------|-------------|
| **Event Planners** | Corporate parties, weddings, conferences | $5B+ industry |
| **Retail Businesses** | In-store activations, customer engagement | 3.8M businesses (US) |
| **Marketing Agencies** | Brand activations, campaigns | $155B industry |

### Secondary Users
- Schools and educational institutions
- Nonprofits and community organizations  
- Individual families and social groups
- Content creators and influencers

### Geographic Opportunity
- **Primary:** North America, Europe (high event spending)
- **Growth:** Asia-Pacific, Latin America (mobile-first markets)
- **Advantage:** Web-based = global accessibility

---

## 💭 Why This Matters

### The Bigger Picture
Holiday traditions are evolving. As the world becomes more digital and distributed, we need tools that preserve human connection while embracing modern technology.

**SantaSnap addresses:**
1. **Inclusivity** – Everyone deserves professional photo experiences, regardless of budget
2. **Sustainability** – Digital-first approach reduces waste
3. **Innovation** – Demonstrates what's possible with modern web standards
4. **Community** – Open-source foundation invites collaboration

> "Technology should enhance human moments, not replace them. SantaSnap creates space for joy, creativity, and connection during the most wonderful time of the year."

---

## 🎯 Vision & Mission

### Vision
**To become the world's most-used virtual photobooth platform**, making professional photo experiences accessible to everyone, everywhere.

### Mission
Empower individuals, businesses, and communities to create and share meaningful visual memories through innovative, sustainable, and accessible web technology.

### Core Values
- **Accessibility** – Easy to use, works for everyone
- **Quality** – Professional results without compromise
- **Innovation** – Pushing boundaries of web capabilities
- **Community** – Open-source, collaborative development
- **Sustainability** – Digital-first, environmentally conscious

---

## 🤝 Contributing

We welcome contributions from developers, designers, and holiday enthusiasts!

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/AldyLoing/Christmas-Photobooth.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Test thoroughly on multiple devices

4. **Commit with Clear Messages**
   ```bash
   git commit -m "feat: Add custom watermark upload feature"
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-amazing-feature
   ```

### Contribution Ideas
- 🎨 New filter effects and layouts
- 🌐 Translation to other languages
- 🐛 Bug fixes and performance improvements
- 📖 Documentation enhancements
- ♿ Accessibility improvements

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Focus on collaboration over competition
- Celebrate diverse perspectives

---

## 🔐 Security & API Key Management

### ⚠️ IMPORTANT SECURITY NOTICE

This project previously experienced an API key leak. We've implemented strict security measures to prevent this in the future.

### Best Practices

**1. Never Commit Secrets**
```bash
# ❌ NEVER DO THIS
const API_KEY = "sk-1234567890abcdef"

# ✅ DO THIS INSTEAD
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
```

**2. Use Environment Variables**

Create `.env.local` (automatically git-ignored):
```env
# .env.local
NEXT_PUBLIC_API_KEY=your-actual-key-here
MY_SECRET_TOKEN=super-secret-value
```

**3. Provide Example File**

Create `.env.example` for documentation:
```env
# .env.example
NEXT_PUBLIC_API_KEY=your_api_key_here
MY_SECRET_TOKEN=your_token_here
```

**4. Ensure .gitignore Coverage**
```gitignore
# .gitignore
.env
.env.local
.env*.local
**/.env
```

### If You Accidentally Commit a Secret

**Immediate Actions:**
1. **Rotate/Revoke the Key** immediately via your API provider
2. **Remove from Git History**:
   ```bash
   # Use BFG Repo Cleaner or git-filter-repo
   git filter-repo --invert-paths --path .env.local
   ```
3. **Force Push** (⚠️ coordinate with team first):
   ```bash
   git push origin --force --all
   ```
4. **Notify Your Team** and review access logs

**Prevention:**
- Use pre-commit hooks ([git-secrets](https://github.com/awslabs/git-secrets))
- Enable GitHub secret scanning
- Regular security audits

### Current Security Status
✅ All secrets moved to environment variables  
✅ `.gitignore` properly configured  
✅ Example environment file provided  
✅ Documentation updated with security practices  

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Aldy Loing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

**What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed  
- ✅ Distribution allowed
- ✅ Private use allowed
- ℹ️ License and copyright notice required

---

## 📞 Contact & Support

### Creator
**Aldy Loing**  
Full-Stack Developer & Open Source Enthusiast

- 📧 Email: [loingaldy@gmail.com](mailto:loingaldy@gmail.com)
- 📱 WhatsApp: [+62 822-9349-4989](https://wa.me/6282293494989)
- 📸 Instagram: [@aldy_loing](https://instagram.com/aldy_loing)
- 🐙 GitHub: [@AldyLoing](https://github.com/AldyLoing)

### Support Channels
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/AldyLoing/Christmas-Photobooth/issues)
- 💡 **Feature Requests:** [GitHub Discussions](https://github.com/AldyLoing/Christmas-Photobooth/discussions)
- 📖 **Documentation:** [Project Wiki](https://github.com/AldyLoing/Christmas-Photobooth/wiki)

### Live Demo
🌐 **[https://santasnapbooth.com/](https://santasnapbooth.com/)**

---

## 🙏 Acknowledgments

Built with ❤️ using:
- [Next.js](https://nextjs.org/) – The React Framework for the Web
- [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) – Production-ready animation library
- [Vercel](https://vercel.com/) – Inspiration for clean documentation

Special thanks to the open-source community for making projects like this possible.

---

<div align="center">

**⭐ Star this project if you found it helpful!**

Made with 🎄 by [Aldy Loing](https://github.com/AldyLoing)

[⬆ Back to Top](#-santasnap-photobooth)

</div>

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
