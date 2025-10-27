import "./globals.css";

export const metadata = {
  title: "My Terminal Portfolio",
  description: "Hacker-themed interactive terminal portfolio",
};

import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
