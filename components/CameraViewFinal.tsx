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

export default function CameraViewFinal({ filters, selectedLayout, onCapture }: CameraViewProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamInitialized = useRef(false);
  const pendingStreamRef = useRef<MediaStream | null>(null);

  // Add debug log
  const addDebugLog = (message: string) => {
    console.log(`[Camera Debug] ${message}`);
    setDebugInfo(prev => [...prev.slice(-10), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Initial environment check
  useEffect(() => {
    const checkEnvironment = () => {
      const logs = [
        `🌐 Protocol: ${window.location.protocol}`,
        `🔒 Secure Context: ${window.isSecureContext}`,
        `📱 User Agent: ${navigator.userAgent.substring(0, 50)}...`,
        `📹 mediaDevices available: ${!!navigator.mediaDevices}`,
        `🎥 getUserMedia available: ${!!navigator.mediaDevices?.getUserMedia}`,
      ];
      
      logs.forEach(log => addDebugLog(log));

      // Check permission state if available
      if ('permissions' in navigator) {
        navigator.permissions.query({ name: 'camera' as PermissionName })
          .then(result => {
            addDebugLog(`🎯 Camera permission state: ${result.state}`);
            result.addEventListener('change', () => {
              addDebugLog(`🔄 Permission changed to: ${result.state}`);
            });
          })
          .catch(err => {
            addDebugLog(`⚠️ Cannot query permission: ${err.message}`);
          });
      }
    };

    checkEnvironment();
  }, []);

  // CRITICAL: Camera initialization MUST be triggered by user gesture
  // This function should ONLY be called from button click
  const initializeCamera = useCallback(async () => {
    if (streamInitialized.current) {
      addDebugLog("⏭️ Camera already initialized");
      return;
    }

    setIsInitializing(true);
    addDebugLog("🎬 Starting camera initialization (user-triggered)");
    
    try {
      // Validate environment
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia API not available in this browser");
      }

      if (!window.isSecureContext) {
        throw new Error("Not a secure context (HTTPS required)");
      }

      addDebugLog("✅ Environment validation passed");

      // Enumerate devices first
      addDebugLog("📋 Enumerating devices...");
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      
      addDebugLog(`📹 Found ${videoDevices.length} camera(s):`);
      videoDevices.forEach((device, idx) => {
        addDebugLog(`  ${idx + 1}. ${device.label || 'Camera ' + (idx + 1)} (${device.deviceId.substring(0, 10)}...)`);
      });

      if (videoDevices.length === 0) {
        throw new Error("No camera devices found");
      }

      // Request with progressive constraints
      addDebugLog("🎯 Requesting camera access...");
      
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        },
        audio: false,
      };

      addDebugLog(`📝 Constraints: ${JSON.stringify(constraints.video)}`);

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      addDebugLog("✅ Camera access granted!");
      
      // Get stream info
      const videoTrack = mediaStream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();
      addDebugLog(`📊 Stream settings: ${settings.width}x${settings.height} @ ${settings.frameRate}fps`);
      addDebugLog(`📷 Device: ${videoTrack.label}`);

      // Store stream temporarily and trigger render
      pendingStreamRef.current = mediaStream;
      setHasPermission(true); // This will render the video element
      addDebugLog("🔄 Video element will be rendered, waiting for ref...");
      
      // Don't set stream yet - wait for useEffect to handle it
      streamInitialized.current = true;
      setIsInitializing(false);

    } catch (err) {
      setIsInitializing(false);
      addDebugLog(`❌ Camera initialization failed: ${err}`);
      setHasPermission(false);
      streamInitialized.current = false;
      
      if (err instanceof Error) {
        let userMessage = "Camera initialization failed";
        
        // Detailed error categorization
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          userMessage = "Camera permission denied. Please click 'Allow' when prompted.";
          addDebugLog("⛔ Permission explicitly denied by user");
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          userMessage = "No camera found. Please connect a camera.";
          addDebugLog("📵 No camera device available");
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          userMessage = "Camera is in use by another application.";
          addDebugLog("🔒 Camera hardware is busy");
        } else if (err.name === 'OverconstrainedError') {
          userMessage = "Camera doesn't meet the requirements.";
          addDebugLog("⚙️ Constraints not satisfied");
        } else if (err.name === 'SecurityError') {
          userMessage = "Security error. Make sure you're on HTTPS.";
          addDebugLog("🔐 Security context issue");
        } else if (err.name === 'AbortError') {
          userMessage = "Camera request was cancelled.";
          addDebugLog("🚫 Request aborted");
        } else {
          userMessage = `Error: ${err.message}`;
          addDebugLog(`🐛 Unexpected error: ${err.name} - ${err.message}`);
        }
        
        setError(userMessage);
      }
    }
  }, []);

  // Handle stream attachment after video element is rendered
  useEffect(() => {
    if (!pendingStreamRef.current || !videoRef.current || stream) return;

    const attachStream = async () => {
      const mediaStream = pendingStreamRef.current!;
      const video = videoRef.current!;

      addDebugLog("🔗 Attaching pending stream to video element...");
      
      video.srcObject = mediaStream;

      try {
        // Wait for video to be ready
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Video load timeout after 10 seconds"));
          }, 10000);

          const onLoadedMetadata = () => {
            clearTimeout(timeout);
            addDebugLog(`📐 Video metadata loaded: ${video.videoWidth}x${video.videoHeight}`);
            addDebugLog(`🎬 Ready state: ${video.readyState}`);
            
            video.play()
              .then(() => {
                addDebugLog("▶️ Video playing successfully");
                resolve();
              })
              .catch(err => {
                addDebugLog(`❌ Play failed: ${err.message}`);
                reject(err);
              });
          };

          const onError = (e: Event) => {
            clearTimeout(timeout);
            const errorMsg = video.error ? video.error.message : "Unknown video error";
            addDebugLog(`❌ Video error: ${errorMsg}`);
            reject(new Error(errorMsg));
          };

          video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
          video.addEventListener('error', onError, { once: true });

          // Fallback: if video is already ready
          if (video.readyState >= 2) {
            clearTimeout(timeout);
            onLoadedMetadata();
          }
        });

        setStream(mediaStream);
        setError(null);
        pendingStreamRef.current = null;
        addDebugLog("🎉 Camera initialization complete!");

      } catch (err) {
        addDebugLog(`❌ Stream attachment failed: ${err}`);
        setError("Failed to display camera preview");
        setHasPermission(false);
        streamInitialized.current = false;
        
        // Clean up the stream
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
        }
        pendingStreamRef.current = null;
      }
    };

    attachStream();
  }, [hasPermission, stream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
          addDebugLog("🛑 Camera track stopped (cleanup)");
        });
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [stream]);

  // Real-time preview rendering
  useEffect(() => {
    if (!videoRef.current || !previewCanvasRef.current || !stream) return;

    const video = videoRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isActive = true;
    let frameCount = 0;

    const renderFrame = () => {
      if (!isActive) return;

      if (video.readyState >= video.HAVE_CURRENT_DATA && video.videoWidth > 0) {
        // Resize canvas if needed
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          addDebugLog(`🖼️ Canvas resized to ${canvas.width}x${canvas.height}`);
        }

        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Mirror horizontally
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

        frameCount++;
        if (frameCount % 60 === 0) {
          addDebugLog(`🎞️ Rendering frame ${frameCount}`);
        }
      }

      animationFrameRef.current = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      isActive = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [stream, filters]);

  const capturePhoto = () => {
    if (!stream) {
      addDebugLog("⚠️ Capture attempted but no stream available");
      return;
    }
    
    addDebugLog("📸 Capture initiated");
    
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
              addDebugLog(`📸 Collage photo ${count}/${total} captured`);
              
              if (count < total) {
                setTimeout(captureNext, 1500);
              } else {
                setIsCapturing(false);
                addDebugLog("✅ All collage photos captured");
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

    const imageData = canvas.toDataURL("image/png");
    addDebugLog(`📷 Photo captured (${(imageData.length / 1024).toFixed(0)} KB)`);
    
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

  // Initial state - waiting for user to click
  if (hasPermission === null && !error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-red-500/20 to-green-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
      >
        <div className="text-6xl mb-4">📷</div>
        <h3 className="text-white text-2xl font-bold mb-4">Ready to Start!</h3>
        <p className="text-white/90 mb-6">Click the button below to enable your camera</p>
        
        {/* CRITICAL: Camera MUST be initialized from user gesture */}
        <button
          onClick={initializeCamera}
          disabled={isInitializing}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isInitializing ? "🔄 Initializing..." : "🎥 Enable Camera"}
        </button>

        {debugInfo.length > 0 && (
          <details className="mt-6 text-left">
            <summary className="text-white/70 text-sm cursor-pointer hover:text-white">
              🔍 Debug Info ({debugInfo.length})
            </summary>
            <div className="mt-2 p-4 bg-black/30 rounded-lg text-xs text-white/60 font-mono max-h-40 overflow-y-auto">
              {debugInfo.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </details>
        )}
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
        <h3 className="text-white text-xl font-bold mb-2">Camera Error</h3>
        <p className="text-white/90 mb-6">{error || "Could not access camera"}</p>
        
        <button
          onClick={() => {
            setError(null);
            setHasPermission(null);
            streamInitialized.current = false;
          }}
          className="px-6 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition"
        >
          🔄 Try Again
        </button>

        <details className="mt-6 text-left">
          <summary className="text-white/70 text-sm cursor-pointer hover:text-white">
            🔍 Debug Logs
          </summary>
          <div className="mt-2 p-4 bg-black/50 rounded-lg text-xs text-white/80 font-mono max-h-60 overflow-y-auto">
            {debugInfo.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))}
          </div>
        </details>
      </motion.div>
    );
  }

  // Active camera view
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="hidden"
        />

        <canvas
          ref={previewCanvasRef}
          className="w-full h-auto block"
          style={{ maxHeight: "70vh" }}
        />

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

        {isCapturing && selectedLayout === "collage" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
          >
            <p className="text-gray-800 font-bold">
              📸 Collage Mode
            </p>
          </motion.div>
        )}

        {filters.filter(f => f.enabled).length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900 px-4 py-2 rounded-full shadow-lg font-bold text-sm"
          >
            ✨ {filters.filter(f => f.enabled).length} Filter(s)
          </motion.div>
        )}
      </motion.div>

      <canvas ref={canvasRef} className="hidden" />

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-white/70 text-sm"
      >
        {selectedLayout === "collage" && (
          <p>⚡ You&apos;ll take 4 separate photos</p>
        )}
        {selectedLayout !== "collage" && (
          <p>💡 Smile! Photo in 3 seconds</p>
        )}
      </motion.div>
    </div>
  );
}
