import type { Metadata } from "next";
import HolidayBackground from "@/components/HolidayBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metro Holiday Store",
  description: "A Metro Printed Products holiday demo store. Nothing is saved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-metro-green">
        <HolidayBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
