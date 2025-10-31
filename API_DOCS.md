# API & Component Documentation 📚

Dokumentasi lengkap untuk komponen dan fungsi dalam aplikasi.

## 📁 Struktur Komponen

### 1. SnowfallEffect Component

**File**: `components/SnowfallEffect.tsx`

**Deskripsi**: Membuat efek salju jatuh secara animasi di seluruh layar.

**Props**: Tidak ada

**State**:
- Menggunakan `useEffect` untuk membuat snowflakes secara interval

**Customization**:
```tsx
// Ubah interval pembuatan salju (ms)
const interval = setInterval(createSnowflake, 200); // Default: 200ms

// Ubah lifetime salju (ms)
setTimeout(() => snowflake.remove(); }, 5000); // Default: 5000ms

// Ubah ukuran salju
snowflake.style.fontSize = Math.random() * 10 + 10 + "px"; // 10-20px
```

---

### 2. MusicPlayer Component

**File**: `components/MusicPlayer.tsx`

**Deskripsi**: Tombol kontrol untuk musik latar bertema Natal.

**Props**: Tidak ada

**State**:
- `isPlaying`: Boolean untuk status musik
- `isMuted`: Boolean untuk status mute

**Methods**:
- `togglePlay()`: Memutar/menjeda musik
- `toggleMute()`: Mute/unmute musik

**Cara Aktifkan Musik**:
```tsx
// Uncomment di MusicPlayer.tsx
<source src="/music/christmas.mp3" type="audio/mpeg" />
```

---

### 3. CameraView Component

**File**: `components/CameraView.tsx`

**Deskripsi**: Komponen utama untuk mengakses kamera, menampilkan preview, dan mengambil foto.

**Props**:
```tsx
interface CameraViewProps {
  selectedFilter: string;        // ID filter yang dipilih
  onCapture: (imageData: string) => void; // Callback saat foto diambil
}
```

**State**:
- `stream`: MediaStream dari kamera
- `hasPermission`: Status izin kamera (null | boolean)
- `countdown`: Counter untuk countdown (0-3)

**Methods**:

#### `startCamera()`
Meminta akses kamera dan memulai stream.

```tsx
const mediaStream = await navigator.mediaDevices.getUserMedia({
  video: { 
    facingMode: "user",  // "user" = front camera, "environment" = back camera
    width: 1280,         // Lebar video
    height: 720          // Tinggi video
  },
  audio: false
});
```

#### `capturePhoto()`
Memulai countdown 3 detik sebelum mengambil foto.

#### `takePhoto()`
Mengambil foto dari video stream, menerapkan filter, dan mengembalikan image data.

**Canvas Operations**:
```tsx
// Draw video ke canvas
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// Tambahkan filter overlay
drawFilter(ctx, canvas.width, canvas.height);

// Tambahkan watermark
ctx.fillText("Merry Christmas 2025 🎄", x, y);

// Export ke PNG
const imageData = canvas.toDataURL("image/png");
```

#### `drawFilter()`
Menggambar emoji filter di canvas berdasarkan `selectedFilter`.

**Filter Options**:
- `santa`: Emoji 🎅 di atas
- `reindeer`: Emoji 🦌 di atas
- `snowman`: Emoji ⛄ di bawah
- `frame`: Border emas dengan dekorasi pojok

**Customization**:

```tsx
// Ubah ukuran emoji
ctx.font = `${width / 6}px Arial`; // Default: 1/6 dari lebar

// Ubah posisi filter
ctx.fillText("🎅", width / 2, height / 6); // X: center, Y: 1/6 dari atas

// Tambah filter baru
case "custom":
  ctx.fillText("🎁", width / 2, height / 2);
  break;
```

---

## 🎨 Halaman (Pages)

### 1. Home Page

**File**: `app/page.tsx`

**Komponen yang Digunakan**:
- `SnowfallEffect`
- `MusicPlayer`

