# Christmas Photobooth - Filter & Layout System Documentation

## 📚 Overview

Sistem filter dan layout yang komprehensif untuk Christmas Photobooth, memungkinkan pengguna membuat foto Natal yang unik dan meriah dengan berbagai kombinasi filter, overlay, dan tata letak.

---

## 🎨 **1. FILTER SYSTEM**

### Filter Categories

#### A. **Accessories (5 filters)**
Filter yang menambahkan aksesori virtual pada foto:

1. **Santa Hat** 🎅
   - Topi Santa Claus di bagian atas
   - Warna: Merah dengan trim putih

2. **Reindeer** 🦌
   - Telinga rusa dan hidung merah
   - Efek Rudolph yang ikonik

3. **Scarf** 🧣
   - Syal merah-putih bergaris
   - Posisi di bagian bawah/leher

4. **Snowman** ⛄
   - Aksesori manusia salju
   - Wortel untuk hidung

5. **Elf Hat** 🧝
   - Topi elf hijau dengan lonceng

#### B. **Overlays (7 filters)**
Dekorasi dan overlay yang menambah suasana Natal:

1. **Tree Corner** 🎄
   - Pohon Natal di sudut foto
   - Posisi: Top left & top right

2. **Snowflakes** ❄️
   - Salju beranimasi di seluruh foto
   - Transparan dan elegan

3. **Gift Frame** 🎁
   - Hadiah Natal di keempat sudut
   - Frame dekoratif

4. **Bell Border** 🔔
   - Lonceng Natal di border atas
   - Susunan horizontal

5. **Light Garland** 💡
   - Lampu Natal berkelap-kelip
   - Warna-warni (merah, hijau, biru, kuning)

6. **Gingerbread** 🍪
   - Pattern gingerbread man
   - Background subtle

7. **Sparkles** 💫
   - Partikel berkilau
   - Efek magis dan festive

#### C. **Color Effects (4 filters)**
Efek warna yang mengubah tone foto:

1. **Warm Tone** 🌅
   - Golden/orange tint
   - Suasana hangat dan cozy
   - RGB adjustment: R +15%, G +5%, B -10%

2. **Cool Tone** ❄️
   - Blue winter tint
   - Suasana dingin dan winter
   - RGB adjustment: R -10%, G -5%, B +15%

3. **Grayscale Vintage** 📷
   - Black & white classic
   - Efek vintage/retro
   - Formula: 0.299R + 0.587G + 0.114B

4. **Bright Festive** ✨
   - Increased brightness
   - Warna lebih cerah dan festive
   - RGB adjustment: All channels +20%

### Filter Usage

```typescript
// Enable/disable filter
const handleToggleFilter = (filterId: string) => {
  setFilters(prev =>
    prev.map(f => (f.id === filterId ? { ...f, enabled: !f.enabled } : f))
  );
};

// Get active filters
const activeFilters = filters.filter(f => f.enabled);

// Apply filters to canvas
import { applyFiltersToCanvas } from "@/lib/filterUtils";

applyFiltersToCanvas(ctx, width, height, activeFilters);
```

### Filter Combination

✅ **Diperbolehkan:**
- Multiple accessories: ❌ (Hanya 1 accessory per foto untuk hasil terbaik)
- Multiple overlays: ✅ (Bisa kombinasi)
- Multiple effects: ❌ (Hanya 1 color effect)

💡 **Rekomendasi Kombinasi:**
1. Santa Hat + Snowflakes + Warm Tone
2. Reindeer + Light Garland + Bright Festive
3. Scarf + Tree Corner + Cool Tone
4. Elf Hat + Sparkles + Gingerbread

---

## 🖼️ **2. LAYOUT SYSTEM**

### Available Layouts

#### A. **Classic Frame**
- **ID:** `classic`
- **Dimensions:** 1200 x 1600 px (portrait)
- **Features:**
  - Red-green gradient border
  - Holly leaves decoration di corners
  - "Merry Christmas 2025 🎄" text
- **Best for:** Single portrait photos

#### B. **Polaroid Style**
- **ID:** `polaroid`
- **Dimensions:** 1000 x 1200 px
- **Features:**
  - White frame dengan shadow
  - Bottom space untuk custom text
  - Vintage tape effect di top
  - Snowflake decorations
- **Best for:** Candid moments, casual photos

#### C. **Collage 2x2 Grid**
- **ID:** `collage`
- **Dimensions:** 1340 x 1340 px (square)
- **Features:**
  - 4 photos dalam grid 2x2
  - Snowy blue background
  - Numbered photos (1-4)
  - "Christmas Memories 2025" banner
