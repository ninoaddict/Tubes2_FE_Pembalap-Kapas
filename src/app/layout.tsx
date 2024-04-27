import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./components/top-nav";
import { ParticleContainer } from "./components/particle-containers";

export const metadata: Metadata = {
  title: "Wiki Race",
  description: "Wikipedia race with IDS and BFS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-br from-slate-800 to-gray-900 font-linux-libertine`}
      >
        {/* Background */}
        <div className="absolute top-0 left-0">
          <ParticleContainer />
        </div>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
