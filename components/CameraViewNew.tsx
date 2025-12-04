"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Filter } from "./FilterSelector";
import { applyFiltersToCanvas } from "@/lib/filterUtils";

interface CameraViewProps {
  filters: Filter[];
  selectedLayout: string;
  onCapture: (imageData: string | string[]) => void;
}

export default function CameraView({ filters, selectedLayout, onCapture }: CameraViewProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Real-time filter preview
  useEffect(() => {
    if (!videoRef.current || !previewCanvasRef.current || !stream) return;

    const video = videoRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const drawPreview = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Set canvas size if not set
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mirror effect for preview
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();

        // Apply active filters
        const enabledFilters = filters.filter(f => f.enabled);
        if (enabledFilters.length > 0) {
          applyFiltersToCanvas(ctx, canvas.width, canvas.height, enabledFilters.map(f => ({
            id: f.id,
            name: f.name,
            icon: f.icon,
            category: f.category
          })));
        }
      }
      animationFrameId = requestAnimationFrame(drawPreview);
    };

    drawPreview();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [stream, filters]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user", 
          width: { ideal: 1280 }, 
          height: { ideal: 720 }
        },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video to be ready
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
              resolve(true);
            };
          }
        });
      }
      
      setStream(mediaStream);
      setHasPermission(true);
    } catch (err) {
      console.error("Camera error:", err);
      setHasPermission(false);
    }
  };

  const capturePhoto = () => {
    // For collage layout, need to capture 4 images
    if (selectedLayout === "collage") {
      captureMultiple();
    } else {
      captureSingle();
    }
  };

  const captureSingle = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          takeSinglePhoto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const captureMultiple = () => {
    setIsCapturing(true);
    const images: string[] = [];
    let count = 0;
    const total = 4;

    const captureNext = () => {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            const imageData = takePhotoForCollage();
            if (imageData) {
              images.push(imageData);
              count++;
              
              if (count < total) {
                setTimeout(captureNext, 1500); // Wait between captures
              } else {
                setIsCapturing(false);
                setTimeout(() => {
                  onCapture(images);
                }, 0);
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    captureNext();
  };

  const takeSinglePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw unmirrored image
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Apply filters
    const enabledFilters = filters.filter(f => f.enabled);
    if (enabledFilters.length > 0) {
      applyFiltersToCanvas(ctx, canvas.width, canvas.height, enabledFilters.map(f => ({
        id: f.id,
        name: f.name,
        icon: f.icon,
        category: f.category
      })));
    }

    const imageData = canvas.toDataURL("image/png");
    setTimeout(() => {
      onCapture(imageData);
    }, 0);
  };

  const takePhotoForCollage = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw unmirrored image
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Apply filters
    const enabledFilters = filters.filter(f => f.enabled);
    if (enabledFilters.length > 0) {
      applyFiltersToCanvas(ctx, canvas.width, canvas.height, enabledFilters.map(f => ({
        id: f.id,
        name: f.name,
        icon: f.icon,
        category: f.category
      })));
    }

    return canvas.toDataURL("image/png");
  };

  if (hasPermission === false) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
      >
        <div className="text-6xl mb-4">📷</div>
        <h3 className="text-white text-xl font-bold mb-2">Camera Access Required</h3>
        <p className="text-white/80 mb-4">
          Please allow camera access to use the photobooth
        </p>
        <button
          onClick={startCamera}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:scale-105 transition-all"
        >
          Grant Access
        </button>
      </motion.div>
    );
  }

  if (hasPermission === null) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
      >
        <div className="text-6xl mb-4 animate-pulse">📷</div>
        <p className="text-white text-lg">Initializing camera...</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Camera Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
      >
        {/* Hidden video element - but needs to load */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="hidden"
        />

        {/* Preview canvas with filters */}
        <canvas
          ref={previewCanvasRef}
          className="w-full h-auto"
          style={{ maxHeight: "70vh" }}
        />

        {/* Countdown Overlay */}
        <AnimatePresence>
          {countdown > 0 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="text-white text-9xl font-bold drop-shadow-2xl">
                {countdown}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collage Progress */}
        {isCapturing && selectedLayout === "collage" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
          >
            <p className="text-gray-800 font-bold">
              📸 Photo {capturedImages.length + 1} of 4
            </p>
          </motion.div>
        )}

        {/* Active Filters Badge */}
        {filters.filter(f => f.enabled).length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900 px-4 py-2 rounded-full shadow-lg font-bold text-sm"
          >
            ✨ {filters.filter(f => f.enabled).length} Filter(s) Active
          </motion.div>
        )}
      </motion.div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Capture Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={capturePhoto}
        disabled={countdown > 0 || isCapturing}
        className="w-full py-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isCapturing ? (
          <>🔄 Capturing...</>
        ) : (
          <>📸 Capture {selectedLayout === "collage" ? "4 Photos" : "Photo"}</>
        )}
      </motion.button>

      {/* Layout Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-white/70 text-sm"
      >
        {selectedLayout === "collage" && (
          <p>⚡ You&apos;ll take 4 separate photos for the collage layout</p>
        )}
        {selectedLayout !== "collage" && (
          <p>💡 Smile! Your photo will be captured in 3 seconds</p>
        )}
      </motion.div>
    </div>
  );
}
