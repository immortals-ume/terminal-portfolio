'use client'

import { motion } from 'framer-motion'
import { skills } from '../../../data/portfolio';
import { useTheme } from '../ThemeProvider';


const getSkillLevel = (skill: string): string => {
  const expertSkills = [
    "Java 17", "Spring Boot 3", "Spring Cloud", "Spring Batch", "Microservice",
    "REST APIs", "graphQL", "Kafka", "System Design", "Design Patterns",
    "Multithreading", "Performance Optimization", "DSA",
    "PostgreSQL", "MySQL", "Git", "CI/CD", "Docker",
    "IntelliJ", "VS Code", "Postman", "Maven"
  ];

  const advancedSkills = [
    "ReactJS", "JavaScript (ES6+)", "TypeScript",
    "MongoDB", "Redis", "AWS", "Azure", "Kubernetes", "GitHub Actions",
    "Grafana", "Micrometer", "SonarQube", "JUnit", "Mockito", "Jest"
  ];

  if (expertSkills.includes(skill)) return "Expert";
  if (advancedSkills.includes(skill)) return "Advanced";
  return "Intermediate";
};

export default function Skills() {
  const { theme } = useTheme();

  const getThemeColors = (level: string, currentTheme: string) => {

    const themeColorPalettes = {
      matrix: {
        Expert: { color: '#00ff00', border: '#00ff00', hover: 'rgba(0, 255, 0, 0.2)', shadow: '0 0 15px rgba(0, 255, 0, 0.5)' },
        Advanced: { color: '#00cc00', border: '#00cc00', hover: 'rgba(0, 204, 0, 0.15)', shadow: '0 0 10px rgba(0, 204, 0, 0.4)' },
        Intermediate: { color: '#009900', border: '#009900', hover: 'rgba(0, 153, 0, 0.1)', shadow: '0 0 8px rgba(0, 153, 0, 0.3)' }
      },
      basic: {
        Expert: { color: '#ffffff', border: '#ffffff', hover: 'rgba(255, 255, 255, 0.15)', shadow: '0 0 15px rgba(255, 255, 255, 0.3)' },
        Advanced: { color: '#bbbbbb', border: '#bbbbbb', hover: 'rgba(187, 187, 187, 0.15)', shadow: '0 0 10px rgba(187, 187, 187, 0.3)' },
        Intermediate: { color: '#888888', border: '#888888', hover: 'rgba(136, 136, 136, 0.1)', shadow: '0 0 8px rgba(136, 136, 136, 0.2)' }
      },
      pro: {
        Expert: { color: '#0066ff', border: '#0066ff', hover: 'rgba(0, 102, 255, 0.2)', shadow: '0 0 15px rgba(0, 102, 255, 0.4)' },
        Advanced: { color: '#3388ff', border: '#3388ff', hover: 'rgba(51, 136, 255, 0.15)', shadow: '0 0 10px rgba(51, 136, 255, 0.3)' },
        Intermediate: { color: '#6699ff', border: '#6699ff', hover: 'rgba(102, 153, 255, 0.1)', shadow: '0 0 8px rgba(102, 153, 255, 0.2)' }
      },
      ocean: {
        Expert: { color: '#00ccff', border: '#00ccff', hover: 'rgba(0, 204, 255, 0.2)', shadow: '0 0 15px rgba(0, 204, 255, 0.5)' },
        Advanced: { color: '#33ddff', border: '#33ddff', hover: 'rgba(51, 221, 255, 0.15)', shadow: '0 0 10px rgba(51, 221, 255, 0.4)' },
        Intermediate: { color: '#66aacc', border: '#66aacc', hover: 'rgba(102, 170, 204, 0.1)', shadow: '0 0 8px rgba(102, 170, 204, 0.3)' }
      },
      'red-sands': {
        Expert: { color: '#ff4400', border: '#ff4400', hover: 'rgba(255, 68, 0, 0.2)', shadow: '0 0 15px rgba(255, 68, 0, 0.5)' },
        Advanced: { color: '#ff6633', border: '#ff6633', hover: 'rgba(255, 102, 51, 0.15)', shadow: '0 0 10px rgba(255, 102, 51, 0.4)' },
        Intermediate: { color: '#cc4422', border: '#cc4422', hover: 'rgba(204, 68, 34, 0.1)', shadow: '0 0 8px rgba(204, 68, 34, 0.3)' }
      },
      silver: {
        Expert: { color: '#dddddd', border: '#dddddd', hover: 'rgba(221, 221, 221, 0.2)', shadow: '0 0 15px rgba(221, 221, 221, 0.4)' },
        Advanced: { color: '#bbbbbb', border: '#bbbbbb', hover: 'rgba(187, 187, 187, 0.15)', shadow: '0 0 10px rgba(187, 187, 187, 0.3)' },
        Intermediate: { color: '#999999', border: '#999999', hover: 'rgba(153, 153, 153, 0.1)', shadow: '0 0 8px rgba(153, 153, 153, 0.2)' }
      }
    };

    const palette = themeColorPalettes[currentTheme as keyof typeof themeColorPalettes] || themeColorPalettes.matrix;
    const levelColors = palette[level as keyof typeof palette] || palette.Intermediate;

    return {
      borderColor: levelColors.border,
      color: levelColors.color,
      hoverBg: levelColors.hover,
      hoverShadow: levelColors.shadow
    };
  };

  const getLegendColors = (currentTheme: string) => {
    const colors = {
      Expert: getThemeColors("Expert", currentTheme).color,
      Advanced: getThemeColors("Advanced", currentTheme).color,
      Intermediate: getThemeColors("Intermediate", currentTheme).color
    };
    return colors;
  };

  const legendColors = getLegendColors(theme);

  return (
    <div className="space-y-4" key={theme}>
      {Object.entries(skills).map(([category, skillList], categoryIndex) => (
        <motion.div
          key={`${category}-${theme}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
        >
          <div
            className="font-bold mb-2 flex items-center transition-colors duration-300"
            style={{ color: getThemeColors("Expert", theme).color }}
          >
            <span className="mr-2">▶</span>
            {category}:
          </div>
          <div className="flex flex-wrap gap-2 ml-6">
            {skillList.map((skill, i) => {
              const level = getSkillLevel(skill);
              const colors = getThemeColors(level, theme);

              return (
                <motion.div
                  key={`${skill}-${theme}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (categoryIndex * 0.1) + (i * 0.03),
                    duration: 0.4
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: colors.hoverBg,
                    boxShadow: colors.hoverShadow
                  }}
                  className="px-3 py-1 border rounded text-sm cursor-pointer transition-all duration-300"
                  style={{
                    borderColor: colors.borderColor,
                    color: colors.color,
                    backgroundColor: 'transparent'
                  }}
                  title={`${skill} - ${level}`}
                >
                  {skill}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      <motion.div
        key={`legend-${theme}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-4 text-sm transition-colors duration-300"
        style={{ color: getThemeColors("Intermediate", theme).color }}
      >
        <div className="font-semibold mb-2 transition-colors duration-300" style={{ color: legendColors.Expert }}>
          Skill Levels:
        </div>
        <div className="text-xs opacity-75 transition-colors duration-300">
          <span className="transition-colors duration-300" style={{ color: legendColors.Expert }}>■</span> Expert |
          <span className="transition-colors duration-300" style={{ color: legendColors.Advanced }}> ■</span> Advanced |
          <span className="transition-colors duration-300" style={{ color: legendColors.Intermediate }}> ■</span> Intermediate
        </div>
      </motion.div>
    </div>
  )
}