/**
 * CONTOH IMPLEMENTASI - Filter & Layout System
 * Christmas Photobooth
 * 
 * File ini berisi contoh lengkap cara menggunakan sistem filter dan layout
 */

// ============================================
// 1. IMPORT KOMPONEN
// ============================================

import FilterSelector, { type Filter } from "@/components/FilterSelector";
import LayoutPreview, { type PhotoLayout } from "@/components/LayoutPreview";
import CameraView from "@/components/CameraViewNew";
import PhotoResult from "@/components/PhotoResult";

// ============================================
// 2. SETUP STATE
// ============================================

// Filter state - 16 filters total (5 accessories + 7 overlays + 4 effects)
const [filters, setFilters] = useState<Filter[]>([
  // Accessories
  { id: "santa-hat", name: "Santa Hat", icon: "🎅", category: "accessory", enabled: false },
  { id: "reindeer", name: "Reindeer", icon: "🦌", category: "accessory", enabled: false },
  { id: "scarf", name: "Scarf", icon: "🧣", category: "accessory", enabled: false },
  { id: "snowman", name: "Snowman", icon: "⛄", category: "accessory", enabled: false },
  { id: "elf-hat", name: "Elf", icon: "🧝", category: "accessory", enabled: false },

  // Overlays
  { id: "tree-corner", name: "Tree Corner", icon: "🎄", category: "overlay", enabled: false },
  { id: "snowflakes", name: "Snowflakes", icon: "❄️", category: "overlay", enabled: false },
  { id: "gift-frame", name: "Gift Frame", icon: "🎁", category: "overlay", enabled: false },
  { id: "bell-border", name: "Bell Border", icon: "🔔", category: "overlay", enabled: false },
  { id: "lights", name: "Light Garland", icon: "💡", category: "overlay", enabled: false },
  { id: "gingerbread", name: "Gingerbread", icon: "🍪", category: "overlay", enabled: false },
  { id: "sparkle", name: "Sparkles", icon: "💫", category: "overlay", enabled: false },

  // Color Effects
  { id: "warm", name: "Warm", icon: "🌅", category: "effect", enabled: false },
  { id: "cool", name: "Cool", icon: "❄️", category: "effect", enabled: false },
  { id: "grayscale", name: "Vintage", icon: "📷", category: "effect", enabled: false },
  { id: "bright", name: "Festive", icon: "✨", category: "effect", enabled: false },
]);

// Layout state - 4 layouts available
const [selectedLayout, setSelectedLayout] = useState<string>("classic");

const layouts: PhotoLayout[] = [
  {
    id: "classic",
    name: "Classic Frame",
    description: "Red-green Christmas border",
    icon: "🖼️",
    preview: "/layouts/classic.png",
  },
  {
    id: "polaroid",
    name: "Polaroid Style",
    description: "Vintage white frame",
    icon: "📷",
    preview: "/layouts/polaroid.png",
  },
  {
    id: "collage",
    name: "Collage 2x2",
    description: "Four photos grid",
    icon: "🎞️",
    preview: "/layouts/collage.png",
  },
  {
    id: "landscape",
    name: "Landscape Scene",
    description: "Full Christmas scene",
    icon: "🏔️",
    preview: "/layouts/landscape.png",
  },
];

// ============================================
// 3. EVENT HANDLERS
// ============================================

// Toggle filter on/off
const handleToggleFilter = (filterId: string) => {
  setFilters(prev =>
    prev.map(f => (f.id === filterId ? { ...f, enabled: !f.enabled } : f))
  );
};

// Contoh: Enable multiple filters sekaligus
const enableChristmasCombo = () => {
  setFilters(prev =>
    prev.map(f => ({
      ...f,
      enabled: ["santa-hat", "snowflakes", "warm"].includes(f.id)
    }))
  );
};

// Select layout
const handleSelectLayout = (layoutId: string) => {
  setSelectedLayout(layoutId);
};

// Handle captured photo
const handleCapture = (imageData: string | string[]) => {
  setCapturedImage(imageData);
  // imageData bisa string (untuk single/polaroid/landscape)
  // atau string[] (untuk collage yang butuh 4 foto)
};

// ============================================
// 4. RENDER KOMPONEN
// ============================================

// A. Filter Selector Component
<FilterSelector 
  filters={filters}
  onToggleFilter={handleToggleFilter}
/>
/**
 * Props:
 * - filters: Array of Filter objects dengan status enabled
 * - onToggleFilter: Callback saat filter di-toggle
 * 
 * Features:
 * - Grid layout dengan kategori terpisah
 * - Visual checkmark untuk active filters
 * - Hover effects dan animations
 * - Counter untuk active filters
 */