**Animasi** (Framer Motion):
```tsx
// Fade in dari atas
initial={{ opacity: 0, y: -50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Scale pulse animation
animate={{ scale: [1, 1.05, 1] }}
transition={{ duration: 2, repeat: Infinity }}

// Hover effect
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.95 }}
```

**Elemen Dekoratif**:
- Floating emoji dengan animasi `animate-float`
- Feature cards dengan backdrop blur
- Gradient background

---

### 2. Photobooth Page

**File**: `app/photobooth/page.tsx`

**State**:
- `capturedImage`: String (base64) dari foto yang diambil
- `selectedFilter`: ID filter yang aktif

**Komponen yang Digunakan**:
- `CameraView`
- `SnowfallEffect`

**Methods**:

#### `handleCapture(imageData: string)`
Callback saat foto berhasil diambil.

#### `handleRetake()`
Reset state untuk mengambil foto baru.

#### `handleDownload()`
Download foto yang telah diambil.

```tsx
const link = document.createElement("a");
link.href = capturedImage;
link.download = `christmas-photo-${Date.now()}.png`;
link.click();
```

---

## 🎨 Styling System

### Tailwind Configuration

**File**: `tailwind.config.ts`

**Custom Animations**:
```tsx
animation: {
  snowfall: "snowfall linear infinite",
  float: "float 3s ease-in-out infinite",
}

keyframes: {
  snowfall: {
    "0%": { transform: "translateY(-10vh) translateX(0)" },
    "100%": { transform: "translateY(110vh) translateX(100px)" },
  },
  float: {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-20px)" },
  },
}
```

**Color Scheme**:
- Primary: Red (Merah Natal)
- Secondary: Green (Hijau Natal)
- Accent: Yellow/Gold (Emas)
- Background: Gradient merah-hijau

---

## 🔧 Utility Functions

### Canvas Image Export

```tsx
// Convert canvas to PNG
canvas.toDataURL("image/png");

// Convert canvas to JPEG (dengan kompresi)
canvas.toDataURL("image/jpeg", 0.9); // 0.9 = 90% quality
```

### Stream Management

```tsx
// Stop camera stream
stream.getTracks().forEach((track) => track.stop());

// Check if stream is active
stream.active // true/false
```

---

## 📦 Dependencies

### Production
- `next`: ^15.0.3
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `framer-motion`: ^11.11.17

### Development
- `typescript`: ^5.6.3
- `@types/node`: ^22.8.6
- `@types/react`: ^19.0.1
- `@types/react-dom`: ^19.0.1
- `tailwindcss`: ^3.4.15
- `postcss`: ^8.4.49
- `eslint`: ^9.14.0
- `eslint-config-next`: ^15.0.3

---

## 🌐 Browser APIs Used

### getUserMedia API
```tsx
navigator.mediaDevices.getUserMedia(constraints)
```
**Support**: Chrome 53+, Firefox 36+, Safari 11+, Edge 79+

### Canvas API
```tsx
canvas.getContext("2d")
```
**Support**: All modern browsers

### Download Attribute
```tsx
<a download="filename.png">
```
**Support**: All modern browsers

---

## 🎯 Best Practices

### Performance
1. Cleanup camera stream on unmount
2. Limit snowflake creation rate
3. Use CSS transforms for animations
4. Optimize canvas operations

### Security
1. Always use HTTPS in production for camera access
2. Request permissions properly
3. Handle permission denials gracefully

### UX
1. Show loading states
2. Provide clear error messages
3. Add countdown before capture
4. Show preview before download

---

## 🔄 Future Enhancements

Ide untuk pengembangan lebih lanjut:

1. **Multiple Photos**: Gallery untuk menyimpan multiple photos
2. **Stickers**: Sticker yang bisa di-drag & drop
3. **Brightness/Contrast**: Filter adjustment tools
4. **Social Share**: Share langsung ke social media
5. **GIF Mode**: Buat GIF animated
6. **Custom Frames**: Upload custom frame images
7. **Face Detection**: Auto-position filters based on face
8. **Backend Storage**: Save photos to cloud storage

---

**Happy Coding! 🎄💻**
