"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CameraView from "@/components/CameraViewFinal";
import SnowfallEffect from "@/components/SnowfallEffect";
import FilterSelector, { type Filter } from "@/components/FilterSelector";
import LayoutPreview, { type PhotoLayout } from "@/components/LayoutPreview";
import PhotoResult from "@/components/PhotoResult";

export default function PhotoboothPage() {
  const [capturedImage, setCapturedImage] = useState<string | string[] | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<string>("classic");
  const [showFilters, setShowFilters] = useState(false);
  const [showLayouts, setShowLayouts] = useState(true);

  // All available filters
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

  // Available layouts
  const layouts: PhotoLayout[] = [
    {
      id: "classic",
      name: "Classic Frame",
      description: "Red-green Christmas border",
      icon: "�️",
      preview: "/layouts/classic.png",
    },
    {
      id: "polaroid",
      name: "Polaroid Style",
      description: "Vintage white frame",
      icon: "�",
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

  const handleToggleFilter = (filterId: string) => {
    setFilters(prev =>
      prev.map(f => (f.id === filterId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const handleSelectLayout = (layoutId: string) => {
    setSelectedLayout(layoutId);
  };

  const handleCapture = (imageData: string | string[]) => {
    setCapturedImage(imageData);
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleCloseResult = () => {
    setCapturedImage(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-800 via-green-800 to-red-900">
      <SnowfallEffect />

      {/* Header */}
      <div className="relative z-20 p-4 md:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
        >
          <span className="text-2xl">←</span>
          <span className="font-semibold">Back to Home</span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 pb-8">
        <AnimatePresence mode="wait">
          {!capturedImage ? (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="container mx-auto max-w-7xl"
            >
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg"
              >
                📸 Christmas Photobooth Studio
              </motion.h1>

              {/* Main Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Sidebar - Layout & Filters */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Layout Selection */}
                  {showLayouts && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <LayoutPreview
                        layouts={layouts}
                        selectedLayout={selectedLayout}
                        onSelectLayout={handleSelectLayout}
                      />
                    </motion.div>
                  )}

                  {/* Toggle Filters Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900 font-bold rounded-xl shadow-lg hover:shadow-yellow-500/50 transition-all"
                  >
                    {showFilters ? "Hide Filters ▲" : "Show Filters & Effects ▼"}
                  </motion.button>

                  {/* Filter Selection */}
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <FilterSelector
                          filters={filters}
                          onToggleFilter={handleToggleFilter}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Center - Camera View */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CameraView
                      filters={filters}
                      selectedLayout={selectedLayout}
                      onCapture={handleCapture}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Tips Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  💡 Quick Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/80 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">🎨</span>
                    <p>Mix multiple filters for unique effects!</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">📐</span>
                    <p>Choose your layout before taking photos</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">✨</span>
                    <p>Try color effects for vintage or festive vibes</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <PhotoResult
              imageData={capturedImage}
              layoutId={selectedLayout}
              filters={filters}
              onClose={handleCloseResult}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