// B. Layout Preview Component
<LayoutPreview
  layouts={layouts}
  selectedLayout={selectedLayout}
  onSelectLayout={handleSelectLayout}
/>
/**
 * Props:
 * - layouts: Array of PhotoLayout objects
 * - selectedLayout: ID layout yang sedang aktif
 * - onSelectLayout: Callback saat layout dipilih
 * 
 * Features:
 * - Visual preview tiap layout
 * - Selected badge dengan checkmark
 * - Responsive grid (2 cols mobile, 4 cols desktop)
 * - Hover animations
 */

// C. Camera View Component
<CameraView
  filters={filters}
  selectedLayout={selectedLayout}
  onCapture={handleCapture}
/>
/**
 * Props:
 * - filters: Array filters untuk real-time preview
 * - selectedLayout: Layout yang dipilih (untuk collage logic)
 * - onCapture: Callback dengan image data
 * 
 * Features:
 * - Real-time filter preview pada video
 * - Countdown 3 detik sebelum capture
 * - Multi-photo capture untuk collage (4 photos)
 * - Active filters badge
 * - Camera permission handling
 */

// D. Photo Result Component
{capturedImage && (
  <PhotoResult
    imageData={capturedImage}
    layoutId={selectedLayout}
    filters={filters}
    onClose={() => setCapturedImage(null)}
  />
)}
/**
 * Props:
 * - imageData: string atau string[] dari captured photo
 * - layoutId: ID layout untuk rendering
 * - filters: Array filters untuk color effects
 * - onClose: Callback untuk close/retake
 * 
 * Features:
 * - Render layout dengan image
 * - Apply color effects
 * - Download button
 * - Retake button
 * - Loading state saat processing
 */

// ============================================
// 5. CONTOH PENGGUNAAN UTILITY FUNCTIONS
// ============================================

import { 
  applyFiltersToCanvas, 
  applyColorEffect 
} from "@/lib/filterUtils";

// Contoh 1: Apply filters ke canvas
const ctx = canvas.getContext("2d");
const activeFilters = filters.filter(f => f.enabled);

applyFiltersToCanvas(
  ctx,                  // Canvas context
  canvas.width,         // Width
  canvas.height,        // Height
  activeFilters         // Enabled filters
);

// Contoh 2: Apply color effect ke image
applyColorEffect(
  imageDataUrl,         // Base64 image data
  "warm",              // Effect: "warm" | "cool" | "grayscale" | "bright"
  (result) => {        // Callback with processed image
    setProcessedImage(result);
  }
);

// ============================================
// 6. CONTOH KOMBINASI FILTER YANG BAGUS
// ============================================

// Combo 1: Santa Classic
const santaClassic = {
  filters: ["santa-hat", "snowflakes", "warm"],
  layout: "classic"
};

// Combo 2: Reindeer Fun
const reindeerFun = {
  filters: ["reindeer", "lights", "bright"],
  layout: "polaroid"
};

// Combo 3: Winter Wonderland
const winterWonderland = {
  filters: ["tree-corner", "snowflakes", "sparkle", "cool"],
  layout: "landscape"
};

// Combo 4: Festive Collage
const festiveCollage = {
  filters: ["gift-frame", "bell-border", "bright"],
  layout: "collage"
};

// Function untuk apply combo
const applyFilterCombo = (combo: { filters: string[], layout: string }) => {
  setFilters(prev =>
    prev.map(f => ({
      ...f,
      enabled: combo.filters.includes(f.id)
    }))
  );
  setSelectedLayout(combo.layout);
};

// ============================================
// 7. TIPS & BEST PRACTICES
// ============================================

/**
 * TIP 1: Filter Combination
 * - Jangan combine terlalu banyak accessories (max 1-2)
 * - Overlays bisa di-combine bebas (2-3 ideal)
 * - Color effects: pilih 1 saja
 */

/**
 * TIP 2: Layout Selection
 * - Classic: Terbaik untuk portrait formal
 * - Polaroid: Casual, fun, spontan
 * - Collage: Bercerita dengan multiple poses
 * - Landscape: Scenic, wide shots
 */

/**
 * TIP 3: Performance
 * - Real-time preview menggunakan requestAnimationFrame
 * - Filters di-render setelah image drawn
 * - Canvas transform untuk mirror effect
 * - setTimeout untuk async state updates
 */

/**
 * TIP 4: User Experience
 * - Show active filter count
 * - Countdown sebelum capture
 * - Progress indicator untuk collage
 * - Loading state saat processing
 * - Preview sebelum download
 */

