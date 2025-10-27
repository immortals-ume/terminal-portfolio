"use client";
import React, { useEffect, useState } from "react";
import styles from "../Terminal.module.css";

interface TerminalCursorProps {
  cursorType: string;
  cursorVisible: boolean;
  currentInput: string;
}

function getCursorSymbol(cursorType: string): string {
  const cursorMap: Record<string, string> = {
    "block": "█",
    "underscore": "_",
    "pipe": "|",
    "dot": "●",
    "arrow": "▶",
    "diamond": "◆",
    "star": "★",
    "heart": "♥"
  };
  return cursorMap[cursorType] || "█";
}

export default function TerminalCursor({ cursorType, cursorVisible, currentInput }: TerminalCursorProps) {
  return (
    <span 
      className={`${styles.cursor} ${cursorVisible ? styles.cursorVisible : ""}`}
      style={{ 
        position: 'absolute',
        left: `${currentInput.length * 0.6}em`,
        top: 0
      }}
    >
      {getCursorSymbol(cursorType)}
    </span>
  );
}

export function useCursorType() {
  const [cursorType, setCursorType] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('terminal-cursor-type') || "block";
    }
    return "block";
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('terminal-cursor-type', cursorType);
    }
  }, [cursorType]);

  return { cursorType, setCursorType };
}

export function useCursorBlink() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => setCursorVisible((v) => !v), 500);
    return () => window.clearInterval(id);
  }, []);

  return cursorVisible;
}