- **Best for:** Multiple poses, group photos
- **Note:** Memerlukan 4 foto terpisah

#### D. **Landscape Scene**
- **ID:** `landscape`
- **Dimensions:** 1920 x 1080 px (landscape)
- **Features:**
  - Winter night sky background
  - Christmas trees on sides
  - Gift boxes decoration
  - String lights across top
  - Full Christmas scene
- **Best for:** Horizontal photos, scenic shots

### Layout Selection

```typescript
const handleSelectLayout = (layoutId: string) => {
  setSelectedLayout(layoutId);
};

// Layout data structure
interface PhotoLayout {
  id: string;
  name: string;
  description: string;
  icon: string;
  preview: string;
}
```

### Layout Rendering

```typescript
// Classic
<LayoutClassic 
  imageData={imageData} 
  onRenderComplete={handleLayoutComplete} 
/>

// Polaroid
<LayoutPolaroid 
  imageData={imageData}
  customText="Happy Holidays!"
  onRenderComplete={handleLayoutComplete} 
/>

// Collage
<LayoutCollage 
  imageDatas={[img1, img2, img3, img4]}
  onRenderComplete={handleLayoutComplete} 
/>

// Landscape
<LayoutLandscape 
  imageData={imageData}
  onRenderComplete={handleLayoutComplete} 
/>
```

---

## 🔧 **3. IMPLEMENTATION GUIDE**

### Component Structure

```
components/
├── FilterSelector.tsx        # Filter selection UI
├── LayoutPreview.tsx         # Layout preview grid
├── PhotoResult.tsx           # Result display with download
├── CameraViewNew.tsx         # Camera with real-time filters
└── layouts/
    ├── LayoutClassic.tsx     # Classic frame renderer
    ├── LayoutPolaroid.tsx    # Polaroid renderer
    ├── LayoutCollage.tsx     # Collage renderer
    └── LayoutLandscape.tsx   # Landscape renderer
```

### Utility Functions

```typescript
// lib/filterUtils.ts

// Apply all filters to canvas
applyFiltersToCanvas(ctx, width, height, filters)

// Individual filter functions
drawSantaHat(ctx, width, height)
drawReindeerAccessories(ctx, width, height)
drawChristmasTreeCorner(ctx, width, height)
drawSnowflakes(ctx, width, height)
// ... etc

// Color effect utilities
applyColorEffect(imageDataUrl, effect, callback)
```

### Integration Example

```typescript
"use client";

import { useState } from "react";
import FilterSelector from "@/components/FilterSelector";
import LayoutPreview from "@/components/LayoutPreview";
import CameraView from "@/components/CameraViewNew";
import PhotoResult from "@/components/PhotoResult";

export default function PhotoboothPage() {
  const [filters, setFilters] = useState<Filter[]>([...]);
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [capturedImage, setCapturedImage] = useState(null);

  return (
    <>
      <FilterSelector 
        filters={filters}
        onToggleFilter={handleToggleFilter}
      />
      
      <LayoutPreview
        layouts={layouts}
        selectedLayout={selectedLayout}
        onSelectLayout={handleSelectLayout}
      />
      
      <CameraView
        filters={filters}
        selectedLayout={selectedLayout}
        onCapture={setCapturedImage}
      />
      
      {capturedImage && (
        <PhotoResult
          imageData={capturedImage}
          layoutId={selectedLayout}
          filters={filters}
          onClose={() => setCapturedImage(null)}
        />
      )}
    </>
  );
}
```

---

## 🎯 **4. FEATURES & CAPABILITIES**

### Real-time Preview
- ✅ Filter preview langsung pada video stream
- ✅ Mirrored preview untuk UX yang natural
- ✅ Canvas-based rendering

### Multi-Photo Capture (Collage)
- ✅ Countdown 3 detik untuk setiap foto
- ✅ Progress indicator (Photo 1 of 4, dst)
- ✅ Delay 1.5 detik antar foto
- ✅ Automatic combination dalam grid

### Filter Combination
- ✅ Toggle multiple filters sekaligus
- ✅ Visual indicator (checkmark) untuk active filters
- ✅ Counter badge di camera preview

### Download & Save
- ✅ High-quality PNG export
- ✅ Auto-filename dengan timestamp
- ✅ Preview sebelum download
- ✅ Retake option

---

## 💡 **5. BEST PRACTICES**

### Performance
```typescript
// ✅ Good: Use requestAnimationFrame for smooth preview
const drawPreview = () => {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    // Draw to canvas
  }
  requestAnimationFrame(drawPreview);
};

// ❌ Bad: setInterval creates performance issues
setInterval(() => {
  // Draw to canvas
}, 16);
```

