'use client'

import { useState } from "react";
import MatrixRain from "./components/MatrixBackground";
import Terminal from "./components/Terminal";
import LoadingScreen from "./components/terminal/LoadingScreen";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (<LoadingScreen onComplete={() => setIsLoading(false)} />);
  }

  return (
    <>
      <div className="matrixRoot">
        <MatrixRain />
      </div>
      <div className="appRoot">
        <Terminal />
      </div>
    </>
  );
}
