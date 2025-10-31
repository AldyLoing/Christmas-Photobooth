"use client";

import { useEffect, useRef } from "react";

interface LayoutClassicProps {
  imageData: string;
  onRenderComplete: (dataUrl: string) => void;
}

export default function LayoutClassic({ imageData, onRenderComplete }: LayoutClassicProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size (portrait orientation)
      const frameWidth = 1200;
      const frameHeight = 1600;
      canvas.width = frameWidth;
      canvas.height = frameHeight;

      // Background (white/cream)
      ctx.fillStyle = "#F5F5DC";
      ctx.fillRect(0, 0, frameWidth, frameHeight);

      // Outer Christmas frame (red-green gradient border)
      const borderWidth = 60;
      const gradient = ctx.createLinearGradient(0, 0, frameWidth, frameHeight);
      gradient.addColorStop(0, "#C41E3A"); // Christmas red
      gradient.addColorStop(0.5, "#165B33"); // Christmas green
      gradient.addColorStop(1, "#C41E3A");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, frameWidth, frameHeight);

      // Inner white border
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(borderWidth / 2, borderWidth / 2, frameWidth - borderWidth, frameHeight - borderWidth);

      // Photo area
      const photoMargin = borderWidth + 40;
      const photoWidth = frameWidth - (photoMargin * 2);
      const photoHeight = frameHeight - (photoMargin * 2) - 100; // Space for text

      // Draw photo (maintain aspect ratio)
      const aspectRatio = img.width / img.height;
      let drawWidth = photoWidth;
      let drawHeight = photoWidth / aspectRatio;

      if (drawHeight > photoHeight) {
        drawHeight = photoHeight;
        drawWidth = photoHeight * aspectRatio;
      }

      const photoX = (frameWidth - drawWidth) / 2;
      const photoY = photoMargin + 20;

      ctx.drawImage(img, photoX, photoY, drawWidth, drawHeight);

      // Decorative corners (holly leaves & berries)
      const drawHolly = (x: number, y: number, flip: boolean = false) => {
        ctx.save();
        ctx.translate(x, y);
        if (flip) ctx.scale(-1, 1);
        
        // Holly leaves (simplified)
        ctx.fillStyle = "#165B33";
        ctx.beginPath();
        ctx.ellipse(0, 0, 25, 15, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(15, 10, 20, 12, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Berries
        ctx.fillStyle = "#C41E3A";
        ctx.beginPath();
        ctx.arc(10, 5, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(20, 15, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      };

      drawHolly(photoMargin + 20, photoMargin + 20);
      drawHolly(frameWidth - photoMargin - 20, photoMargin + 20, true);
      drawHolly(photoMargin + 20, photoMargin + photoHeight + 40, true);
      drawHolly(frameWidth - photoMargin - 20, photoMargin + photoHeight + 40);

      // Christmas text
      const textY = frameHeight - 70;
      
      ctx.font = "bold 48px Arial, sans-serif";
      ctx.fillStyle = "#C41E3A";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Merry Christmas 2025 🎄", frameWidth / 2, textY);

      // Subtle shadow effect for text
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Return the result
      onRenderComplete(canvas.toDataURL("image/png"));
    };

    img.src = imageData;
  }, [imageData, onRenderComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="hidden"
    />
  );
}
