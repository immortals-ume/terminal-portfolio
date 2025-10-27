'use client'

import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    const loadingMessages = [
        'Initializing Matrix Terminal...',
        'Loading system components...',
        'Establishing connection...',
        'System ready!'
    ];

    useEffect(() => {
        const duration = 1500;
        const interval = 100;
        const steps = duration / interval;
        const progressStep = 100 / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min(currentStep * progressStep, 100);
            setProgress(newProgress);

            const newMessageIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1));
            setMessageIndex(newMessageIndex);

            if (newProgress >= 100) {
                clearInterval(timer);
                setTimeout(onComplete, 200);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="text-center space-y-6">
                <div className="text-green-400 font-mono text-3xl font-bold">
                    <div className="mb-2">{'>'}_PORTFOLIO</div>
                    <div className="text-sm text-green-600">Matrix Terminal v2.1.0</div>
                </div>

                <div className="w-64 mx-auto">
                    <div className="bg-gray-800 rounded-full h-1 mb-3">
                        <div
                            className="bg-green-400 h-1 rounded-full transition-all duration-200 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="text-green-400 font-mono text-xs">
                        {loadingMessages[messageIndex]}
                    </div>

                    <div className="text-green-600 font-mono text-xs mt-1 opacity-60">
                        {Math.round(progress)}%
                    </div>
                </div>

                <div className="flex justify-center space-x-1">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 bg-green-400 rounded-full transition-opacity duration-300 
                                ${Math.floor(progress / 33) % 3 === i ? 'opacity-100' : 'opacity-30'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}