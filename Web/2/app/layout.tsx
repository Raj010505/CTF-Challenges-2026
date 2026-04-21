import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MineGate Auth",
  description: "Minecraft-inspired CTF login gateway",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
