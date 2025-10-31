// Photo filter utilities for Christmas Photobooth

export interface FilterConfig {
  id: string;
  name: string;
  icon: string;
  category: "accessory" | "overlay" | "effect";
  position?: { x: number; y: number }; // Percentage-based positioning
  size?: { width: number; height: number }; // Percentage-based sizing
}

/**
 * Apply filters to canvas in real-time
 */
export function applyFiltersToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  enabledFilters: FilterConfig[]
): void {
  enabledFilters.forEach((filter) => {
    switch (filter.id) {
      case "santa-hat":
        drawSantaHat(ctx, width, height);
        break;
      case "reindeer":
        drawReindeerAccessories(ctx, width, height);
        break;
      case "tree-corner":
        drawChristmasTreeCorner(ctx, width, height);
        break;
      case "snowflakes":
        drawSnowflakes(ctx, width, height);
        break;
      case "gift-frame":
        drawGiftFrame(ctx, width, height);
        break;
      case "scarf":
        drawScarf(ctx, width, height);
        break;
      case "bell-border":
        drawBellBorder(ctx, width, height);
        break;
      case "lights":
        drawLightGarland(ctx, width, height);
        break;
      case "gingerbread":
        drawGingerbreadPattern(ctx, width, height);
        break;
      case "sparkle":
        drawSparkles(ctx, width, height);
        break;
    }
  });
}

/**
 * Draw Santa Hat at the top
 */
