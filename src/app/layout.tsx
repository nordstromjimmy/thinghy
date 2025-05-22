import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Thinghy - Your Searchable Brain",
  description:
    "Thinghy helps you remember all the little things, fixes, facts, purchases, and “how did I do that again?” moments — so you never have to solve the same problem twice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="thinghy.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
