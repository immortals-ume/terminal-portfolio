'use client'

import React, { useEffect, useState } from 'react';

interface SystemInitializerProps {
  onComplete: () => void;
}

interface InitStep {
  message: string;
  delay: number;
  status?: 'loading' | 'success' | 'error';
}


const initSequence: InitStep[] = [
  { message: "MATRIX TERMINAL PORTFOLIO v2.1.0", delay: 200 },
  { message: "Copyright (c) 2024 Kapil Srivastava. All rights reserved.", delay: 300 },
  { message: "Initializing system components...", delay: 400 },
  { message: "Loading system modules:", delay: 300 },
  { message: "├── React Engine v19.1.0 ................... [OK]", delay: 200 },
  { message: "├── Next.js Framework v15.5.0 .............. [OK]", delay: 200 },
  { message: "├── TypeScript Compiler v5.x ............... [OK]", delay: 200 },
  { message: "├── Tailwind CSS Engine .................... [OK]", delay: 200 },
  { message: "├── GitHub API Integration .................. [OK]", delay: 200 },
  { message: "├── Command Parser Engine ................... [OK]", delay: 200 },
  { message: "├── Matrix Rain Generator ................... [OK]", delay: 200 },
  { message: "├── Portfolio Data Loader ................... [OK]", delay: 200 },
  { message: "├── Terminal Interface ...................... [OK]", delay: 200 },
  { message: "└── Security & Performance Monitor .......... [OK]", delay: 200 },
  { message: "Establishing secure connection...", delay: 300 },
  { message: "Authenticating user session...", delay: 300 },
  { message: "Loading profile: Kapil Srivastava (SDE-1)", delay: 300 },
  { message: "Profile authenticated successfully.", delay: 250 },
  { message: "", delay: 100 },
  { message: "🚀 SYSTEM READY", delay: 200 },
  { message: "Welcome to the Matrix Terminal Portfolio!", delay: 200 },
  { message: "Type 'home' to begin or 'help' for available commands.", delay: 200 },
  { message: "", delay: 300 },
  { message: "Terminal is ready for input.", delay: 400 },
];

export default function SystemInitializer({ onComplete }: SystemInitializerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {

    if (currentStep >= initSequence.length) {
      onComplete();
      return;
    }

    const step = initSequence[currentStep];
    if (!step) {
      console.error('Step is undefined at index:', currentStep);
      return;
    }

    const timer = setTimeout(() => {
      try {
        if (step.message) {
          setIsTyping(true);
          typeMessage(step.message, () => {
            setIsTyping(false);
            setCurrentStep(prev => prev + 1);
          });
        } else {
          setDisplayedMessages(prev => [...prev, ""]);
          setCurrentStep(prev => prev + 1);
        }
      } catch (error) {
        console.error('Error in typeMessage:', error);
        setCurrentStep(prev => prev + 1);
      }
    }, step.delay || 100);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const typeMessage = (message: string, onComplete: () => void) => {
    const safeMessage = message || '';
    setDisplayedMessages(prev => [...prev, safeMessage]);
    setTimeout(onComplete, 50);
  };

  return (
    <div className="font-mono text-green-400 text-sm leading-relaxed">
      {displayedMessages.map((message, index) => {
        const safeMessage = message || '';

        return (
          <div
            key={index}
            className={`min-h-[1.5rem] ${safeMessage.includes('[OK]') ? 'text-green-300' :
              safeMessage.includes('SYSTEM READY') ? 'text-green-200 font-bold animate-pulse' :
                safeMessage.includes('Welcome') ? 'text-green-300' :
                  safeMessage.includes('Terminal is ready') ? 'text-green-200 font-semibold' :
                    safeMessage.includes('Type \'help\'') || safeMessage.includes('Type \'home\'') ? 'text-green-300' :
                      safeMessage.includes('Copyright') ? 'text-green-600 text-xs' :
                        safeMessage.includes('MATRIX TERMINAL') ? 'text-green-200 font-bold text-base' :
                          'text-green-400'
              }`}
            style={{
              textShadow: safeMessage.includes('SYSTEM READY') || safeMessage.includes('Terminal is ready') ? '0 0 10px rgba(0, 255, 156, 0.8)' : 'none'
            }}
          >
            {safeMessage}
            {index === displayedMessages.length - 1 && isTyping && (
              <span className="animate-pulse text-green-300">█</span>
            )}
          </div>
        );
      })}
    </div>
  );
}