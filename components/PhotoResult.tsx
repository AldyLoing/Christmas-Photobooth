"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LayoutClassic from "./layouts/LayoutClassic";
import LayoutPolaroid from "./layouts/LayoutPolaroid";
import LayoutCollage from "./layouts/LayoutCollage";
import LayoutLandscape from "./layouts/LayoutLandscape";
import type { Filter } from "./FilterSelector";

interface PhotoResultProps {
  imageData: string | string[];
  layoutId: string;
  filters: Filter[];
  onClose: () => void;
}

export default function PhotoResult({ imageData, layoutId, filters, onClose }: PhotoResultProps) {
  const [finalImage, setFinalImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    setIsProcessing(true);
  }, [imageData, layoutId, filters]);

  const handleLayoutComplete = (dataUrl: string) => {
    // Apply color effects if any
    applyColorEffects(dataUrl);
  };

  const applyColorEffects = (dataUrl: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFinalImage(dataUrl);
      setIsProcessing(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Find active color effects
      const warmTone = filters.find(f => f.id === "warm" && f.enabled);
      const coolTone = filters.find(f => f.id === "cool" && f.enabled);
      const grayscale = filters.find(f => f.id === "grayscale" && f.enabled);
      const bright = filters.find(f => f.id === "bright" && f.enabled);

      // Apply effects
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Grayscale
        if (grayscale) {
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          r = g = b = gray;
        }

        // Warm tone (add gold/orange tint)
        if (warmTone) {
          r = Math.min(255, r * 1.15);
          g = Math.min(255, g * 1.05);
          b = Math.min(255, b * 0.9);
        }

        // Cool tone (add blue tint)
        if (coolTone) {
          r = Math.min(255, r * 0.9);
          g = Math.min(255, g * 0.95);
          b = Math.min(255, b * 1.15);
        }

        // Bright festive
        if (bright) {
          r = Math.min(255, r * 1.2);
          g = Math.min(255, g * 1.2);
          b = Math.min(255, b * 1.2);
        }

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }

      ctx.putImageData(imageData, 0, 0);
      setFinalImage(canvas.toDataURL("image/png"));
      setIsProcessing(false);
    };

    img.src = dataUrl;
  };

  const handleDownload = () => {
    if (!finalImage) return;

    const link = document.createElement("a");
    link.href = finalImage;
    link.download = `christmas-photo-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-red-900 via-green-900 to-red-900 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white font-bold text-2xl flex items-center gap-2">
            ✨ Your Christmas Photo
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-300 text-3xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* Processing State */}
        {isProcessing && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-4"
              >
                🎄
              </motion.div>
              <p className="text-white text-lg">Creating your magical photo...</p>
            </div>
          </div>
        )}

        {/* Result Image */}
        {!isProcessing && finalImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <img
                src={finalImage}
                alt="Christmas Photo Result"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/50 transition-all"
              >
                📥 Download Photo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all"
              >
                📸 Take Another
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Hidden Layout Components */}
        {layoutId === "classic" && typeof imageData === "string" && (
          <LayoutClassic imageData={imageData} onRenderComplete={handleLayoutComplete} />
        )}
        {layoutId === "polaroid" && typeof imageData === "string" && (
          <LayoutPolaroid imageData={imageData} onRenderComplete={handleLayoutComplete} />
        )}
        {layoutId === "collage" && Array.isArray(imageData) && (
          <LayoutCollage imageDatas={imageData} onRenderComplete={handleLayoutComplete} />
        )}
        {layoutId === "landscape" && typeof imageData === "string" && (
          <LayoutLandscape imageData={imageData} onRenderComplete={handleLayoutComplete} />
        )}
      </motion.div>
    </div>
  );
}
