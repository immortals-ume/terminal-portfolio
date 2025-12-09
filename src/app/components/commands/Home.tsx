/**
 * Home Component
 * 
 * Landing page component that displays a welcome message, personal information,
 * and navigation guide for the terminal portfolio.
 * 
 * Features:
 * - Personal introduction with role and experience
 * - Location and current company information
 * - Categorized command navigation guide
 * - Quick start tips for new users
 * - Theme-aware styling
 * 
 * @component
 * @example
 * ```tsx
 * <Home />
 * ```
 */

'use client'

import { useEffect } from "react";
import {personalInfo} from "../../../data/portfolio";
import {useThemeColors} from "../../../hooks/useThemeColors";
import { usePreload } from "@/hooks/usePreload";
import CommandPreloader from "@/components/shared/CommandPreloader";
import { FaHome, FaMapMarkerAlt, FaBuilding, FaCompass, FaLightbulb } from 'react-icons/fa';

export default function Home() {
    const colors = useThemeColors();
    const { preconnect } = usePreload();

    // Preconnect to GitHub API for faster project loading
    useEffect(() => {
        preconnect('https://api.github.com');
    }, [preconnect]);

    return (
        <div className="space-y-4">
            <div className="text-center">
                <div className="text-2xl font-bold mb-2 flex items-center justify-center gap-2" style={{color: colors.accent}}>
                    <FaHome /> Welcome to {personalInfo.name}'s Portfolio
                </div>
                <div style={{color: colors.textPrimary}}>
                    {personalInfo.role} | {personalInfo.experience} Experience
                </div>
                <div className="flex items-center justify-center gap-3" style={{color: colors.textSecondary}}>
                    <span className="flex items-center gap-1"><FaMapMarkerAlt /> {personalInfo.location}</span>
                    <span>|</span>
                    <span className="flex items-center gap-1"><FaBuilding /> {personalInfo.company}</span>
                </div>
            </div>

            <div className="text-center" style={{color: colors.textPrimary}}>
                Interactive terminal portfolio - explore my professional journey
            </div>

            <div className="pt-4" style={{borderTop: `1px solid ${colors.textSecondary}`}}>
                <div className="font-semibold mb-3 text-center flex items-center justify-center gap-2" style={{color: colors.accent}}>
                    <FaCompass /> Navigation Commands
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                        <div style={{color: colors.textPrimary}}>• <CommandPreloader command="skills"><span style={{color: colors.warning}}>skills</span></CommandPreloader> -
                            Technical expertise
                        </div>
                        <div style={{color: colors.textPrimary}}>• <CommandPreloader command="timeline"><span
                            style={{color: colors.warning}}>timeline</span></CommandPreloader> - Work experience
                        </div>
                        <div style={{color: colors.textPrimary}}>• <CommandPreloader command="projects"><span
                            style={{color: colors.warning}}>projects</span></CommandPreloader> - GitHub repositories
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div style={{color: colors.textPrimary}}>• <CommandPreloader command="education"><span
                            style={{color: colors.warning}}>education</span></CommandPreloader> - Academic background
                        </div>
                        <div style={{color: colors.textPrimary}}>• <CommandPreloader command="certifications"><span
                            style={{color: colors.warning}}>certifications</span></CommandPreloader> - Professional certs
                        </div>
                        <div style={{color: colors.textPrimary}}>• <span
                            style={{color: colors.warning}}>contact</span> - Get in touch
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <div className="text-sm flex items-center justify-center gap-1" style={{color: colors.textSecondary}}>
                        <FaLightbulb /> Type <span style={{color: colors.success}}>help</span> for all commands | Use <span
                        style={{color: colors.accent}}>Tab</span> for autocomplete
                    </div>
                </div>
            </div>
        </div>
    );
}