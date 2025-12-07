"use client";
import React from "react";
import styles from "../Terminal.module.css";
import {OutputItem} from "./TerminalCommands";

interface TerminalOutputProps {
    submitted: string[];
    output: OutputItem[];
    inlineHistory?: string[];
}

export default function TerminalOutput({submitted, output, inlineHistory}: TerminalOutputProps) {
    const history: Array<{ type: 'command' | 'output'; content: string | React.ReactNode; key: string }> = [];

    submitted.forEach((command, i) => {
        history.push({
            type: 'command',
            content: command,
            key: `cmd-${i}`
        });

        if (output[i]) {
            const outputItem = output[i];
            history.push({
                type: 'output',
                content: outputItem.type === 'text' ? outputItem.value : outputItem.element,
                key: `out-${i}`
            });
        }
    });

    return (
        <>
            {history.map((item) => (
                <div
                    key={item.key}
                    className={item.type === 'command' ? styles.promptLine : styles.outputLine}
                >
                    {item.content}
                </div>
            ))}
            {inlineHistory && inlineHistory.length > 0 && (
                <div className={styles.outputLine}>
                    <div style={{color: 'var(--text-secondary)', fontSize: '0.9em', marginBottom: '4px'}}>
                        Command suggestions:
                    </div>
                    {inlineHistory.map((cmd, index) => (
                        <div
                            key={index}
                            style={{
                                color: 'var(--accent)',
                                cursor: 'pointer',
                                padding: '2px 8px',
                                marginLeft: '16px',
                                fontSize: '0.9em'
                            }}
                            onClick={() => {
                                const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                                if (input) {
                                    input.value = cmd;
                                    input.focus();
                                    input.dispatchEvent(new Event('input', {bubbles: true}));
                                }
                            }}
                        >
                            → {cmd}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}