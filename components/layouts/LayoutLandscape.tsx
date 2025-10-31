"use client";

import { useEffect, useRef } from "react";

interface LayoutLandscapeProps {
  imageData: string;
  onRenderComplete: (dataUrl: string) => void;
}

export default function LayoutLandscape({ imageData, onRenderComplete }: LayoutLandscapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Landscape dimensions
      const canvasWidth = 1920;
      const canvasHeight = 1080;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Winter sky gradient background
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      skyGradient.addColorStop(0, "#1e3a5f"); // Dark blue top
      skyGradient.addColorStop(0.5, "#4a6fa5"); // Medium blue
      skyGradient.addColorStop(1, "#b8d8e8"); // Light blue bottom (snow)
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Stars in the sky
      ctx.fillStyle = "#FFFFFF";
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * (canvasHeight * 0.4);
        const size = Math.random() * 2 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Snow ground
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(0, canvasHeight * 0.7);
      ctx.quadraticCurveTo(canvasWidth * 0.25, canvasHeight * 0.65, canvasWidth * 0.5, canvasHeight * 0.7);
      ctx.quadraticCurveTo(canvasWidth * 0.75, canvasHeight * 0.75, canvasWidth, canvasHeight * 0.7);
      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.lineTo(0, canvasHeight);
      ctx.closePath();
      ctx.fill();

      // Photo area (centered)
      const photoWidth = 800;
      const photoHeight = 600;
      const photoX = (canvasWidth - photoWidth) / 2;
      const photoY = (canvasHeight - photoHeight) / 2 - 50;

      // White photo border with shadow
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;
      ctx.fillRect(photoX - 20, photoY - 20, photoWidth + 40, photoHeight + 40);

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // Draw photo
      const aspectRatio = img.width / img.height;
      let drawWidth = photoWidth;
      let drawHeight = photoWidth / aspectRatio;

      if (drawHeight > photoHeight) {
        drawHeight = photoHeight;
        drawWidth = photoHeight * aspectRatio;
      }

      const finalPhotoX = photoX + (photoWidth - drawWidth) / 2;
      const finalPhotoY = photoY + (photoHeight - drawHeight) / 2;

      ctx.drawImage(img, finalPhotoX, finalPhotoY, drawWidth, drawHeight);

      // Draw Christmas trees on sides
      const drawChristmasTree = (x: number, y: number, size: number) => {
        // Tree (green triangles)
        ctx.fillStyle = "#0f5132";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - size * 0.6, y + size * 0.4);
        ctx.lineTo(x + size * 0.6, y + size * 0.4);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.2);
        ctx.lineTo(x - size * 0.5, y + size * 0.65);
        ctx.lineTo(x + size * 0.5, y + size * 0.65);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.45);
        ctx.lineTo(x - size * 0.4, y + size * 0.9);
        ctx.lineTo(x + size * 0.4, y + size * 0.9);
        ctx.closePath();
        ctx.fill();

        // Trunk
        ctx.fillStyle = "#654321";
        ctx.fillRect(x - size * 0.1, y + size * 0.9, size * 0.2, size * 0.2);

        // Star on top
        ctx.fillStyle = "#FFD700";
        ctx.font = `${size * 0.3}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("⭐", x, y + size * 0.1);

        // Ornaments
        const ornamentY = [y + size * 0.4, y + size * 0.6, y + size * 0.75];
        ["🔴", "🔵", "⚪"].forEach((ornament, idx) => {
          ctx.font = `${size * 0.15}px Arial`;
          ctx.fillText(ornament, x + (Math.random() - 0.5) * size * 0.5, ornamentY[idx]);
        });
      };

      // Left tree
      drawChristmasTree(150, canvasHeight * 0.5, 200);
      // Right tree
      drawChristmasTree(canvasWidth - 150, canvasHeight * 0.5, 200);

      // Gift boxes at bottom
      const drawGift = (x: number, y: number, size: number, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = "#FFD700";
        ctx.fillRect(x + size * 0.4, y, size * 0.2, size);
        ctx.fillRect(x, y + size * 0.4, size, size * 0.2);
        ctx.fillStyle = "#FFD700";
        ctx.font = `${size * 0.4}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("🎀", x + size / 2, y + size * 0.3);
      };

      drawGift(photoX - 100, canvasHeight * 0.75, 60, "#C41E3A");
      drawGift(photoX - 30, canvasHeight * 0.78, 50, "#165B33");
      drawGift(photoX + photoWidth + 40, canvasHeight * 0.75, 60, "#165B33");
      drawGift(photoX + photoWidth + 110, canvasHeight * 0.78, 50, "#C41E3A");

      // String lights across the top
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 80);
      for (let i = 0; i <= canvasWidth; i += 100) {
        ctx.quadraticCurveTo(i + 50, 100, i + 100, 80);
      }
      ctx.stroke();

      // Light bulbs
      const lightColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
      ctx.font = "30px Arial";
      for (let i = 0; i <= canvasWidth; i += 100) {
        const color = lightColors[Math.floor(i / 100) % lightColors.length];
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(i, 80, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(i, 80, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Title banner
      ctx.fillStyle = "rgba(196, 30, 58, 0.85)";
      ctx.fillRect(0, canvasHeight - 120, canvasWidth, 120);

      ctx.font = "bold 48px Arial";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 8;
      ctx.fillText("🎄 Merry Christmas 2025 🎄", canvasWidth / 2, canvasHeight - 60);

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
