"use client";

import { useEffect, useRef } from "react";

interface LayoutPolaroidProps {
  imageData: string;
  onRenderComplete: (dataUrl: string) => void;
  customText?: string;
}

export default function LayoutPolaroid({ imageData, onRenderComplete, customText = "Happy Holidays!" }: LayoutPolaroidProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Polaroid dimensions (classic ratio)
      const polaroidWidth = 1000;
      const polaroidHeight = 1200;
      const borderSize = 60;
      const bottomSpace = 180; // Extra space at bottom for text

      canvas.width = polaroidWidth;
      canvas.height = polaroidHeight;

      // White background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, polaroidWidth, polaroidHeight);

      // Soft shadow effect
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;

      // Photo area dimensions
      const photoWidth = polaroidWidth - (borderSize * 2);
      const photoHeight = polaroidHeight - (borderSize * 2) - bottomSpace;

      // Draw photo
      const aspectRatio = img.width / img.height;
      let drawWidth = photoWidth;
      let drawHeight = photoWidth / aspectRatio;

      if (drawHeight > photoHeight) {
        drawHeight = photoHeight;
        drawWidth = photoHeight * aspectRatio;
      }

      const photoX = (polaroidWidth - drawWidth) / 2;
      const photoY = borderSize;

      ctx.drawImage(img, photoX, photoY, drawWidth, drawHeight);

      // Reset shadow for text area
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // Bottom text area with subtle texture
      const textAreaY = borderSize + photoHeight;
      ctx.fillStyle = "#F8F8F8";
      ctx.fillRect(borderSize, textAreaY, photoWidth, bottomSpace);

      // Custom text (handwriting style)
      ctx.font = "italic 36px 'Segoe Script', cursive, Arial";
      ctx.fillStyle = "#333333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(customText, polaroidWidth / 2, textAreaY + bottomSpace / 2);

      // Small decorative snowflakes
      ctx.font = "24px Arial";
      ctx.fillText("❄️", borderSize + 40, textAreaY + 40);
      ctx.fillText("❄️", polaroidWidth - borderSize - 40, textAreaY + 40);
      ctx.fillText("🎄", polaroidWidth / 2, textAreaY + bottomSpace - 40);

      // Vintage tape effect at top
      ctx.fillStyle = "rgba(220, 220, 200, 0.6)";
      ctx.fillRect(polaroidWidth / 2 - 80, -5, 160, 50);
      ctx.strokeStyle = "rgba(180, 180, 160, 0.3)";
      ctx.lineWidth = 2;
      ctx.strokeRect(polaroidWidth / 2 - 80, -5, 160, 50);

      onRenderComplete(canvas.toDataURL("image/png"));
    };

    img.src = imageData;
  }, [imageData, customText, onRenderComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="hidden"
    />
  );
}