// ============================================
// 8. TROUBLESHOOTING GUIDE
// ============================================

/**
 * ISSUE: Filter tidak tampil di foto
 * SOLUTION: Pastikan filter enabled sebelum capture
 */
const debugFilters = () => {
  const active = filters.filter(f => f.enabled);
  console.log("Active filters:", active.map(f => f.name));
  // Harus ada hasil jika filter sudah di-enable
};

/**
 * ISSUE: Foto terbalik/mirror
 * SOLUTION: Gunakan canvas transform
 */
ctx.save();
ctx.translate(canvas.width, 0);
ctx.scale(-1, 1);
ctx.drawImage(video, 0, 0);
ctx.restore();

/**
 * ISSUE: Collage tidak capture 4 foto
 * SOLUTION: Pastikan selectedLayout adalah "collage"
 */
if (selectedLayout === "collage") {
  // Will capture 4 separate photos
} else {
  // Will capture single photo
}

/**
 * ISSUE: Color effect tidak apply
 * SOLUTION: Check filter category
 */
const colorEffects = filters.filter(f => 
  f.category === "effect" && f.enabled
);
// Apply color effects setelah layout rendering

// ============================================
// 9. CONTOH LENGKAP PAGE COMPONENT
// ============================================

export default function PhotoboothExample() {
  const [filters, setFilters] = useState<Filter[]>([/* ... */]);
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [capturedImage, setCapturedImage] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container mx-auto p-4">
      {!capturedImage ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <LayoutPreview
              layouts={layouts}
              selectedLayout={selectedLayout}
              onSelectLayout={handleSelectLayout}
            />
            
            <button onClick={() => setShowFilters(!showFilters)}>
              Toggle Filters
            </button>
            
            {showFilters && (
              <FilterSelector
                filters={filters}
                onToggleFilter={handleToggleFilter}
              />
            )}
          </div>

          {/* Camera */}
          <div className="lg:col-span-2">
            <CameraView
              filters={filters}
              selectedLayout={selectedLayout}
              onCapture={setCapturedImage}
            />
          </div>
        </div>
      ) : (
        <PhotoResult
          imageData={capturedImage}
          layoutId={selectedLayout}
          filters={filters}
          onClose={() => setCapturedImage(null)}
        />
      )}
    </div>
  );
}

// ============================================
// 10. CUSTOMIZATION EXAMPLES
// ============================================

/**
 * Contoh: Menambah Filter Baru
 */

// 1. Tambah ke state
{ 
  id: "mistletoe", 
  name: "Mistletoe", 
  icon: "🌿", 
  category: "accessory", 
  enabled: false 
}

// 2. Implementasi drawing function di filterUtils.ts
function drawMistletoe(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.font = `${width * 0.08}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("🌿", width / 2, height * 0.1);
}

// 3. Tambah ke switch case
case "mistletoe":
  drawMistletoe(ctx, width, height);
  break;

/**
 * Contoh: Membuat Layout Custom
 */

// 1. Buat file LayoutCircle.tsx
export default function LayoutCircle({ imageData, onRenderComplete }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    canvas.width = 1200;
    canvas.height = 1200;
    
    // Background
    ctx.fillStyle = "#165B33";
    ctx.fillRect(0, 0, 1200, 1200);
    
    // Circular mask for photo
    ctx.save();
    ctx.beginPath();
    ctx.arc(600, 600, 500, 0, Math.PI * 2);
    ctx.clip();
    
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 100, 100, 1000, 1000);
      ctx.restore();
      
      // Border
      ctx.strokeStyle = "#FFD700";
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(600, 600, 500, 0, Math.PI * 2);
      ctx.stroke();
      
      onRenderComplete(canvas.toDataURL("image/png"));
    };
    img.src = imageData;
  }, [imageData]);

  return <canvas ref={canvasRef} className="hidden" />;
}

// 2. Tambah ke layouts array
{
  id: "circle",
  name: "Circle Frame",
  description: "Round photo with gold border",
  icon: "⭕",
  preview: "/layouts/circle.png"
}

// 3. Tambah ke PhotoResult
{layoutId === "circle" && (
  <LayoutCircle imageData={imageData} onRenderComplete={handleLayoutComplete} />
)}

// ============================================
// END OF EXAMPLES
// ============================================

/**
 * Untuk dokumentasi lengkap, lihat:
 * - FILTERS_LAYOUTS_GUIDE.md
 * - components/FilterSelector.tsx
 * - components/LayoutPreview.tsx
 * - components/CameraViewNew.tsx
 * - lib/filterUtils.ts
 */
