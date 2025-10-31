"use client";

import { useEffect } from "react";

export default function SnowfallEffect() {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.innerHTML = "❄";
      snowflake.style.left = Math.random() * 100 + "vw";
      snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
      snowflake.style.opacity = (Math.random() * 0.6 + 0.4).toString();
      snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
      
      document.getElementById("snowfall-container")?.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 5000);
    };

    const interval = setInterval(createSnowflake, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        id="snowfall-container"
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      />
      <style jsx global>{`
        .snowflake {
          position: fixed;
          top: -20px;
          color: white;
          user-select: none;
          pointer-events: none;
          animation: fall linear forwards;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) translateX(100px) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
