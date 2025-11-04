"use client";
import React from "react";
import styles from "../Terminal.module.css";

export default function TerminalHeader() {
  return (
    <div className={styles.header}>
      <span className={`${styles.dot} ${styles.red}`} />
      <span className={`${styles.dot} ${styles.yellow}`} />
      <span className={`${styles.dot} ${styles.green}`} />
      <span className={styles.title}>Kapil's Portfolio - Terminal</span>
    </div>
  );
}