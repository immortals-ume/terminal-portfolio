"use client";
import React, {forwardRef, useRef} from "react";
import styles from "../Terminal.module.css";
import {CommandsMap} from "./TerminalCommands";
import {useCommandHistory} from "./CommandHistory";
import CommandSuggestions from "./CommandSuggestions";
import TerminalCursor from "./TerminalCursor";

interface TerminalInputProps {
    current: string;
    setCurrent: (value: string) => void;
    onSubmit: (command: string) => void;
    commands: CommandsMap;
    cursorType: string;
    cursorVisible: boolean;
    showHistory: boolean;
    setShowHistory: (show: boolean) => void;
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
    suggestions: string[];
    setSuggestions: (suggestions: string[]) => void;
    inlineHistory: string[];
    setInlineHistory: (history: string[]) => void;
    autoFocus: boolean;
}

const PROMPT = "guest@portfolio:~$";

const TerminalInput
    = forwardRef<HTMLInputElement, TerminalInputProps>(({
                                                            current,
                                                            setCurrent,
                                                            onSubmit,
                                                            commands,
                                                            cursorType,
                                                            cursorVisible,
                                                            showHistory,
                                                            setShowHistory,
                                                            showSuggestions,
                                                            setShowSuggestions,
                                                            suggestions,
                                                            setSuggestions,
                                                            inlineHistory,
                                                            setInlineHistory,
                                                            autoFocus
                                                        }: TerminalInputProps, ref: React.Ref<HTMLInputElement>) => {
    const history = useRef<string[]>([]);
    const historyIndex = useRef(-1);
    const {addToHistory} = useCommandHistory();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!current) return;

        history.current = [current, ...history.current.filter((c) => c !== current)];
        addToHistory(current);
        historyIndex.current = -1;
        setShowHistory(false);
        setShowSuggestions(false);
        setInlineHistory([]);

        onSubmit(current);
        setCurrent("");
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (!showHistory) {
                setShowHistory(true);
                setShowSuggestions(false);
                const suggestedCommands = ['home', 'help', 'skills', 'projects', 'contact', 'timeline'];
                const historyToShow = history.current.length > 0 ? history.current.slice(0, 5) : suggestedCommands.slice(0, 5);
                setInlineHistory(historyToShow);
            }
            const i = historyIndex.current + 1;
            if (i < history.current.length) {
                historyIndex.current = i;
                setCurrent(history.current[i]);
            }
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const i = historyIndex.current - 1;
            if (i >= 0) {
                historyIndex.current = i;
                setCurrent(history.current[i]);
            } else {
                historyIndex.current = -1;
                setCurrent("");
                setShowHistory(false);
                setInlineHistory([]);
            }
            return;
        }

        if (e.key === "Tab") {
            e.preventDefault();
            const val = current.trim().toLowerCase();
            if (!val) return;

            const commandKeys = Object.keys(commands);
            const aliases = [
                "skills", "project", "about", "info", "whoami",
                "ls", "dir", "perf", "metrics", "gh", "git", "exp", "experience",
                "work", "edu", "school", "contact-info", "reach", "certs",
                "badges", "credentials", "cls", "clr"
            ];
            const allCommands = [...commandKeys, ...aliases];

            const matches = allCommands.filter((k) => k.startsWith(val));
            if (matches.length === 1) {
                setCurrent(matches[0]);
                setShowSuggestions(false);
            } else if (matches.length > 1) {
                setSuggestions(matches);
                setShowSuggestions(true);
                setShowHistory(false);
            }
            return;
        }

        if (e.key === "Escape") {
            setShowHistory(false);
            setShowSuggestions(false);
            setInlineHistory([]);
            return;
        }

        if (e.key.length === 1) {
            setShowSuggestions(false);
            setShowHistory(false);
            setInlineHistory([]);
        }
    };

    return (
        <div className="relative">
            <CommandSuggestions
                suggestions={suggestions}
                onSuggestionSelect={(suggestion) => {
                    setCurrent(suggestion);
                    setShowSuggestions(false);
                }}
                isVisible={showSuggestions}
            />
            <form onSubmit={handleSubmit} className={styles.inputRow}>
                <span className={styles.prompt}>{PROMPT}</span>
                <div style={{position: 'relative', flex: 1}}>
                    <input
                        ref={ref}
                        type="text"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus={autoFocus}
                        spellCheck={false}
                        className={styles.input}
                        aria-label="terminal input"
                        style={{width: '100%'}}
                    />
                    <TerminalCursor
                        cursorType={cursorType}
                        cursorVisible={cursorVisible}
                        currentInput={current}
                    />
                </div>
            </form>
        </div>
    );
});

TerminalInput.displayName = 'TerminalInput';

export default TerminalInput;