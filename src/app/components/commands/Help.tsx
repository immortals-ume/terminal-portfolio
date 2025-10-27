import React from "react";

const rows = [
  { cmd: "home", desc: "About and quick start" },
  { cmd: "help", desc: "Show available commands" },
  { cmd: "skills", desc: "List skills" },
  { cmd: "projects", desc: "List projects with GitHub links" },
  { cmd: "education", desc: "Education details" },
  { cmd: "timeline", desc: "Work/career timeline" },
  { cmd: "certifications", desc: "Show professional certifications from Credly" },
  { cmd: "contact", desc: "Contact information" },
  { cmd: "github", desc: "Show GitHub profile statistics" },
  { cmd: "stats", desc: "Show coding statistics and achievements" },
  { cmd: "performance", desc: "Analyze portfolio performance metrics" },
  { cmd: "system", desc: "Show system information" },
  { cmd: "cursor", desc: "Change cursor style" },
  { cmd: "clear", desc: "Clear the screen" },
];

export default function Help() {
  const leftWidth = Math.max(...rows.map((r) => r.cmd.length)) + 2;
  return (
    <>
      Available commands:
      {"\n"}
      {rows.map((r) => {
        const left = `- ${r.cmd}`;
        const pad = " ".repeat(Math.max(0, leftWidth - left.length));
        return (
          <span key={r.cmd}>
            {left}
            {pad}
            {"-> "}
            {r.desc}
            {"\n"}
          </span>
        );
      })}
      {"\n"}Navigation Tips:
      {"\n"}• Tab - Autocomplete (try: 'sk' + Tab → 'skills')
      {"\n"}• Up Arrow - Show command history popup
      {"\n"}• Down Arrow - Navigate through history
      {"\n"}• Escape - Close popups
      {"\n"}• Click green links to open in new tab
      {"\n"}
      {"\n"}Try it: Type 'sk' and press Tab!
    </>
  );
}
