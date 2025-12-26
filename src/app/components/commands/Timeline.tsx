/**
 * Timeline Component
 *
 * Displays professional work experience in a chronological timeline format.
 *
 * Features:
 * - Interactive timeline visualization with markers and connecting lines
 * - Real-time duration calculations for ongoing positions
 * - Total experience calculation (excluding career breaks and internships)
 *
 * @component
 * @example
 * ```tsx
 * <Timeline />
 * ```
 */

'use client';

import React, { useEffect, useState } from 'react';
import { workExperience } from '@/data/portfolio';
import { useThemeColors } from '@/hooks/useThemeColors';
import { FaBuilding, FaClock, FaFileAlt, FaMapMarkerAlt } from 'react-icons/fa';

function calculateMonthDifference(
  parseDate: (dateStr: string) => Date,
  start: string,
  end: string,
  currentTime: Date
) {
  const startDate = parseDate(start.trim());
  const endDate = end ? parseDate(end.trim()) : currentTime;

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
}

const Timeline: React.FC = React.memo(() => {
  const colors = useThemeColors();
  const [currentTime, setCurrentTime] = useState(new Date());

  const shouldExcludeFromExperience = (exp: any): boolean => {
    const period = exp.period?.toLowerCase() || '';
    const description = exp.description?.toLowerCase() || '';
    const role = exp.role?.toLowerCase() || '';
    const type = exp.type?.toLowerCase() || '';

    const isCareerBreak =
      period.includes('career break') || description.includes('career break');

    const isInternship =
      role.includes('intern') ||
      type.includes('internship') ||
      description.includes('internship');

    return isCareerBreak || isInternship;
  };

  const isCareerBreak = (exp: any): boolean => {
    const period = exp.period?.toLowerCase() || '';
    const description = exp.description?.toLowerCase() || '';
    return (
      period.includes('career break') || description.includes('career break')
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  /**
   * Parses a date string in "Mon YYYY" format to a Date object
   */
  const parseDate = (dateStr: string): Date => {
    const months = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };

    const [month, year] = dateStr.toLowerCase().split(' ');
    const monthIndex = months[month as keyof typeof months];
    return new Date(parseInt(year), monthIndex, 1);
  };

  /**
   * Calculates the duration between two dates or from a date to present
   */
  const calculateDuration = (
    period: string,
    _showDays: boolean = false,
    expItem?: any
  ): string => {
    if (expItem && isCareerBreak(expItem)) {
      return '4 months (career break)';
    }

    if (period.toLowerCase().includes('career break')) {
      return '4 months (career break)';
    }

    const [start, end] = period.split(' - ');
    const diffMonths = calculateMonthDifference(
      parseDate,
      start,
      end,
      currentTime
    );

    if (!end) {
      const years = Math.floor(diffMonths / 12);
      const remainingMonths = diffMonths % 12;

      let result = '';
      if (years > 0) result += `${years} year${years > 1 ? 's' : ''} `;
      if (remainingMonths > 0)
        result += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''} `;

      return result.trim() + ' (ongoing)';
    }

    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
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
   * Excludes career breaks and internships from the calculation
   */
  const totalExperience = () => {
    let totalMonths = 0;

    workExperience.forEach(exp => {
      if (exp.period && !shouldExcludeFromExperience(exp)) {
        const [start, end] = exp.period.split(' - ');
        const diffMonths = calculateMonthDifference(
          parseDate,
          start,
          end,
          currentTime
        );
        totalMonths += diffMonths;
      }
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
    }
  };

  /**
   * Determines the current employment status
   */
  const getCurrentStatus = () => {
    const currentRole = workExperience.find(
      exp => exp.period && !exp.period.includes(' - ')
    );

    if (currentRole) {
      return `Currently: ${currentRole.role} at ${currentRole.company}`;
    }
    return 'Open to new opportunities';
  };
  const getCareerProgression = (workExperience: any[]) => {
    return workExperience
      .slice()
      .reverse()
      .filter(item => item.role)
      .map(item => item.role)
      .filter((role, index, self) => self.indexOf(role) === index) // dedupe
      .join(' → ');
  };
  const totalExp = totalExperience();
  const currentStatus = getCurrentStatus();
  const careerProgression = getCareerProgression(workExperience);



  return (
    <div
      className="font-inherit leading-[1.4]"
      style={{
        color: colors.textPrimary,
      }}
    >
      <div
        className="mb-5 font-bold"
        style={{
          color: colors.accent,
        }}
      >
        Professional Timeline ({totalExp} experience)
      </div>

      <>
        <div className="relative">
          {workExperience?.map((item, index) => (
            <div
              key={index}
              className="flex mb-[30px] relative md:mb-[25px] max-[480px]:flex-col max-[480px]:mb-5"
            >
              <div className="relative mr-5 flex flex-col items-center md:mr-[15px] max-[480px]:flex-row max-[480px]:mr-0 max-[480px]:mb-2.5 max-[480px]:items-start">
                <div
                  className="w-3 h-3 rounded-full z-2"
                  style={{
                    border: `2px solid ${colors.accent}`,
                    background: colors.bgPrimary,
                  }}
                ></div>
                {index < workExperience.length - 1 && (
                  <div
                    className="w-0.5 h-full absolute top-3 left-1/2 -translate-x-1/2 min-h-[150px] max-[480px]:hidden"
                    style={{
                      background: colors.accent,
                    }}
                  ></div>
                )}
              </div>

              <div className="flex-1 pl-2.5 md:pl-2 max-[480px]:pl-0">
                <div
                  className="text-[0.9em] mb-[5px]"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  [{item?.period || 'N/A'}]
                </div>
                <div
                  className="font-bold text-[1.1em] mb-[15px]"
                  style={{
                    color: colors.accent,
                  }}
                >
                  {item?.role || 'No role specified'}
                </div>

                <div className="ml-2.5 max-[480px]:ml-0">
                  {item?.period && (
                    <div
                      className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      <FaClock className="mr-2 min-w-5 max-[480px]:mb-1" />
                      <span>
                        Duration: {calculateDuration(item.period, true, item)}
                      </span>
                    </div>
                  )}
                  {item?.company && (
                    <div
                      className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      <FaBuilding className="mr-2 min-w-5 max-[480px]:mb-1" />
                      <span>
                        Company: {item.company} {item?.type && `(${item.type})`}
                      </span>
                    </div>
                  )}
                  {item?.location && (
                    <div
                      className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      <FaMapMarkerAlt className="mr-2 min-w-5 max-[480px]:mb-1" />
                      <span>Location: {item.location}</span>
                    </div>
                  )}
                  <div
                    className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                    style={{
                      color: colors.textPrimary,
                    }}
                  >
                    <FaFileAlt className="mr-2 min-w-5 max-[480px]:mb-1" />
                    <span>
                      Description:{' '}
                      {item?.description || 'No description available'}
                    </span>
                  </div>
                  {item?.technologies && item.technologies.length > 0 && (
                    <div
                      className="mb-2 flex items-start max-[480px]:flex-col max-[480px]:mb-3"
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      <span className="mr-2 min-w-5 max-[480px]:mb-1">💻</span>
                      <span>Tech Stack: {item.technologies.join(', ')}</span>
                    </div>
                  )}

                  {item?.achievements && item.achievements.length > 0 && (
                    <div className="mt-[15px]">
                      <div
                        className="flex items-center mb-2.5 font-bold"
                        style={{
                          color: colors.accent,
                        }}
                      >
                        <span className="mr-2 min-w-5">🎯</span>
                        <span>Key Achievements:</span>
                      </div>
                      <ul
                        className="m-0 pl-[30px] list-none"
                        style={
                          {
                            '--bullet-color': colors.accent,
                          } as React.CSSProperties
                        }
                      >
                        {item.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="mb-1.5 relative pl-[15px] before:content-['•'] before:absolute before:left-0 before:text-(--bullet-color)"
                            style={{
                              color: colors.textPrimary,
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
                          color: colors.accent,
                        }}
                      >
                        <span className="mr-2 min-w-5">🚀</span>
                        <span>Projects:</span>
                      </div>
                      <ul
                        className="m-0 pl-[30px] list-none"
                        style={
                          {
                            '--bullet-color': colors.accent,
                          } as React.CSSProperties
                        }
                      >
                        {item.projects.map((project, i) => (
                          <li
                            key={i}
                            className="mb-1.5 relative pl-[15px] before:content-['•'] before:absolute before:left-0 before:text-(--bullet-color)"
                            style={{
                              color: colors.textPrimary,
                            }}
                          >
                            <strong>
                              {project?.name || 'Unnamed Project'}:
                            </strong>{' '}
                            {project?.description || 'No description available'}
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
            color: colors.textSecondary,
          }}
        >
          <div className="mb-[5px]">📈 Total Experience: {totalExp}</div>
          <div className="mb-[5px]">👤 Current Status: {currentStatus}</div>
          <div className="mb-[5px]">
            🎯 Career Progression:{careerProgression}
          </div>
        </div>
      </>
    </div>
  );
});

Timeline.displayName = 'Timeline';

export default Timeline;
