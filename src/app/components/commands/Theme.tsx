"use client";
import React from "react";

const themes = [
  { id: "matrix", name: "Matrix Green", description: "Classic hacker green theme" },
  { id: "basic", name: "Basic", description: "macOS Terminal default" },
  { id: "pro", name: "Pro", description: "Dark blue professional" },
  { id: "ocean", name: "Ocean", description: "Deep blue waters" },
  { id: "red-sands", name: "Red Sands", description: "Warm desert tones" },
  { id: "silver", name: "Silver Aerogel", description: "Metallic silver" },
];

interface ThemeProps {
  onThemeChange: (theme: string) => void;
  currentTheme: string;
}

export default function Theme({ onThemeChange, currentTheme }: ThemeProps) {
  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <strong>🎨 Terminal Themes</strong>
      </div>
      <div style={{ marginBottom: "12px", opacity: 0.8 }}>
        Current theme: <span style={{ color: "var(--accent)" }}>{themes.find(t => t.id === currentTheme)?.name || "Matrix Green"}</span>
      </div>
      <div style={{ marginBottom: "16px" }}>
        Available themes:
      </div>
      {themes && themes.length > 0 ? themes.map((theme, index) => (
        <div key={theme?.id || index} style={{ marginBottom: "8px" }}>
          <span
            style={{
              cursor: "pointer",
              color: currentTheme === theme?.id ? "var(--accent)" : "var(--text-secondary)",
              textDecoration: currentTheme === theme?.id ? "underline" : "none"
            }}
            onClick={() => theme?.id && onThemeChange(theme.id)}
          >
            [{index + 1}] {theme?.name || "Unknown Theme"}
          </span>
          <span style={{ opacity: 0.6, marginLeft: "8px" }}>- {theme?.description || "No description"}</span>
        </div>
      )) : (
        <div>No themes available</div>
      )}
      <div style={{ marginTop: "16px", opacity: 0.7, fontSize: "12px" }}>
        💡 Type 'theme [number]' to switch themes quickly
      </div>
    </div>
  );
}

export { themes };