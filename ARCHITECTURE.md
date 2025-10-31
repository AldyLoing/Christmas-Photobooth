# 📊 Project Architecture & Flow

Visual diagram dan penjelasan arsitektur aplikasi Christmas Photobooth.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      BROWSER (Client-Side Only)              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App Router (v15)                  │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                   │
│         ┌─────────────────┴─────────────────┐                │
│         │                                   │                │
│    ┌────▼─────┐                       ┌────▼──────┐         │
│    │   Home   │                       │ Photobooth│         │
│    │  Page    │──────────────────────▶│   Page    │         │
│    │   (/)    │    "Start Photobooth" │ (/photobooth)│      │
│    └────┬─────┘                       └────┬───────┘         │
│         │                                   │                │
│         │                           ┌───────▼────────┐       │
│    Components:                      │  CameraView    │       │
│    - SnowfallEffect                 │  Component     │       │
│    - MusicPlayer                    └───────┬────────┘       │
│                                             │                │
│                                     ┌───────▼────────┐       │
│                                     │ Browser APIs:  │       │
│                                     │ - getUserMedia │       │
│                                     │ - Canvas 2D    │       │
│                                     │ - Blob/File    │       │
│                                     └────────────────┘       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 User Flow Diagram

```
┌──────────┐
│  START   │
└────┬─────┘
     │
     ▼
┌─────────────────┐
│  Landing Page   │
│  - Animations   │
│  - Snowfall     │
│  - Features     │
└────┬────────────┘
     │ [Click "Start Photobooth"]
     ▼
┌─────────────────┐
│ Camera Request  │
│ Permission?     │
└────┬────────────┘
     │
     ├─► [Denied] ──────┐
     │                  │
     ├─► [Allowed] ─────┤
     │                  │
     ▼                  ▼
┌─────────────────┐  ┌──────────────┐
│ Camera Preview  │  │ Error Screen │
│ with Filters    │  │ "Try Again"  │
└────┬────────────┘  └──────────────┘
     │
     │ [Select Filter]
     ▼
┌─────────────────┐
│ Preview Filter  │
│ (Real-time)     │
└────┬────────────┘
     │
     │ [Click "Take Photo"]
     ▼
┌─────────────────┐
│  Countdown 3-2-1│
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Capture Photo   │
│ + Apply Filter  │
│ + Add Watermark │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Show Result     │
│ [Download] or   │
│ [Retake]        │
└────┬────────────┘
     │
     ├─► [Download] ──► Save to device
     │
     └─► [Retake] ───► Back to Camera Preview
```

---

## 🔄 Component Interaction Flow

```
Home Page (app/page.tsx)
│
├─► SnowfallEffect Component
│   └─► Creates animated snowflakes
│       └─► Uses setInterval for continuous generation
│
├─► MusicPlayer Component
│   └─► Toggle mute/unmute button
│       └─► (Optional) Audio player
│
└─► Navigation to Photobooth Page

Photobooth Page (app/photobooth/page.tsx)
│
├─► State Management
│   ├─► capturedImage: null | string
│   └─► selectedFilter: string
│
├─► Filter Selection UI
│   └─► Updates selectedFilter state
│
└─► CameraView Component
    │
    ├─► Props
    │   ├─► selectedFilter (from parent)
    │   └─► onCapture callback
    │
    ├─► Camera Stream
    │   ├─► Request getUserMedia
    │   ├─► Handle permissions
    │   └─► Display video preview
    │
    ├─► Filter Preview (Live)
    │   └─► Overlay emoji on video
    │
    ├─► Capture Process
    │   ├─► Start countdown (3-2-1)
    │   ├─► Draw video to canvas
    │   ├─► Apply filter to canvas
    │   ├─► Add watermark
    │   └─► Export as PNG/JPEG
    │
    └─► Return image data to parent
        └─► Parent shows result with actions
```

---

## 🎨 Data Flow

```
User Action               State Changes              UI Updates
───────────────────────────────────────────────────────────────

[Page Load]       ──►   Initialize states      ──►   Show home page
                                                     + snowfall effect

[Click Button]    ──►   Navigate to           ──►   Load photobooth
                        /photobooth                  page

[Camera Start]    ──►   hasPermission: null   ──►   Show loading

[Permission       ──►   hasPermission: true   ──►   Show camera
 Granted]              stream: MediaStream          preview

[Select Filter]   ──►   selectedFilter:       ──►   Update preview
                        "santa"                      overlay

[Click Capture]   ──►   countdown: 3          ──►   Show "3"
                        countdown: 2                 Show "2"
                        countdown: 1                 Show "1"
                        countdown: 0                 Take photo!

[Photo Taken]     ──►   capturedImage:        ──►   Show result
                        "data:image/png..."          + actions

[Download]        ──►   Create download link  ──►   Save file

[Retake]          ──►   capturedImage: null   ──►   Back to camera
```

