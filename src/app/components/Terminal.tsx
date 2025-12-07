/**
 * Terminal Component
 * 
 * Main terminal interface component that provides an interactive command-line
 * experience for navigating the portfolio.
 * 
 * Features:
 * - Command execution with history tracking
 * - Auto-scrolling to latest output
 * - Command suggestions and auto-completion
 * - Customizable cursor styles
 * - Theme switching capabilities
 * - Keyboard navigation (arrow keys for history)
 * - Click-to-focus functionality
 * - Responsive viewport height handling
 * 
 * State Management:
 * - output: Array of command outputs (text or React components)
 * - submitted: History of submitted commands
 * - current: Current input value
 * - showHistory: Toggle for command history display
 * - showSuggestions: Toggle for command suggestions
 * 
 * @component
 * @example
 * ```tsx
 * <Terminal />
 * ```
 */

"use client";
import React, {useEffect, useRef, useState} from "react";
import styles from "./Terminal.module.css";

import TerminalHeader from "./terminal/TerminalHeader";
import TerminalOutput from "./terminal/TerminalOutput";
import TerminalInput from "./terminal/TerminalInput";
import {useCursorBlink, useCursorType} from "./terminal/TerminalCursor";
import {createCommands, OutputItem, parseCommand} from "./terminal/TerminalCommands";
import {useTheme} from "./ThemeProvider";
import {useViewportHeight} from "../hooks/useViewportHeight";

export default function Terminal() {
    const [output, setOutput] = useState<OutputItem[]>([]);
    const [submitted, setSubmitted] = useState<string[]>([]);
    const [current, setCurrent] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [inlineHistory, setInlineHistory] = useState<string[]>([]);

    const {cursorType, setCursorType} = useCursorType();
    const {theme, setTheme} = useTheme();
    const cursorVisible = useCursorBlink();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useViewportHeight();

    const COMMANDS = createCommands(setCursorType, cursorType, setTheme, theme);

    useEffect(() => {
        const scrollToBottom = () => {
            scrollRef.current?.scrollIntoView({behavior: "smooth"});
            setTimeout(() => {
                scrollRef.current?.scrollIntoView({behavior: "smooth"});

                const container = scrollRef.current?.parentElement?.parentElement;
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            }, 150);

            setTimeout(() => {
                scrollRef.current?.scrollIntoView({behavior: "smooth"});
            }, 300);
        };

        scrollToBottom();
    }, [output, submitted]);


    useEffect(() => {
        const focusInput = () => {
            inputRef.current?.focus();
        };

        focusInput();

        const handleClick = (e: MouseEvent) => {

            const target = e.target as HTMLElement;
            if (!target.closest('a') && !target.closest('button')) {
                focusInput();
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };
        setVH();
        window.addEventListener("resize", setVH);
        return () => window.removeEventListener("resize", setVH);
    }, []);

    const forceScroll = () => {

        const scrollStrategies = [
            () => scrollRef.current?.scrollIntoView({behavior: "smooth"}),
            () => {
                const container = scrollRef.current?.parentElement;
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            },
            () => {
                const outputContainer = document.querySelector(`.${styles.outputContainer}`);
                if (outputContainer) {
                    outputContainer.scrollTop = outputContainer.scrollHeight;
                }
            },
            () => {
                window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
            }
        ];

        scrollStrategies.forEach((strategy, index) => {
            setTimeout(strategy, index * 100);
        });

        setTimeout(() => {
            scrollRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
        }, 600);
    };

    const runCommand = (raw: string) => {
        const key = parseCommand(raw);
        setSubmitted((prev) => [...prev, `guest@portfolio:~$ ${raw}`]);

        const def = COMMANDS[key];
        if (!def) {
            if (raw.trim()) {
                setOutput((prev) => [
                    ...prev,
                    {type: "text", value: `Command not found: ${raw}. Type 'help'.`},
                ]);
            }
            forceScroll();
            setTimeout(() => inputRef.current?.focus(), 100);
            return;
        }

        const result = def.action();
        if (result === "__CLEAR__") {
            setOutput([]);
            setSubmitted([]);
            setTimeout(() => inputRef.current?.focus(), 100);
            return;
        }

        setOutput((prev) => [...prev, ...result]);
        forceScroll();
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    return (
        <div className={styles.wrap}>
            <TerminalHeader/>

            <div className={styles.body}>
                <div className={styles.outputContainer}>
                    <TerminalOutput submitted={submitted} output={output} inlineHistory={inlineHistory}/>
                    <div ref={scrollRef}/>
                </div>

                <div className={styles.inputContainer}>
                    <TerminalInput
                        ref={inputRef}
                        current={current}
                        setCurrent={setCurrent}
                        onSubmit={runCommand}
                        commands={COMMANDS}
                        cursorType={cursorType}
                        cursorVisible={cursorVisible}
                        showHistory={showHistory}
                        setShowHistory={setShowHistory}
                        showSuggestions={showSuggestions}
                        setShowSuggestions={setShowSuggestions}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
                        inlineHistory={inlineHistory}
                        setInlineHistory={setInlineHistory}
                        autoFocus={true}
                    />
                </div>
            </div>
        </div>
    );
}
