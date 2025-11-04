'use client'

import React, { useState, useEffect } from "react";
import { workExperience } from "../../../data/portfolio";
import styles from "./Timeline.module.css";

export default function Timeline() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  
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
  const parseDate = (dateStr: string): Date => {
    const months = {
      'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
      'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
    };

    const [month, year] = dateStr.toLowerCase().split(' ');
    const monthIndex = months[month as keyof typeof months];
    return new Date(parseInt(year), monthIndex, 1);
  };

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

  const timelineData = getCompleteTimelineData();

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineHeader}>
        Professional Timeline ({totalExperience()} experience)
        <button
          onClick={() => setShowJson(!showJson)}
          style={{
            marginLeft: '20px',
            padding: '4px 8px',
            background: 'var(--accent)',
            color: 'var(--bg-primary)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {showJson ? 'Hide JSON' : 'Show JSON'}
        </button>
      </div>

      {showJson ? (
        <div style={{
          background: 'var(--bg-secondary)',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid var(--accent)'
        }}>
          <div style={{
            color: 'var(--accent)',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            Complete Timeline JSON Data (with null safety checks):
          </div>
          <pre style={{
            color: 'var(--text-primary)',
            fontSize: '11px',
            lineHeight: '1.4',
            overflow: 'auto',
            maxHeight: '400px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {safeJsonStringify(timelineData)}
          </pre>
        </div>
      ) : (
        <>
          <div className={styles.timeline}>
            {workExperience?.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <div className={styles.timelineDot}></div>
                  {index < workExperience.length - 1 && <div className={styles.timelineLine}></div>}
                </div>

                <div className={styles.timelineContent}>
                  <div className={styles.timelinePeriod}>[{item?.period || 'N/A'}]</div>
                  <div className={styles.timelineRole}>{item?.role || 'No role specified'}</div>

                  <div className={styles.timelineDetails}>
                    {item?.period && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}>⏱️</span>
                        <span>Duration: {calculateDuration(item.period, true)}</span>
                      </div>
                    )}
                    {item?.company && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}>🏢</span>
                        <span>Company: {item.company} {item?.type && `(${item.type})`}</span>
                      </div>
                    )}
                    {item?.location && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}>📍</span>
                        <span>Location: {item.location}</span>
                      </div>
                    )}
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📝</span>
                      <span>Description: {item?.description || 'No description available'}</span>
                    </div>
                    {item?.technologies && item.technologies.length > 0 && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}>💻</span>
                        <span>Tech Stack: {item.technologies.join(", ")}</span>
                      </div>
                    )}

                    {item?.achievements && item.achievements.length > 0 && (
                      <div className={styles.achievements}>
                        <div className={styles.achievementsHeader}>
                          <span className={styles.detailIcon}>🎯</span>
                          <span>Key Achievements:</span>
                        </div>
                        <ul className={styles.achievementsList}>
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className={styles.achievementItem}>
                              {achievement || 'Achievement not specified'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item?.projects && item.projects.length > 0 && (
                      <div className={styles.achievements}>
                        <div className={styles.achievementsHeader}>
                          <span className={styles.detailIcon}>🚀</span>
                          <span>Projects:</span>
                        </div>
                        <ul className={styles.achievementsList}>
                          {item.projects.map((project, i) => (
                            <li key={i} className={styles.achievementItem}>
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

          <div className={styles.timelineFooter}>
            <div>📈 Total Experience: {totalExperience() || 'N/A'} (excluding career break)</div>
            <div>👤 Current Status: {getCurrentStatus() || 'Status unknown'}</div>
            <div>🎯 Career Progression: Engineering Intern → Systems Engineer → Senior Systems Engineer → Backend Engineer → Software Development Engineer 1</div>
            <div>🚀 Core Expertise: Java/Spring Boot, Microservices, Cloud Architecture, Full-Stack Development</div>
            <div>📊 Data Completeness: {timelineData?.summary?.totalAchievements || 0} achievements across {timelineData?.summary?.companiesWorkedAt?.length || 0} companies</div>
            <div>🔧 Technologies: {timelineData?.summary?.technologiesUsed?.length || 0} unique technologies used</div>
          </div>
        </>
      )}
    </div>
  );
}