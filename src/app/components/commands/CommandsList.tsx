"use client";
import React from "react";
import {useThemeColors} from "@/hooks/useThemeColors";

export default function CommandsList() {
    const colors = useThemeColors();

    const commandCategories = [
        {
            category: "📋 Portfolio Information",
            commands: [
                {cmd: "home", desc: "About me and quick start guide", aliases: ["about", "info", "whoami"]},
                {cmd: "skills", desc: "Technical skills by category", aliases: []},
                {cmd: "projects", desc: "Portfolio projects with GitHub links", aliases: []},
                {cmd: "education", desc: "Educational background", aliases: ["edu", "school"]},
                {cmd: "timeline", desc: "Work experience and career path", aliases: ["exp", "experience", "work"]},
                {cmd: "contact", desc: "Contact information and social links", aliases: ["contact-info", "reach"]},
            ]
        },
        {
            category: "🏆 Achievements & Content",
            commands: [
                {
                    cmd: "certifications",
                    desc: "Professional certifications",
                    aliases: ["certs", "badges", "credentials"]
                },
                {
                    cmd: "achievements",
                    desc: "Key achievements and milestones",
                    aliases: ["wins", "milestones"]
                },
                {
                    cmd: "blog",
                    desc: "Blog posts and articles",
                    aliases: ["articles", "posts", "writing"]
                }
            ]
        },
        {
            category: "🎨 Customization",
            commands: [
                {cmd: "theme", desc: "Change terminal color theme", aliases: ["themes", "colors", "style"]},
                {cmd: "theme [1-10]", desc: "Quick theme selection (e.g., 'theme 2')", aliases: []},
                {cmd: "cursor", desc: "Change cursor style", aliases: []},
                {cmd: "cursor [1-10]", desc: "Quick cursor selection (e.g., 'cursor 3')", aliases: []},
            ]
        },
        {
            category: "🔧 System & Utilities",
            commands: [
                {cmd: "help", desc: "Show this command list", aliases: ["ls", "dir"]},
                {cmd: "clear", desc: "Clear the terminal screen", aliases: ["cls", "clr"]},
            ]
        }
    ];

    return (
        <div>
            <div style={{marginBottom: "20px"}}>
                <strong>Kapil's Terminal Portfolio</strong>
            </div>
            <div style={{marginBottom: "16px", opacity: 0.8}}>
                Available commands organized by category:
            </div>

            {commandCategories && commandCategories.length > 0 ? commandCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} style={{marginBottom: "24px"}}>
                    <div style={{
                        marginBottom: "12px",
                        color: colors.accent,
                        fontWeight: "bold",
                        borderBottom: `1px solid ${colors.bgSecondary}`,
                        paddingBottom: "4px"
                    }}>
                        {category?.category || "Unknown Category"}
                    </div>

                    {category?.commands && category.commands.length > 0 ? category.commands.map((command, cmdIndex) => (
                        <div key={cmdIndex} style={{marginBottom: "8px", paddingLeft: "16px"}}>
              <span style={{color: colors.accent, fontWeight: "500"}}>
                {command?.cmd || "unknown"}
              </span>
                            <span style={{marginLeft: "12px", opacity: 0.8}}>
                - {command?.desc || "No description"}
              </span>
                            {command?.aliases && command.aliases.length > 0 && (
                                <div style={{
                                    marginLeft: "16px",
                                    fontSize: "12px",
                                    opacity: 0.6,
                                    marginTop: "2px"
                                }}>
                                    Aliases: {command.aliases.join(", ")}
                                </div>
                            )}
                        </div>
                    )) : (
                        <div style={{paddingLeft: "16px", opacity: 0.6}}>No commands available</div>
                    )}
                </div>
            )) : (
                <div>No command categories available</div>
            )}

            <div style={{
                marginTop: "24px",
                padding: "12px",
                background: colors.bgSecondary,
                borderRadius: "6px",
                opacity: 0.9
            }}>
                <div style={{marginBottom: "8px", fontWeight: "bold"}}>💡 Pro Tips:</div>
                <div style={{fontSize: "13px", lineHeight: "1.5"}}>
                    • Use Tab for command auto-completion<br/>
                    • Press ↑/↓ arrows to navigate command history<br/>
                    • Type partial commands and press Tab for suggestions<br/>
                    • Commands are case-insensitive<br/>
                    • Use 'theme [number]' or 'cursor [number]' for quick switching
                </div>
            </div>
        </div>
    );
}
