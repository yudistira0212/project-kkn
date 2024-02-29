import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";

// import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kampung Siwi",
  description: "Kampung Siwi",
  icons: {
    icon: "https://firebasestorage.googleapis.com/v0/b/kampung-siwi.appspot.com/o/logo%2F640px-Lambang_Kabupaten_Manokwari_Selatan.png?alt=media&token=c821a500-d955-4020-96af-069d5e12c863",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