---

## 🔧 Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  ┌────────────────────────────────┐    │
│  │      React Components          │    │
│  │  - Functional Components       │    │
│  │  - Hooks (useState, useEffect) │    │
│  │  - TypeScript Types            │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Framework Layer                 │
│  ┌────────────────────────────────┐    │
│  │        Next.js 15               │    │
│  │  - App Router                   │    │
│  │  - Server Components            │    │
│  │  - Client Components            │    │
│  │  - File-based Routing           │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Styling Layer                   │
│  ┌────────────────────────────────┐    │
│  │      Tailwind CSS               │    │
│  │  - Utility Classes              │    │
│  │  - Custom Config                │    │
│  │  - Responsive Design            │    │
│  └────────────────────────────────┘    │
│  ┌────────────────────────────────┐    │
│  │      Framer Motion              │    │
│  │  - Animations                   │    │
│  │  - Transitions                  │    │
│  │  - Gestures                     │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Browser APIs Layer              │
│  ┌────────────────────────────────┐    │
│  │   navigator.mediaDevices       │    │
│  │   - getUserMedia()              │    │
│  └────────────────────────────────┘    │
│  ┌────────────────────────────────┐    │
│  │   Canvas API                    │    │
│  │   - getContext('2d')            │    │
│  │   - drawImage()                 │    │
│  │   - fillText()                  │    │
│  └────────────────────────────────┘    │
│  ┌────────────────────────────────┐    │
│  │   File/Blob API                 │    │
│  │   - toDataURL()                 │    │
│  │   - Download attribute          │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

---

## 📦 File Dependencies

```
app/page.tsx
  ├─► components/SnowfallEffect.tsx
  │     └─► React hooks (useEffect)
  │
  ├─► components/MusicPlayer.tsx
  │     ├─► React hooks (useState, useRef, useEffect)
  │     └─► framer-motion
  │
  ├─► next/link
  └─► framer-motion

app/photobooth/page.tsx
  ├─► components/CameraView.tsx
  │     ├─► React hooks (useState, useRef, useEffect)
  │     ├─► framer-motion
  │     └─► Browser APIs
  │           ├─► navigator.mediaDevices.getUserMedia
  │           ├─► HTMLVideoElement
  │           ├─► HTMLCanvasElement
  │           └─► Canvas 2D Context
  │
  ├─► components/SnowfallEffect.tsx
  ├─► next/link
  └─► framer-motion

app/layout.tsx
  ├─► app/globals.css
  │     └─► Tailwind CSS directives
  │
  └─► next/metadata

tailwind.config.ts
  └─► Custom animations & keyframes

next.config.ts
  └─► Next.js configuration
```

---

## 🎯 Key Design Patterns

### 1. **Composition Pattern**
Components are composed together to build the UI.

```tsx
<Page>
  <SnowfallEffect />
  <CameraView />
</Page>
```

### 2. **Props Drilling**
Data flows from parent to child via props.

```tsx
<CameraView 
  selectedFilter={selectedFilter}
  onCapture={handleCapture}
/>
```

### 3. **Callback Pattern**
Child components communicate with parent via callbacks.

```tsx
// In parent
const handleCapture = (image: string) => {
  setCapturedImage(image);
}

// In child
onCapture(imageData); // Trigger parent function
```

### 4. **Hooks Pattern**
React hooks manage state and side effects.

```tsx
const [state, setState] = useState(initialValue);
useEffect(() => {
  // Side effect logic
}, [dependencies]);
```

### 5. **Client-Side Only**
All logic runs in the browser (no backend needed).

```tsx
"use client"; // Next.js directive
```

---

## 🔐 Security Considerations

```
┌─────────────────────────────────────────┐
│         Security Measures               │
├─────────────────────────────────────────┤
│                                         │
│  ✅ HTTPS Required (Production)         │
│     └─► Camera access requires secure   │
│         connection                       │
│                                         │
│  ✅ Permission-based Access             │
│     └─► User must grant camera          │
│         permission                       │
│                                         │
│  ✅ Client-Side Only Processing         │
│     └─► No data sent to server          │
│     └─► Photos stay on device           │
│                                         │
│  ✅ No Data Persistence                 │
│     └─► No cookies                       │
│     └─► No local storage                │
│     └─► No server storage                │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📈 Performance Optimization

```
Optimization Techniques
─────────────────────────────────────
1. Code Splitting (Next.js automatic)
2. Dynamic Imports (for heavy components)
3. Image Optimization (Next.js Image)
4. CSS Purging (Tailwind)
5. Tree Shaking (Webpack)
6. Lazy Loading Components
7. Memoization (React.memo, useMemo)
8. Debouncing User Actions
```

---

**This architecture ensures a fast, secure, and user-friendly Christmas Photobooth experience! 🎄✨**
