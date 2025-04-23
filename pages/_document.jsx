import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Ace Teas</title>
        <link rel="icon" href="/tea-icon.ico" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
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
    </Html>
  );
}