"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Filter } from "./FilterSelector";
import { applyFiltersToCanvas } from "@/lib/filterUtils";

interface CameraViewProps {
  filters: Filter[];
  selectedLayout: string;
  onCapture: (imageData: string | string[]) => void;
}

export default function CameraViewProduction({ filters, selectedLayout, onCapture }: CameraViewProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSecureContext, setIsSecureContext] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Check secure context (HTTPS requirement)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isSecure = window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost';
      setIsSecureContext(isSecure);
      
      if (!isSecure) {
        setError("Camera requires HTTPS connection");
        setHasPermission(false);
        console.error("❌ Not a secure context. Camera requires HTTPS.");
      }
    }
  }, []);

  // Start camera with proper error handling
  const startCamera = useCallback(async () => {
    try {
      // Check if mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia is not supported in this browser");
      }

      console.log("🎥 Requesting camera access...");
      
      // Log available devices for debugging
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      console.log(`📹 Found ${videoDevices.length} camera(s):`, videoDevices.map(d => d.label || 'Unknown'));

      // Request camera with specific constraints
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("✅ Camera access granted");
      
      if (videoRef.current) {
        // CRITICAL: Set srcObject and wait for video to be ready
        videoRef.current.srcObject = mediaStream;
        
        // Wait for metadata to load
        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error("Video element not found"));
            return;
          }

          const video = videoRef.current;
          
          const onLoadedMetadata = () => {
            console.log("📊 Video metadata loaded:", {
              width: video.videoWidth,
              height: video.videoHeight,
              readyState: video.readyState
            });
            
            // Play the video
            video.play()
              .then(() => {
                console.log("▶️ Video playing");
                resolve();
              })
              .catch(reject);
          };

          const onError = (e: Event) => {
            console.error("❌ Video error:", e);
            reject(new Error("Failed to load video"));
          };

          video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
          video.addEventListener('error', onError, { once: true });

          // Timeout fallback
          setTimeout(() => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('error', onError);
            if (video.readyState >= 2) {
              onLoadedMetadata();
            } else {
              reject(new Error("Video loading timeout"));
            }
          }, 10000);
        });
      }
      
      setStream(mediaStream);
      setHasPermission(true);
      setError(null);
    } catch (err) {
      console.error("❌ Camera error:", err);
      setHasPermission(false);
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError("Camera permission denied. Please allow camera access.");
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setError("No camera found on this device.");
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          setError("Camera is already in use by another application.");
        } else if (err.name === 'OverconstrainedError') {
          setError("Camera doesn't support the requested resolution.");
        } else {
          setError(`Camera error: ${err.message}`);
        }
      }
    }
  }, []);

  // Initialize camera on mount
  useEffect(() => {
    if (isSecureContext) {
      startCamera();
    }

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
          console.log("🛑 Camera track stopped");
        });
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isSecureContext, startCamera]);

  // Real-time video preview with filters
  useEffect(() => {
    if (!videoRef.current || !previewCanvasRef.current || !stream) return;

    const video = videoRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isDrawing = true;

    const drawPreview = () => {
      if (!isDrawing) return;

      // Check if video is ready
      if (video.readyState >= video.HAVE_CURRENT_DATA && video.videoWidth > 0) {
        // Set canvas size to match video dimensions
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          console.log("📐 Canvas resized to:", canvas.width, "x", canvas.height);
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mirror effect for preview (flip horizontally)
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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

      animationFrameRef.current = requestAnimationFrame(drawPreview);
    };

    drawPreview();

    return () => {
      isDrawing = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [stream, filters]);

  const capturePhoto = () => {
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
                setTimeout(captureNext, 1500);
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

    // Draw unmirrored image (flip back)
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
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

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

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

  // Loading state
  if (hasPermission === null) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
      >
        <div className="text-6xl mb-4 animate-pulse">📷</div>
        <p className="text-white text-lg">Initializing camera...</p>
        <p className="text-white/70 text-sm mt-2">Please allow camera access when prompted</p>
      </motion.div>
    );
  }

  // Error state
  if (hasPermission === false || error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-500/50 text-center"
      >
        <div className="text-6xl mb-4">❌</div>
        <p className="text-white text-xl font-bold mb-2">Camera Access Error</p>
        <p className="text-white/90 mb-4">{error || "Could not access camera"}</p>
        {!isSecureContext && (
          <p className="text-yellow-300 text-sm mb-4">
            ⚠️ Camera requires HTTPS connection. Please access via https://
          </p>
        )}
        <button
          onClick={startCamera}
          className="px-6 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition"
        >
          🔄 Try Again
        </button>
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
        {/* Hidden video element - must exist for stream */}
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
          className="w-full h-auto block"
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
              📸 Photo {Math.floor((4 - countdown) / 3) + 1} of 4
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
        disabled={countdown > 0 || isCapturing || !stream}
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
