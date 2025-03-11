import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//components
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tea Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#dbd4a5'}}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

//put components that apply to all pages (headers, footers, nav bar etc.)