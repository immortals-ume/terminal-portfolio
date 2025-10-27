"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Terminal.module.css";
import SystemInitializer from "./terminal/SystemInitializer";
import TerminalHeader from "./terminal/TerminalHeader";
import TerminalOutput from "./terminal/TerminalOutput";
import TerminalInput from "./terminal/TerminalInput";
import { useCursorType, useCursorBlink } from "./terminal/TerminalCursor";
import { createCommands, parseCommand, OutputItem } from "./terminal/TerminalCommands";

export default function Terminal() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [output, setOutput] = useState<OutputItem[]>([]);
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { cursorType, setCursorType } = useCursorType();
  const cursorVisible = useCursorBlink();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const COMMANDS = createCommands(setCursorType, cursorType);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output, submitted]);

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  const runCommand = (raw: string) => {
    const key = parseCommand(raw);
    setSubmitted((prev) => [...prev, `guest@portfolio:~$ ${raw}`]);

    const def = COMMANDS[key];
    if (!def) {
      if (raw.trim()) {
        setOutput((prev) => [
          ...prev,
          { type: "text", value: `Command not found: ${raw}. Type 'help'.` },
        ]);
      }
      return;
    }

    const result = def.action();
    if (result === "__CLEAR__") {
      setOutput([]);
      setSubmitted([]);
      return;
    }
    setOutput((prev) => [...prev, ...result]);
  };

  return (
    <div className={styles.wrap}>
      <TerminalHeader />

      <div className={styles.body}>
        {isInitializing ? (
          <SystemInitializer onComplete={() => setIsInitializing(false)} />
        ) : (
          <>
            <TerminalOutput submitted={submitted} output={output} />

            <TerminalInput
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
              autoFocus={!isInitializing}
            />
          </>
        )}

        <div ref={scrollRef} />
      </div>
    </div>
  );
}
