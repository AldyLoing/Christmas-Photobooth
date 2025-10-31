# Layout Feature Documentation 📐

## Fitur Baru: Pilihan Layout Foto

Sekarang pengguna dapat memilih berbagai layout untuk foto mereka!

---

## 🎨 Pilihan Layout

### 1. **Single Photo (Default)** 📷
- Layout standar dengan satu foto
- Ukuran penuh dari kamera
- Perfect untuk portrait atau single shot

### 2. **2 Photos Collage** 🖼️
- Dua foto side-by-side
- Layout horizontal
- Great untuk before/after atau comparison shots

### 3. **4 Photos Collage** 🎞️
- Empat foto dalam grid 2x2
- Layout compact
- Perfect untuk multiple poses atau expressions

### 4. **Photo Strip** 📸
- Empat foto vertikal seperti photo booth klasik
- Layout memanjang ke bawah
- Nostalgia photobooth mall!

---

## 🎯 Cara Menggunakan

1. **Pilih Layout**: Klik salah satu tombol layout (Single, 2 Photos, 4 Photos, atau Strip)
2. **Pilih Filter**: Pilih filter Natal favorit Anda
3. **Ambil Foto**: Klik "Take Photo" dan pose!
4. **Hasil**: Foto Anda akan mengikuti layout yang dipilih

---

## 🔧 Technical Details

### Props CameraView (Updated)
```tsx
interface CameraViewProps {
  selectedFilter: string;
  selectedLayout: string;  // NEW!
  onCapture: (imageData: string) => void;
}
```

### Layout IDs
- `"single"` - Single photo layout
- `"collage-2"` - Two photos side by side
- `"collage-4"` - Four photos in 2x2 grid
- `"strip"` - Four photos vertical strip

### Canvas Dimensions by Layout

**Single:**
- Width: Video width
- Height: Video height

**Collage-2:**
- Width: (Video width × 2) + padding
- Height: Video height + padding

**Collage-4:**
- Width: Video width + padding
- Height: Video height + padding
- Each photo: 50% of video size

**Strip:**
- Width: Video width + padding
- Height: Video height + extra padding for 4 photos
- Each photo height: 25% of video height

---

## 🎨 UI Updates

### Layout Selection UI
- Located above filter selection
- Green gradient for selected layout
- Icons for visual representation
- Smooth animations with Framer Motion

### Preview Badge
- Shows current layout in top-left corner
- Green background with icon
- Always visible during camera preview

---

## 💡 Tips for Users

1. **For Groups**: Use "2 Photos" or "4 Photos" collage
2. **For Fun Poses**: Use "Photo Strip" for multiple expressions
3. **For Quality**: Use "Single" for best resolution
4. **For Sharing**: "4 Photos" collage is Instagram-friendly!

---

## 🔮 Future Enhancements

Ideas for future layout improvements:

- [ ] Custom layout templates
- [ ] Drag & drop photo arrangement
- [ ] Different collage styles (diagonal, circular, etc.)
- [ ] Add text/stickers between photos
- [ ] Custom borders and frames
- [ ] Save favorite layouts

---

## 🎄 Perfect for Christmas!

These layouts make your Christmas photos even more fun:
- Create before/after Santa shots
- Show multiple festive poses
- Make a Christmas greeting card
- Share on social media!

**Enjoy the new layouts! 🎅✨**
