import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christmas Photobooth 🎄",
  description: "Take your festive photo anytime with Christmas filters!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