function drawSantaHat(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const hatWidth = width * 0.3;
  const hatHeight = height * 0.25;
  const centerX = width / 2;
  const topY = height * 0.05;

  // Hat body (red)
  ctx.fillStyle = "#C41E3A";
  ctx.beginPath();
  ctx.moveTo(centerX, topY);
  ctx.lineTo(centerX - hatWidth / 2, topY + hatHeight * 0.7);
  ctx.quadraticCurveTo(centerX, topY + hatHeight * 0.65, centerX + hatWidth / 2, topY + hatHeight * 0.7);
  ctx.closePath();
  ctx.fill();

  // White trim
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.ellipse(centerX, topY + hatHeight * 0.7, hatWidth / 2, hatHeight * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pom-pom
  ctx.beginPath();
  ctx.arc(centerX, topY, hatHeight * 0.12, 0, Math.PI * 2);
  ctx.fill();

  // Add emoji for extra flair
  ctx.font = `${hatHeight * 0.8}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("🎅", centerX, topY + hatHeight * 0.5);
}

/**
 * Draw Reindeer Ears and Nose
 */
function drawReindeerAccessories(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const centerX = width / 2;
  const earY = height * 0.15;
  const noseY = height * 0.5;

  // Ears (antlers)
  ctx.font = `${width * 0.15}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("🦌", centerX - width * 0.12, earY);
  ctx.fillText("🦌", centerX + width * 0.12, earY);

  // Red nose
  ctx.fillStyle = "#FF0000";
  ctx.shadowColor = "#FF0000";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(centerX, noseY, width * 0.03, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

/**
 * Draw Christmas Tree in corner
 */
function drawChristmasTreeCorner(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.font = `${width * 0.12}px Arial`;
  ctx.textAlign = "left";
  ctx.fillText("🎄", width * 0.02, height * 0.15);
  ctx.textAlign = "right";
  ctx.fillText("🎄", width * 0.98, height * 0.15);
}

/**
 * Draw Snowflakes overlay
 */
function drawSnowflakes(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.font = `${width * 0.05}px Arial`;
  
  const positions = [
    { x: 0.1, y: 0.1 },
    { x: 0.2, y: 0.3 },
    { x: 0.8, y: 0.2 },
    { x: 0.9, y: 0.4 },
    { x: 0.15, y: 0.7 },
    { x: 0.85, y: 0.8 },
    { x: 0.5, y: 0.15 },
    { x: 0.3, y: 0.85 },
  ];

  positions.forEach(pos => {
    ctx.textAlign = "center";
    ctx.fillText("❄️", width * pos.x, height * pos.y);
  });
}

/**
 * Draw Gift Box Frame
 */
function drawGiftFrame(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const giftSize = width * 0.08;
  
  // Top left
  ctx.font = `${giftSize}px Arial`;
  ctx.textAlign = "left";
  ctx.fillText("🎁", width * 0.05, giftSize * 1.2);
  
  // Top right
  ctx.textAlign = "right";
  ctx.fillText("🎁", width * 0.95, giftSize * 1.2);
  
  // Bottom left
  ctx.textAlign = "left";
  ctx.fillText("🎁", width * 0.05, height - giftSize * 0.2);
  
  // Bottom right
  ctx.textAlign = "right";
  ctx.fillText("🎁", width * 0.95, height - giftSize * 0.2);
}

/**
 * Draw Scarf accessory
 */
function drawScarf(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const centerX = width / 2;
  const scarfY = height * 0.65;
  const scarfWidth = width * 0.4;
  const scarfHeight = height * 0.08;

  // Scarf body (red with white stripes)
  ctx.fillStyle = "#C41E3A";
  ctx.fillRect(centerX - scarfWidth / 2, scarfY, scarfWidth, scarfHeight);

  // White stripes
  ctx.fillStyle = "#FFFFFF";
  for (let i = 0; i < 5; i++) {
    const x = centerX - scarfWidth / 2 + (i * scarfWidth / 4);
    ctx.fillRect(x, scarfY, scarfWidth / 20, scarfHeight);
  }

  // Fringes
  ctx.fillStyle = "#C41E3A";
  for (let i = 0; i < 8; i++) {
    const x = centerX - scarfWidth / 2 - width * 0.08 + (i * width * 0.015);
    ctx.fillRect(x, scarfY + scarfHeight, width * 0.01, scarfHeight * 0.6);
  }
}

/**
 * Draw Bell Border at top
 */
function drawBellBorder(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.font = `${width * 0.06}px Arial`;
  ctx.textAlign = "center";
  
  for (let i = 0; i < 5; i++) {
    const x = (width / 6) * (i + 1);
    ctx.fillText("🔔", x, height * 0.08);
  }
}

/**
 * Draw Light Garland with animation effect
 */
function drawLightGarland(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
  const lightSize = width * 0.02;
  
  // Top garland
  for (let i = 0; i < 10; i++) {
    const x = (width / 11) * (i + 1);
    const y = height * 0.05 + Math.sin(i) * height * 0.02;
    const color = colors[i % colors.length];
    
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(x, y, lightSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.shadowBlur = 0;
}

/**
 * Draw Gingerbread Pattern in background
 */
function drawGingerbreadPattern(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.globalAlpha = 0.15;
  ctx.font = `${width * 0.08}px Arial`;
  
  const positions = [
    { x: 0.15, y: 0.25 },
    { x: 0.85, y: 0.3 },
    { x: 0.2, y: 0.75 },
    { x: 0.8, y: 0.7 },
  ];

  positions.forEach(pos => {
    ctx.textAlign = "center";
    ctx.fillText("🍪", width * pos.x, height * pos.y);
  });
  
  ctx.globalAlpha = 1;
}

/**
 * Draw Sparkling Glow Effect
 */
function drawSparkles(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.font = `${width * 0.04}px Arial`;
  
  // Random sparkle positions
  const sparkleCount = 15;
  for (let i = 0; i < sparkleCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 0.03 + 0.02;
    
    ctx.font = `${width * size}px Arial`;
    ctx.textAlign = "center";
    
    // Add glow
    ctx.shadowColor = "#FFFFFF";
    ctx.shadowBlur = 10;
    ctx.fillText("✨", x, y);
  }
  
  ctx.shadowBlur = 0;
}

/**
 * Combine multiple images for collage layout
 */
export function combineImagesForCollage(
  images: string[],
  callback: (combined: string[]) => void
): void {
  if (images.length >= 4) {
    callback(images.slice(0, 4));
  } else {
    // Duplicate images to fill 4 slots
    const filled = [...images];
    while (filled.length < 4) {
      filled.push(images[filled.length % images.length]);
    }
    callback(filled);
  }
}

/**
 * Apply color effect to image data URL
 */
export function applyColorEffect(
  imageDataUrl: string,
  effect: "warm" | "cool" | "grayscale" | "bright",
  callback: (result: string) => void
): void {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    callback(imageDataUrl);
    return;
  }

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      switch (effect) {
        case "warm":
          r = Math.min(255, r * 1.15);
          g = Math.min(255, g * 1.05);
          b = Math.min(255, b * 0.9);
          break;
        case "cool":
          r = Math.min(255, r * 0.9);
          g = Math.min(255, g * 0.95);
          b = Math.min(255, b * 1.15);
          break;
        case "grayscale":
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          r = g = b = gray;
          break;
        case "bright":
          r = Math.min(255, r * 1.2);
          g = Math.min(255, g * 1.2);
          b = Math.min(255, b * 1.2);
          break;
      }

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }

    ctx.putImageData(imageData, 0, 0);
    callback(canvas.toDataURL("image/png"));
  };

  img.src = imageDataUrl;
}
