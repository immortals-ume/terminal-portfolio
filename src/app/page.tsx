'use client'

import { useState, lazy, Suspense } from "react";
import dynamic from "next/dynamic";

import { ThemeProvider } from "./components/ThemeProvider";
import StructuredData from "./components/StructuredData";
import PerformanceMonitor from "./components/PerformanceMonitor";
import WebOptimizations from "./components/WebOptimizations";

const Terminal = dynamic(() => import("./components/Terminal"), {
  loading: () => <div>Loading terminal...</div>,
  ssr: false
});

const LoadingScreen = lazy(() => import("./components/terminal/LoadingScreen"));

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <StructuredData />
      <PerformanceMonitor />
      <WebOptimizations />
      {isLoading ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        </Suspense>
      ) : (
        <MainContent />
      )}
    </ThemeProvider>
  );
}

function MainContent() {
  return (
    <div className="appRoot">
      <Terminal />
    </div>
  );
}


