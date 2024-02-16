import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./utils/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login with Socials",
  description: "A social Login app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen flex flex-col items-center justify-center">
          <Providers> {children}</Providers>
        </main>
      </body>
    </html>
  );
}
