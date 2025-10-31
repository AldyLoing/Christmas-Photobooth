"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SnowfallEffect from "@/components/SnowfallEffect";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-700 via-green-700 to-red-900">
      {/* Snowfall Effect */}
      <SnowfallEffect />

      {/* Music Player */}
      <MusicPlayer />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo/Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎅 Merry Christmas
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl font-semibold text-yellow-300 drop-shadow-lg"
          >
            Photobooth 🎄
          </motion.div>
        </motion.div>

        {/* Welcome Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-white text-center mb-12 max-w-2xl px-4 drop-shadow-lg"
        >
          Take your festive photo anytime with amazing Christmas filters! 📸✨
        </motion.p>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl animate-float hidden md:block">
          🎁
        </div>
        <div className="absolute top-20 right-20 text-6xl animate-float animation-delay-1000 hidden md:block">
          ⛄
        </div>
        <div className="absolute bottom-20 left-20 text-6xl animate-float animation-delay-2000 hidden md:block">
          🦌
        </div>
        <div className="absolute bottom-32 right-32 text-6xl animate-float animation-delay-1500 hidden md:block">
          🔔
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/photobooth"
            className="group relative inline-flex items-center justify-center px-12 py-5 text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-green-500 to-red-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-3">
              📸 Start Photobooth
            </span>
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 shadow-xl">
            <div className="text-4xl mb-3">🎅</div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Santa Filters
            </h3>
            <p className="text-white/80 text-sm">
              Add festive overlays and frames
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 shadow-xl">
            <div className="text-4xl mb-3">📸</div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Instant Capture
            </h3>
            <p className="text-white/80 text-sm">
              Take photos directly from your camera
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 shadow-xl">
            <div className="text-4xl mb-3">💾</div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Easy Download
            </h3>
            <p className="text-white/80 text-sm">
              Save your festive memories instantly
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 text-white/60 text-sm text-center"
        >
          <p>🎄 Spread the Christmas joy! 🎄</p>
        </motion.div>
      </div>
    </main>
  );
}
