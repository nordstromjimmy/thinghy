import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          defer
          data-domain="thinghy.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body>
        {children} <Toaster position="bottom-center" richColors closeButton />
      </body>
    </html>
  );
}