### Filter Rendering
```typescript
// ✅ Good: Apply filters after drawing image
ctx.drawImage(video, 0, 0);
applyFiltersToCanvas(ctx, width, height, filters);

// ❌ Bad: Draw image over filters
applyFiltersToCanvas(ctx, width, height, filters);
ctx.drawImage(video, 0, 0); // This covers the filters!
```

### Canvas Transform
```typescript
// ✅ Good: Use save/restore for transforms
ctx.save();
ctx.translate(width, 0);
ctx.scale(-1, 1);
ctx.drawImage(video, 0, 0);
ctx.restore();

// ❌ Bad: Transform affects subsequent draws
ctx.translate(width, 0);
ctx.scale(-1, 1);
ctx.drawImage(video, 0, 0);
// All future draws are still mirrored!
```

---

## 🚀 **6. CUSTOMIZATION**

### Adding New Filter

```typescript
// 1. Add to filter list
const newFilter: Filter = {
  id: "candy-cane",
  name: "Candy Cane",
  icon: "🍭",
  category: "accessory",
  enabled: false
};

// 2. Implement drawing function
function drawCandyCane(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.font = `${width * 0.1}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("🍭", width * 0.1, height * 0.3);
}

// 3. Add to applyFiltersToCanvas switch
case "candy-cane":
  drawCandyCane(ctx, width, height);
  break;
```

### Creating New Layout

```typescript
// 1. Create layout component
// components/layouts/LayoutCustom.tsx
export default function LayoutCustom({ 
  imageData, 
  onRenderComplete 
}: LayoutCustomProps) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    // ... render logic
    onRenderComplete(canvas.toDataURL("image/png"));
  }, [imageData]);

  return <canvas ref={canvasRef} className="hidden" />;
}

// 2. Add to layouts array
{
  id: "custom",
  name: "Custom Layout",
  description: "Your custom design",
  icon: "🎨",
  preview: "/layouts/custom.png"
}

// 3. Add to PhotoResult component
{layoutId === "custom" && (
  <LayoutCustom 
    imageData={imageData}
    onRenderComplete={handleLayoutComplete}
  />
)}
```

---

## 📦 **7. DEPENDENCIES**

```json
{
  "dependencies": {
    "next": "^15.5.6",
    "react": "^19.0.0",
    "framer-motion": "^11.11.17",
    "tailwindcss": "^3.4.15"
  }
}
```

---

## 🎨 **8. STYLING GUIDE**

### Color Palette

```css
/* Christmas Red */
--christmas-red: #C41E3A;

/* Christmas Green */
--christmas-green: #165B33;

/* Gold/Yellow */
--gold: #FFD700;
--yellow: #FFC107;

/* Winter Blue */
--winter-blue: #4A6FA5;
--light-blue: #B8D8E8;

/* White/Snow */
--snow-white: #FFFFFF;
--cream: #F5F5DC;
```

### Tailwind Classes

```typescript
// Buttons
className="bg-gradient-to-r from-red-500 to-red-700 hover:scale-105"

// Cards
className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"

// Badges
className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900"
```

---

## 🐛 **9. TROUBLESHOOTING**

### Issue: Filters tidak muncul
```typescript
// Check if filters are enabled
console.log(filters.filter(f => f.enabled));

// Verify applyFiltersToCanvas is called
applyFiltersToCanvas(ctx, width, height, activeFilters);
```

### Issue: Photo terbalik/mirror
```typescript
// Solution: Use transform before drawImage
ctx.save();
ctx.translate(width, 0);
ctx.scale(-1, 1);
ctx.drawImage(video, 0, 0);
ctx.restore();
```

### Issue: Collage tidak capture 4 foto
```typescript
// Ensure selectedLayout is "collage"
if (selectedLayout === "collage") {
  captureMultiple(); // This captures 4 photos
}
```

---

## 📞 **10. SUPPORT & RESOURCES**

### Key Files
- `app/photobooth/page.tsx` - Main photobooth page
- `components/FilterSelector.tsx` - Filter UI
- `components/LayoutPreview.tsx` - Layout selector
- `components/CameraViewNew.tsx` - Camera with filters
- `lib/filterUtils.ts` - Filter utilities

### Further Customization
- Add more filters in `filterUtils.ts`
- Create new layouts in `components/layouts/`
- Modify color schemes in Tailwind config
- Adjust camera resolution in `getUserMedia`

---

Made with ❤️ for Christmas 2025 🎄
