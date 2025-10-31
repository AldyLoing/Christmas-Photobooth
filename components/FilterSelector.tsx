"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface Filter {
  id: string;
  name: string;
  icon: string;
  category: "accessory" | "overlay" | "effect";
  enabled: boolean;
}

interface FilterSelectorProps {
  filters: Filter[];
  onToggleFilter: (filterId: string) => void;
}

export default function FilterSelector({ filters, onToggleFilter }: FilterSelectorProps) {
  const accessories = filters.filter(f => f.category === "accessory");
  const overlays = filters.filter(f => f.category === "overlay");
  const effects = filters.filter(f => f.category === "effect");

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          ✨ Christmas Filters & Effects
        </h3>

        {/* Accessories Section */}
        <div className="mb-6">
          <p className="text-white/80 text-sm mb-3 font-semibold">🎅 Accessories</p>
          <div className="grid grid-cols-5 gap-3">
            {accessories.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => onToggleFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative aspect-square rounded-xl transition-all duration-300 ${
                  filter.enabled
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50 ring-4 ring-yellow-300"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">{filter.icon}</span>
                </div>
                {filter.enabled && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Overlays Section */}
        <div className="mb-6">
          <p className="text-white/80 text-sm mb-3 font-semibold">🎄 Overlays & Decorations</p>
          <div className="grid grid-cols-5 gap-3">
            {overlays.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => onToggleFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative aspect-square rounded-xl transition-all duration-300 ${
                  filter.enabled
                    ? "bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/50 ring-4 ring-green-300"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">{filter.icon}</span>
                </div>
                {filter.enabled && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Color Effects Section */}
        <div>
          <p className="text-white/80 text-sm mb-3 font-semibold">💫 Color Effects</p>
          <div className="grid grid-cols-4 gap-3">
            {effects.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => onToggleFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-3 rounded-xl transition-all duration-300 ${
                  filter.enabled
                    ? "bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/50 ring-4 ring-red-300"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{filter.icon}</span>
                  <span className="text-white text-xs font-semibold">{filter.name}</span>
                </div>
                {filter.enabled && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Active Filters Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center"
        >
          <span className="text-white/60 text-sm">
            {filters.filter(f => f.enabled).length} filter(s) active
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
