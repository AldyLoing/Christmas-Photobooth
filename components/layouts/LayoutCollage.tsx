"use client";

import { useEffect, useRef } from "react";

interface LayoutCollageProps {
  imageDatas: string[]; // Array of 4 images
  onRenderComplete: (dataUrl: string) => void;
}

export default function LayoutCollage({ imageDatas, onRenderComplete }: LayoutCollageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageDatas || imageDatas.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Wait for all images to load
    const images = imageDatas.map(data => {
      const img = new Image();
      img.src = data;
      return img;
    });

    Promise.all(
      images.map(img => new Promise((resolve) => {
        if (img.complete) {
          resolve(true);
        } else {
          img.onload = () => resolve(true);
        }
      }))
    ).then(() => {
      // Canvas dimensions for 2x2 grid
      const gridSize = 2;
      const photoSize = 600;
      const gap = 20;
      const margin = 60;
      const canvasSize = (photoSize * gridSize) + (gap * (gridSize - 1)) + (margin * 2);

      canvas.width = canvasSize;
      canvas.height = canvasSize;

      // Snowy background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasSize);
      gradient.addColorStop(0, "#E8F4F8");
      gradient.addColorStop(1, "#B8D8E8");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Draw snowflakes on background
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvasSize;
        const y = Math.random() * canvasSize;
        const size = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw photos in 2x2 grid
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const index = row * gridSize + col;
          const img = images[index % images.length]; // Repeat image if less than 4

          const x = margin + (col * (photoSize + gap));
          const y = margin + (row * (photoSize + gap));

          // White border around each photo
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 5;
          ctx.fillRect(x - 10, y - 10, photoSize + 20, photoSize + 20);

          // Reset shadow
          ctx.shadowColor = "transparent";

          // Draw photo
          const aspectRatio = img.width / img.height;
          let drawWidth = photoSize;
          let drawHeight = photoSize / aspectRatio;

          if (drawHeight > photoSize) {
            drawHeight = photoSize;
            drawWidth = photoSize * aspectRatio;
          }

          const photoX = x + (photoSize - drawWidth) / 2;
          const photoY = y + (photoSize - drawHeight) / 2;

          ctx.drawImage(img, photoX, photoY, drawWidth, drawHeight);

          // Small number label on each photo
          ctx.font = "bold 24px Arial";
          ctx.fillStyle = "#FFFFFF";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 3;
          ctx.textAlign = "left";
          ctx.strokeText(`${index + 1}`, x + 15, y + 35);
          ctx.fillText(`${index + 1}`, x + 15, y + 35);
        }
      }

      // Christmas decoration banner at bottom
      ctx.fillStyle = "rgba(196, 30, 58, 0.9)";
      ctx.fillRect(0, canvasSize - 80, canvasSize, 80);

      ctx.font = "bold 32px Arial";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 5;
      ctx.fillText("🎄 Christmas Memories 2025 🎄", canvasSize / 2, canvasSize - 40);

      onRenderComplete(canvas.toDataURL("image/png"));
    });
  }, [imageDatas, onRenderComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="hidden"
    />
  );
}
