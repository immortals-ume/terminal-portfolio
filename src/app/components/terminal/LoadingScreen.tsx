'use client'

import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    useTheme(); 

    const loadingMessages = [
        'Loading portfolio...',
        'Preparing interface...',
        'Almost ready...',
        'Welcome!'
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
        <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ 
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)'
            }}
        >
            <div className="text-center space-y-6">
                <div 
                    className="font-mono text-3xl font-bold"
                    style={{ color: 'var(--accent)' }}
                >
                    <div className="mb-2">Kapil's Portfolio</div>
                    <div 
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Interactive Terminal Experience
                    </div>
                </div>

                <div 
                    className="font-mono text-sm mb-4"
                    style={{ color: 'var(--text-primary)' }}
                >
                    <div className="mb-3">
                        <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
                            🖥️ How to use this terminal:
                        </div>
                    </div>
                    <div className="text-left space-y-1" style={{ color: 'var(--text-secondary)' }}>
                        <div>• Type commands and press Enter</div>
                        <div>• Use Tab for auto-completion</div>
                        <div>• Press ↑/↓ for command history</div>
                        <div>. customise Theme and Cursor</div>
                        <div>• Start with: <span style={{ color: 'var(--accent)' }}>'help'</span> or <span style={{ color: 'var(--accent)' }}>'home'</span></div>
                    </div>
                </div>

                <div className="w-64 mx-auto">
                    <div 
                        className="rounded-full h-1 mb-3"
                        style={{ background: 'var(--bg-secondary)' }}
                    >
                        <div
                            className="h-1 rounded-full transition-all duration-200 ease-out"
                            style={{ 
                                width: `${progress}%`,
                                background: 'var(--accent)'
                            }}
                        />
                    </div>

                    <div 
                        className="font-mono text-xs"
                        style={{ color: 'var(--accent)' }}
                    >
                        {loadingMessages[messageIndex]}
                    </div>

                    <div 
                        className="font-mono text-xs mt-1 opacity-60"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        {Math.round(progress)}%
                    </div>
                </div>

                <div className="flex justify-center space-x-1">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-opacity duration-300 
                                ${Math.floor(progress / 33) % 3 === i ? 'opacity-100' : 'opacity-30'}`}
                            style={{ background: 'var(--accent)' }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}