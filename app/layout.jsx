import { Domine } from "next/font/google";
import "./globals.css";

const domine = Domine({
  variable: "--font-domine",
  weight: ['400'],
  subsets: ["latin"],
});

export const metadata = {
  title: "Ace Teas",
  icons: {
    icon: "tea-icon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={domine.variable}>
      <body>
        {children}
        <footer className="site-footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Ace Teas. All rights reserved.</p>
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          </div>
        </footer>

      </body>
    </html>
  );
}

//put components that apply to all pages (headers, footers, nav bar etc.)