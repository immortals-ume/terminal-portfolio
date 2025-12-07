/**
 * Timeline Component
 *
 * Displays professional work experience in a chronological timeline format with
 * comprehensive details including roles, companies, achievements, and technologies.
 *
 * Features:
 * - Interactive timeline visualization with markers and connecting lines
 * - Real-time duration calculations for ongoing positions
 * - Detailed project and achievement listings
 * - Technology stack display for each position
 * - Career progression summary
 * - Total experience calculation (excluding career breaks)
 *
 * @component
 * @example
 * ```tsx
 * <Timeline />
 * ```
 */

'use client'

import React, {useEffect, useState, useMemo} from "react";
import {workExperience} from "../../../data/portfolio";
import {useThemeColors} from "../../../hooks/useThemeColors";
import { 
  FaClock, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaLaptopCode, 
  FaBullseye, 
  FaRocket,
  FaChartLine,
  FaUser,
  FaCog,
  FaChartBar,
  FaWrench
} from 'react-icons/fa';

const Timeline: React.FC = React.memo(() => {
    const colors = useThemeColors();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    /**
     * Safely stringifies an object to JSON with null value handling
     *
     * @param {any} obj - The object to stringify
     * @param {number} indent - Number of spaces for indentation (default: 2)
     * @returns {string} JSON string or error message
     */
    const safeJsonStringify = (obj: any, indent: number = 2): string => {
        const replacer = (key: string, value: any) => {
            if (value === null || value === undefined) return null;

            if (typeof value === 'string' && value.trim() === '') return null;

            if (Array.isArray(value) && value.length === 0) return [];

            if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) return {};

            if (typeof value === 'number' && (!isFinite(value) || isNaN(value))) return null;

            return value;
        };

        try {
            return JSON.stringify(obj, replacer, indent);
        } catch (error) {
            return `Error serializing timeline data: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    };

    // Enhanced timeline data generation with comprehensive validation
    const getCompleteTimelineData = () => {
        const safeWorkExperience = Array.isArray(workExperience) ? workExperience : [];

        return {
            metadata: {
                generatedAt: currentTime?.toISOString() || new Date().toISOString(),
                totalExperience: totalExperience() || "0 years",
                currentStatus: getCurrentStatus() || "Status unavailable",
                totalPositions: safeWorkExperience.length,
                dataSource: "portfolio.ts",
                lastUpdated: new Date().toISOString(),
                dataIntegrity: {
                    hasValidData: safeWorkExperience.length > 0,
                    completenessPercentage: Math.round(
                        (safeWorkExperience.filter(exp =>
                            exp.role && exp.company && exp.period && exp.description
                        ).length / Math.max(safeWorkExperience.length, 1)) * 100
                    )
                }
            },
            timeline: workExperience?.map((item, index) => ({
                id: index + 1,
                period: {
                    raw: item.period || null,
                    duration: item.period ? calculateDuration(item.period, true) : null,
                    startDate: item.period ? parseDate(item.period.split(' - ')[0]?.trim() || '').toISOString() : null,
                    endDate: item.period && item.period.includes(' - ')
                        ? parseDate(item.period.split(' - ')[1]?.trim() || '').toISOString()
                        : null,
                    isOngoing: item.period ? !item.period.includes(' - ') : false,
                    isCareerBreak: item.period ? item.period.toLowerCase().includes('career break') : false
                },
                position: {
                    role: item.role || null,
                    company: item.company || null,
                    type: item.type || null,
                    location: item.location || null,
                    description: item.description || null
                },
                technologies: {
                    list: item.technologies || [],
                    count: item.technologies?.length || 0,
                    primary: item.technologies?.[0] || null,
                    hasBackend: Boolean(item.technologies?.some(tech =>
                        ['Java', 'Spring Boot', 'Spring Cloud'].includes(tech)
                    )),
                    hasFrontend: Boolean(item.technologies?.some(tech =>
                        ['React', 'ReactJS', 'JavaScript', 'TypeScript'].includes(tech)
                    )),
                    hasCloud: Boolean(item.technologies?.some(tech =>
                        ['AWS', 'Azure', 'Kubernetes', 'Docker'].includes(tech)
                    ))
                },
                achievements: {
                    list: item.achievements || [],
                    count: item.achievements?.length || 0,
                    hasQuantifiableResults: Boolean(item.achievements?.some(achievement =>
                        /\d+%|\d+x|reduced|increased|improved/i.test(achievement)
                    ))
                },
                projects: {
                    list: item.projects || [],
                    count: item.projects?.length || 0,
                    details: item.projects?.map(project => ({
                        name: project?.name || null,
                        description: project?.description || null,
                        hasDescription: Boolean(project?.description)
                    })) || []
                },
                metrics: {
                    hasAchievements: Boolean(item.achievements?.length),
                    hasTechnologies: Boolean(item.technologies?.length),
                    hasProjects: Boolean(item.projects?.length),
                    completenessScore: [
                        Boolean(item.role),
                        Boolean(item.company),
                        Boolean(item.description),
                        Boolean(item.technologies?.length),
                        Boolean(item.achievements?.length)
                    ].filter(Boolean).length / 5
                }
            })) || [],
            summary: {
                totalExperienceYears: totalExperience() || null,
                careerProgression: [
                    "Engineer Intern",
                    "Systems Engineer",
                    "Senior Systems Engineer",
                    "Backend Engineer",
                    "Software Development Engineer 1"
                ],
                companiesWorkedAt: workExperience
                    ? [...new Set(workExperience.filter(exp => exp.company).map(exp => exp.company))]
                    : [],
                technologiesUsed: workExperience
                    ? [...new Set(workExperience.flatMap(exp => exp.technologies || []).filter(Boolean))]
                    : [],
                totalAchievements: workExperience
                    ?.reduce((total, exp) => total + (exp.achievements?.length || 0), 0) || 0,
                averageJobDuration: workExperience?.length > 0
                    ? (workExperience
                        ?.filter(exp => exp.period && !exp.period.toLowerCase().includes('career break'))
                        ?.length || 1)
                    : 0
            }
        };
    };

    /**
     * Parses a date string in "Mon YYYY" format to a Date object
     *
     * @param {string} dateStr - Date string in format "Jan 2024"
     * @returns {Date} Parsed date object
     * @example
     * parseDate("Jan 2024") // Returns Date object for January 1, 2024
     */
    const parseDate = (dateStr: string): Date => {
        const months = {
            'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
        };

        const [month, year] = dateStr.toLowerCase().split(' ');
        const monthIndex = months[month as keyof typeof months];
        return new Date(parseInt(year), monthIndex, 1);
    };

    /**
     * Calculates the duration between two dates or from a date to present
     *
     * @param {string} period - Period string in format "Mon YYYY - Mon YYYY" or "Mon YYYY" for ongoing
     * @param {boolean} showDays - Whether to include days in the output (default: false)
     * @returns {string} Formatted duration string (e.g., "2 years 3 months" or "1 year 6 months (ongoing)")
     * @example
     * calculateDuration("Jan 2022 - Dec 2023") // "2 years"
     * calculateDuration("Jan 2024", true) // "1 year 2 months 15 days (ongoing)"
     */
    const calculateDuration = (period: string, showDays: boolean = false): string => {
        if (period.toLowerCase().includes('career break')) {
            return '4 months';
        }

        const [start, end] = period.split(' - ');
        const startDate = parseDate(start.trim());
        const endDate = end ? parseDate(end.trim()) : currentTime;

        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();

        const diffMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (!end) {
            const years = Math.floor(diffMonths / 12);
            const remainingMonths = diffMonths % 12;
            const extraDays = diffDays - (diffMonths * 30.44);

            let result = '';
            if (years > 0) result += `${years} year${years > 1 ? 's' : ''} `;
            if (remainingMonths > 0) result += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''} `;
            if (showDays && extraDays > 0) result += `${Math.floor(extraDays)} days `;

            return result.trim() + ' (ongoing)';
        }

        if (diffMonths < 12) {
            return `${diffMonths} months`;
        } else {
            const years = Math.floor(diffMonths / 12);
            const remainingMonths = diffMonths % 12;
            if (remainingMonths === 0) {
                return `${years} year${years > 1 ? 's' : ''}`;
            } else {
                return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
            }
        }
    };

    /**
     * Calculates total professional experience across all positions
     * Excludes career breaks from the calculation
     *
     * @returns {string} Total experience in years with decimal precision (e.g., "4.7 years")
     */
    const totalExperience = () => {
        let totalMonths = 0;
        let totalDays = 0;

        workExperience.forEach(exp => {
            if (exp.period && !exp.period.toLowerCase().includes('career break')) {
                const [start, end] = exp.period.split(' - ');
                const startDate = parseDate(start.trim());
                const endDate = end ? parseDate(end.trim()) : currentTime;

                const startYear = startDate.getFullYear();
                const startMonth = startDate.getMonth();
                const endYear = endDate.getFullYear();
                const endMonth = endDate.getMonth();

                const diffMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
                const diffTime = endDate.getTime() - startDate.getTime();
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                totalMonths += diffMonths;
                totalDays += diffDays;
            }
        });

        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        const preciseYears = (totalDays / 365.25).toFixed(1);
        return `${preciseYears} years`;
    };

    /**
     * Determines the current employment status
     *
     * @returns {string} Current role and company, or "Open to new opportunities" if not employed
     * @example
     * "Currently: Software Engineer at Company X"
     */
    const getCurrentStatus = () => {
        const currentRole = workExperience.find(exp =>
            exp.period && !exp.period.includes(' - ') ||
            (exp.period && exp.period.split(' - ')[1] === undefined)
        );

        if (currentRole) {
            return `Currently: ${currentRole.role} at ${currentRole.company}`;
        }
        return 'Open to new opportunities';
    };

    // Memoize timeline data to avoid recalculation on every render
    const timelineData = useMemo(() => getCompleteTimelineData(), [currentTime]);

    // Memoize total experience calculation
    const totalExp = useMemo(() => totalExperience(), [currentTime]);
    
    // Memoize current status
    const currentStatus = useMemo(() => getCurrentStatus(), []);

    return (
        <div 
            className="font-inherit leading-[1.4]"
            style={{
                color: colors.textPrimary
            }}
        >
            <div 
                className="mb-5 font-bold"
                style={{
                    color: colors.accent
                }}
            >
                Professional Timeline ({totalExp} experience)
            </div>

            <>
                <div className="relative">
                    {workExperience?.map((item, index) => (
                        <div key={index} className="flex mb-[30px] relative md:mb-[25px] max-[480px]:flex-col max-[480px]:mb-5">
                            <div className="relative mr-5 flex flex-col items-center md:mr-[15px] max-[480px]:flex-row max-[480px]:mr-0 max-[480px]:mb-2.5 max-[480px]:items-start">
                                <div 
                                    className="w-3 h-3 rounded-full z-[2]"
                                    style={{
                                        border: `2px solid ${colors.accent}`,
                                        background: colors.bgPrimary
                                    }}
                                ></div>
                                {index < workExperience.length - 1 && (
                                    <div 
                                        className="w-0.5 h-full absolute top-3 left-1/2 -translate-x-1/2 min-h-[150px] max-[480px]:hidden"
                                        style={{
                                            background: colors.accent
                                        }}
                                    ></div>
                                )}
                            </div>

                            <div className="flex-1 pl-2.5 md:pl-2 max-[480px]:pl-0">
                                <div 
                                    className="text-[0.9em] mb-[5px]"
                                    style={{
                                        color: colors.textSecondary
                                    }}
                                >
                                    [{item?.period || 'N/A'}]
                                </div>
                                <div 
                                    className="font-bold text-[1.1em] mb-[15px]"
                                    style={{
                                        color: colors.accent
                                    }}
                                >
                                    {item?.role || 'No role specified'}
                                </div>

                                <div className="ml-2.5 max-[480px]:ml-0">
                                    {item?.period && (
                                        <div 
                                            className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                                            style={{
                                                color: colors.textPrimary
                                            }}
                                        >
                                            <FaClock className="mr-2 min-w-[20px] max-[480px]:mb-1" />
                                            <span>Duration: {calculateDuration(item.period, true)}</span>
                                        </div>
                                    )}
                                    {item?.company && (
                                        <div 
                                            className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                                            style={{
                                                color: colors.textPrimary
                                            }}
                                        >
                                            <FaBuilding className="mr-2 min-w-[20px] max-[480px]:mb-1" />
                                            <span>Company: {item.company} {item?.type && `(${item.type})`}</span>
                                        </div>
                                    )}
                                    {item?.location && (
                                        <div 
                                            className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                                            style={{
                                                color: colors.textPrimary
                                            }}
                                        >
                                            <FaMapMarkerAlt className="mr-2 min-w-[20px] max-[480px]:mb-1" />
                                            <span>Location: {item.location}</span>
                                        </div>
                                    )}
                                    <div 
                                        className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                                        style={{
                                            color: colors.textPrimary
                                        }}
                                    >
                                        <FaFileAlt className="mr-2 min-w-[20px] max-[480px]:mb-1" />
                                        <span>Description: {item?.description || 'No description available'}</span>
                                    </div>
                                    {item?.technologies && item.technologies.length > 0 && (
                                        <div 
                                            className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                                            style={{
                                                color: colors.textPrimary
                                            }}
                                        >
                                            <span className="mr-2 min-w-[20px] max-[480px]:mb-1">💻</span>
                                            <span>Tech Stack: {item.technologies.join(", ")}</span>
                                        </div>
                                    )}

                                    {item?.achievements && item.achievements.length > 0 && (
                                        <div className="mt-[15px]">
                                            <div 
                                                className="flex items-center mb-2.5 font-bold"
                                                style={{
                                                    color: colors.accent
                                                }}
                                            >
                                                <span className="mr-2 min-w-[20px]">🎯</span>
                                                <span>Key Achievements:</span>
                                            </div>
                                            <ul 
                                                className="m-0 pl-[30px] list-none"
                                                style={{
                                                    '--bullet-color': colors.accent
                                                } as React.CSSProperties}
                                            >
                                                {item.achievements.map((achievement, i) => (
                                                    <li 
                                                        key={i} 
                                                        className="mb-1.5 relative pl-[15px] before:content-['•'] before:absolute before:left-0 before:text-[var(--bullet-color)]"
                                                        style={{
                                                            color: colors.textPrimary
                                                        }}
                                                    >
                                                        {achievement || 'Achievement not specified'}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {item?.projects && item.projects.length > 0 && (
                                        <div className="mt-[15px]">
                                            <div 
                                                className="flex items-center mb-2.5 font-bold"
                                                style={{
                                                    color: colors.accent
                                                }}
                                            >
                                                <span className="mr-2 min-w-[20px]">🚀</span>
                                                <span>Projects:</span>
                                            </div>
                                            <ul 
                                                className="m-0 pl-[30px] list-none"
                                                style={{
                                                    '--bullet-color': colors.accent
                                                } as React.CSSProperties}
                                            >
                                                {item.projects.map((project, i) => (
                                                    <li 
                                                        key={i} 
                                                        className="mb-1.5 relative pl-[15px] before:content-['•'] before:absolute before:left-0 before:text-[var(--bullet-color)]"
                                                        style={{
                                                            color: colors.textPrimary
                                                        }}
                                                    >
                                                        <strong>{project?.name || 'Unnamed Project'}:</strong> {project?.description || 'No description available'}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )) || <div>No timeline data available</div>}
                </div>

                <div 
                    className="mt-[30px] pt-5"
                    style={{
                        borderTop: `1px solid ${colors.accent}`,
                        color: colors.textSecondary
                    }}
                >
                    <div className="mb-[5px]">📈 Total Experience: {totalExp || 'N/A'} (excluding career break)</div>
                    <div className="mb-[5px]">👤 Current Status: {currentStatus || 'Status unknown'}</div>
                    <div className="mb-[5px]">🎯 Career Progression: Engineering Intern → Systems Engineer → Senior Systems Engineer →
                        Backend Engineer → Software Development Engineer 1
                    </div>
                    <div className="mb-[5px]">🚀 Core Expertise: Java/Spring Boot, Microservices, Cloud Architecture, Full-Stack
                        Development
                    </div>
                    <div className="mb-[5px]">📊 Data Completeness: {timelineData?.summary?.totalAchievements || 0} achievements
                        across {timelineData?.summary?.companiesWorkedAt?.length || 0} companies
                    </div>
                    <div className="mb-[5px]">🔧 Technologies: {timelineData?.summary?.technologiesUsed?.length || 0} unique technologies
                        used
                    </div>
                </div>
            </>
        </div>
    );
});

Timeline.displayName = 'Timeline';

export default Timeline;