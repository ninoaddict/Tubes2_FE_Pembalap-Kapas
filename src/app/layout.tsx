import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./components/ui/top-nav";

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
        <TopNav />
        {children}
      </body>
    </html>
  );
}
