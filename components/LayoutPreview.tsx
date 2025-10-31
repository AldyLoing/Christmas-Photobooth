"use client";

import { motion } from "framer-motion";

export interface PhotoLayout {
  id: string;
  name: string;
  description: string;
  icon: string;
  preview: string;
}

interface LayoutPreviewProps {
  layouts: PhotoLayout[];
  selectedLayout: string;
  onSelectLayout: (layoutId: string) => void;
}

export default function LayoutPreview({ layouts, selectedLayout, onSelectLayout }: LayoutPreviewProps) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          🖼️ Photo Layout Style
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {layouts.map((layout) => (
            <motion.button
              key={layout.id}
              onClick={() => onSelectLayout(layout.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative group ${
                selectedLayout === layout.id
                  ? "ring-4 ring-yellow-400 shadow-lg shadow-yellow-500/50"
                  : ""
              }`}
            >
              {/* Preview Box */}
              <div
                className={`aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 ${
                  selectedLayout === layout.id
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                    : "bg-white/20 group-hover:bg-white/30"
                }`}
              >
                {/* Layout Preview Visual */}
                <div className="w-full h-full p-3 flex items-center justify-center">
                  {layout.id === "classic" && (
                    <div className="w-full h-full border-4 border-red-500 rounded-lg bg-white/10 flex items-center justify-center">
                      <span className="text-6xl">{layout.icon}</span>
                    </div>
                  )}
                  {layout.id === "polaroid" && (
                    <div className="w-full h-full bg-white rounded-lg p-2 shadow-xl">
                      <div className="w-full h-3/4 bg-gray-300 rounded flex items-center justify-center">
                        <span className="text-4xl">{layout.icon}</span>
                      </div>
                      <div className="h-1/4"></div>
                    </div>
                  )}
                  {layout.id === "collage" && (
                    <div className="w-full h-full grid grid-cols-2 gap-1">
                      <div className="bg-white/20 rounded flex items-center justify-center text-2xl">📷</div>
                      <div className="bg-white/20 rounded flex items-center justify-center text-2xl">📷</div>
                      <div className="bg-white/20 rounded flex items-center justify-center text-2xl">📷</div>
                      <div className="bg-white/20 rounded flex items-center justify-center text-2xl">📷</div>
                    </div>
                  )}
                  {layout.id === "landscape" && (
                    <div className="w-full h-full bg-gradient-to-b from-blue-300 to-white/20 rounded-lg flex flex-col items-center justify-between p-2">
                      <div className="flex gap-1">
                        <span className="text-xl">🎄</span>
                        <span className="text-xl">⭐</span>
                        <span className="text-xl">🎄</span>
                      </div>
                      <span className="text-3xl">{layout.icon}</span>
                      <div className="flex gap-1">
                        <span className="text-xl">🎁</span>
                        <span className="text-xl">🎁</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Layout Info */}
              <div className="mt-2 text-center">
                <h4 className="text-white font-semibold text-sm">{layout.name}</h4>
                <p className="text-white/60 text-xs mt-1">{layout.description}</p>
              </div>

              {/* Selected Badge */}
              {selectedLayout === layout.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                >
                  <span className="text-lg">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
