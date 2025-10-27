"use client";
import React from "react";
import styles from "../Terminal.module.css";

export default function TerminalHeader() {
  return (
    <>
      <h1 className={styles.glitch} data-text=">_ PORTFOLIO">
        PORTFOLIO
      </h1>

      <div className={styles.header}>
        <span className={`${styles.dot} ${styles.red}`} />
        <span className={`${styles.dot} ${styles.yellow}`} />
        <span className={`${styles.dot} ${styles.green}`} />
        <span className={styles.title}>Terminal</span>
      </div>
    </>
  );
}