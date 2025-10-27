"use client";
import React, { useRef } from "react";
import styles from "../Terminal.module.css";
import { CommandsMap } from "./TerminalCommands";
import CommandHistory, { useCommandHistory } from "./CommandHistory";
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
  autoFocus: boolean;
}

const PROMPT = "guest@portfolio:~$";

export default function TerminalInput({
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
  autoFocus
}: TerminalInputProps) {
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const { addToHistory } = useCommandHistory();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!current) return;
    
    history.current = [current, ...history.current.filter((c) => c !== current)];
    addToHistory(current);
    historyIndex.current = -1;
    setShowHistory(false);
    setShowSuggestions(false);
    
    onSubmit(current);
    setCurrent("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!showHistory) {
        setShowHistory(true);
        setShowSuggestions(false);
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
      }
      return;
    }
    
    if (e.key === "Tab") {
      e.preventDefault();
      const val = current.trim().toLowerCase();
      if (!val) return;
      const keys = Object.keys(commands);
      const matches = keys.filter((k) => k.startsWith(val));
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
      return;
    }

    if (e.key.length === 1) {
      setShowSuggestions(false);
      setShowHistory(false);
    }
  };

  return (
    <div className="relative">
      <CommandHistory
        onCommandSelect={(cmd) => {
          setCurrent(cmd);
          setShowHistory(false);
        }}
        currentInput={current}
        isVisible={showHistory}
      />
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
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            spellCheck={false}
            className={styles.input}
            aria-label="terminal input"
            style={{ width: '100%' }}
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
}