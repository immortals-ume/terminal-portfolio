import "./globals.css";
import React from 'react';

export const metadata = {
    title: "Kapil Srivastava - Software Development Engineer | Terminal Portfolio",
    description: "Interactive terminal-style portfolio of Kapil Srivastava, Software Development Engineer at Lenskart. 4.6 years experience in Java, Spring Boot, React, AWS, and microservices.",
    keywords: "Kapil Srivastava, Software Engineer, Java Developer, Spring Boot, React, AWS, Microservices, Full Stack Developer, Lenskart, Portfolio",
    authors: [{name: "Kapil Srivastava", url: "https://kapilsrivastava.dev"}],
    creator: "Kapil Srivastava",
    publisher: "Kapil Srivastava",
    robots: "index, follow",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://kapilsrivastava.dev",
        title: "Kapil Srivastava - Software Development Engineer",
        description: "Interactive terminal-style portfolio showcasing 4.6 years of software development experience in Java, Spring Boot, React, and cloud technologies.",
        siteName: "Kapil Srivastava Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kapil Srivastava - Software Development Engineer",
        description: "Interactive terminal-style portfolio showcasing software development skills",
        creator: "@kapilsrivastava",
    },
    alternates: {
        canonical: "https://kapilsrivastava.dev",
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            {/* PWA Meta Tags */}
            <link rel="manifest" href="/manifest.json"/>
            <meta name="theme-color" content="#00ff9c"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
            <meta name="apple-mobile-web-app-title" content="Kapil Portfolio"/>

            {/* Performance Hints */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="dns-prefetch" href="https://github.com"/>
            <link rel="dns-prefetch" href="https://linkedin.com"/>

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <link rel="icon" href="/icon.svg" type="image/svg+xml"/>
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
        </head>
        <body suppressHydrationWarning={true}>
        {process.env.NODE_ENV === 'development' ? (
            children
        ) : (
            <React.StrictMode>
                {children}
            </React.StrictMode>
        )}
        </body>
        </html>
    );
}
