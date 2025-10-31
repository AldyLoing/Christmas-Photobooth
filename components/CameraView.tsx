"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface CameraViewProps {
  selectedFilter: string;
  selectedLayout: string;
  onCapture: (imageData: string) => void;
}

export default function CameraView({ selectedFilter, selectedLayout, onCapture }: CameraViewProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: false,
      });
      setStream(mediaStream);
      setHasPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setHasPermission(false);
    }
  };

  const capturePhoto = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          takePhoto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Apply layout-specific canvas setup
    applyLayout(video, canvas);

    const imageData = canvas.toDataURL("image/png");
    
    // Use setTimeout to avoid setState during render
    setTimeout(() => {
      onCapture(imageData);
    }, 0);
  };

  const applyLayout = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const padding = 20;
    const borderSize = 10;

    switch (selectedLayout) {
      case "single":
        // Single photo layout (default)
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Flip horizontal untuk hasil yang benar (undo mirror effect)
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        
        // Draw video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        // Add filter overlay
        drawFilter(ctx, canvas.width, canvas.height);
        
        // Add watermark
        addWatermark(ctx, canvas.width, canvas.height);
        break;

      case "collage-2":
        // 2 photos side by side
        canvas.width = (video.videoWidth * 2) + (padding * 3);
        canvas.height = video.videoHeight + (padding * 2);
        
        // Background
        ctx.fillStyle = "#2d3748";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Photo 1 - Flip horizontal
        ctx.save();
        ctx.translate(padding + video.videoWidth, padding);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        ctx.restore();
        drawFilter(ctx, video.videoWidth, video.videoHeight, padding, padding);
        
        // Photo 2 - Flip horizontal
        ctx.save();
        ctx.translate(video.videoWidth + (padding * 2) + video.videoWidth, padding);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        ctx.restore();
        drawFilter(ctx, video.videoWidth, video.videoHeight, video.videoWidth + (padding * 2), padding);
        
        // Add watermark
        addWatermark(ctx, canvas.width, canvas.height);
        break;

      case "collage-4":
        // 4 photos in 2x2 grid
        const photoWidth = video.videoWidth / 2;
        const photoHeight = video.videoHeight / 2;
        canvas.width = video.videoWidth + (padding * 3);
        canvas.height = video.videoHeight + (padding * 3);
        
        // Background
        ctx.fillStyle = "#2d3748";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Top left - Flip horizontal
        ctx.save();
        ctx.translate(padding + photoWidth, padding);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, photoWidth, photoHeight);
        ctx.restore();
        drawFilter(ctx, photoWidth, photoHeight, padding, padding);
        
        // Top right - Flip horizontal
        ctx.save();
        ctx.translate(photoWidth + (padding * 2) + photoWidth, padding);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, photoWidth, photoHeight);
        ctx.restore();
        drawFilter(ctx, photoWidth, photoHeight, photoWidth + (padding * 2), padding);
        
        // Bottom left - Flip horizontal
        ctx.save();
        ctx.translate(padding + photoWidth, photoHeight + (padding * 2));
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, photoWidth, photoHeight);
        ctx.restore();
        drawFilter(ctx, photoWidth, photoHeight, padding, photoHeight + (padding * 2));
        
        // Bottom right - Flip horizontal
        ctx.save();
        ctx.translate(photoWidth + (padding * 2) + photoWidth, photoHeight + (padding * 2));
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, photoWidth, photoHeight);
        ctx.restore();
        drawFilter(ctx, photoWidth, photoHeight, photoWidth + (padding * 2), photoHeight + (padding * 2));
        
        // Add watermark
        addWatermark(ctx, canvas.width, canvas.height);
        break;

      case "strip":
        // Photo strip (4 vertical photos) - ukuran asli penuh
        canvas.width = video.videoWidth + (padding * 2);
        canvas.height = (video.videoHeight * 4) + (padding * 5);
        
        // Background
        ctx.fillStyle = "#2d3748";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw 4 identical photos vertically with flip - UKURAN ASLI
        for (let i = 0; i < 4; i++) {
          const yPos = padding + (i * (video.videoHeight + padding));
          
          // Flip horizontal for each photo
          ctx.save();
          ctx.translate(padding + video.videoWidth, yPos);
          ctx.scale(-1, 1);
          // Draw full video dengan ukuran asli (tidak di-scale)
          ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          ctx.restore();
          
          // Apply filter dengan ukuran normal
          drawFilter(ctx, video.videoWidth, video.videoHeight, padding, yPos);
        }
        
        // Add watermark
        addWatermark(ctx, canvas.width, canvas.height);
        break;

      default:
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Flip horizontal untuk hasil yang benar
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        drawFilter(ctx, canvas.width, canvas.height);
        addWatermark(ctx, canvas.width, canvas.height);
    }
  };

  const addWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.font = "bold 24px Poppins";
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.textAlign = "right";
    ctx.fillText("Merry Christmas 2025 🎄", width - 20, height - 20);
  };

  const drawFilter = (ctx: CanvasRenderingContext2D, width: number, height: number, offsetX: number = 0, offsetY: number = 0) => {
    ctx.font = `${width / 6}px Arial`;
    ctx.textAlign = "center";

    switch (selectedFilter) {
      case "santa":
        // Santa hat at top
        ctx.fillText("🎅", offsetX + width / 2, offsetY + height / 6);
        break;
      case "reindeer":
        // Reindeer antlers at top
        ctx.fillText("🦌", offsetX + width / 2, offsetY + height / 6);
        break;
      case "snowman":
        // Snowman at bottom
        ctx.fillText("⛄", offsetX + width / 2, offsetY + height - height / 6);
        break;
      case "frame":
        // Christmas frame border
        ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";
        ctx.lineWidth = 20;
        ctx.strokeRect(offsetX + 10, offsetY + 10, width - 20, height - 20);
        
        // Corner decorations
        ctx.font = `${width / 12}px Arial`;
        ctx.fillText("🎄", offsetX + 60, offsetY + 60);
        ctx.fillText("🎄", offsetX + width - 60, offsetY + 60);
        ctx.fillText("🎁", offsetX + 60, offsetY + height - 40);
        ctx.fillText("🎁", offsetX + width - 60, offsetY + height - 40);
        break;
    }
  };

  if (hasPermission === null) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white/10 backdrop-blur-md rounded-2xl p-8">
        <p className="text-white text-xl">Loading camera...</p>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white/10 backdrop-blur-md rounded-2xl p-8">
        <p className="text-white text-xl mb-4 text-center">
          ⚠️ Camera permission denied
        </p>
        <p className="text-white/70 text-center mb-6">
          Please allow camera access to take photos
        </p>
        <button
          onClick={startCamera}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-full hover:scale-105 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Camera Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30"
      >
        {/* Layout Preview Badge */}
        <div className="absolute top-4 left-4 z-20 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold shadow-lg">
          {selectedLayout === "single" && "📷 Single"}
          {selectedLayout === "collage-2" && "🖼️ 2 Photos"}
          {selectedLayout === "collage-4" && "🎞️ 4 Photos"}
          {selectedLayout === "strip" && "📸 Strip"}
        </div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-auto transform scale-x-[-1]"
        />

        {/* Filter Preview */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {selectedFilter === "santa" && (
            <div className="absolute top-[10%] text-8xl md:text-9xl">🎅</div>
          )}
          {selectedFilter === "reindeer" && (
            <div className="absolute top-[10%] text-8xl md:text-9xl">🦌</div>
          )}
          {selectedFilter === "snowman" && (
            <div className="absolute bottom-[10%] text-8xl md:text-9xl">⛄</div>
          )}
          {selectedFilter === "frame" && (
            <>
              <div className="absolute inset-0 border-8 border-yellow-400 rounded-xl m-2"></div>
              <div className="absolute top-4 left-4 text-4xl">🎄</div>
              <div className="absolute top-4 right-4 text-4xl">🎄</div>
              <div className="absolute bottom-4 left-4 text-4xl">🎁</div>
              <div className="absolute bottom-4 right-4 text-4xl">🎁</div>
            </>
          )}
        </div>

        {/* Countdown Overlay */}
        {countdown > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="text-white text-9xl font-bold"
            >
              {countdown}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Capture Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex justify-center"
      >
        <button
          onClick={capturePhoto}
          disabled={countdown > 0}
          className="px-12 py-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900 text-xl font-bold rounded-full shadow-2xl hover:shadow-yellow-400/50 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          📸 Take Photo
        </button>
      </motion.div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
