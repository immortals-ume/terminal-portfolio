"use client";
import React from "react";
import styles from "../Terminal.module.css";
import { OutputItem } from "./TerminalCommands";

interface TerminalOutputProps {
  submitted: string[];
  output: OutputItem[];
}

export default function TerminalOutput({ submitted, output }: TerminalOutputProps) {
  return (
    <>
      {submitted.map((line, i) => (
        <div key={`p-${i}`} className={styles.promptLine}>
          {line}
        </div>
      ))}

      {output.map((item, i) =>
        item.type === "text" ? (
          <div key={`o-${i}`} className={styles.outputLine}>
            {item.value}
          </div>
        ) : (
          <div key={`oc-${i}`} className={styles.outputLine}>
            {item.element}
          </div>
        )
      )}
    </>
  );
}