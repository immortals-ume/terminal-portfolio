/**
 * Simple Skills Data Structure
 *
 * This file contains the simple skills data structure for ATS-friendly display.
 * Focuses on clean, scannable presentation without complex interactions.
 */

import { IconType } from 'react-icons';
import {
  SiAmazonwebservices,
  SiApache,
  SiApachekafka,
  SiCss3,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiGrafana,
  SiGraphql,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiJest,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiSonarqube,
  SiSpring,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si';
import { FaCloud, FaCode, FaCog, FaLightbulb } from 'react-icons/fa';

/**
 * Represents a simple skill with basic information
 */
export interface SimpleSkill {
  name: string;
  years: string;
  level: string;
  role: string;
}

/**
 * Represents a category of skills
 */
export interface SkillCategory {
  name: string;
  skills: SimpleSkill[];
}

/**
 * Icon information for a technology
 */
export interface TechIcon {
  icon: IconType;
  category: string;
  color: string;
}

/**
 * Centralized technology icon mapping
 * Add new technologies here and they'll automatically appear in all components
 */
export const TECH_ICONS: Record<string, TechIcon> = {
  java: { icon: SiOpenjdk, category: 'Language', color: '#f89820' },
  javascript: { icon: SiJavascript, category: 'Language', color: '#f7df1e' },
  typescript: { icon: SiTypescript, category: 'Language', color: '#3178c6' },
  python: { icon: SiPython, category: 'Language', color: '#3776ab' },
  'spring boot': { icon: SiSpring, category: 'Backend', color: '#6db33f' },
  'spring cloud': { icon: SiSpring, category: 'Backend', color: '#6db33f' },
  spring: { icon: SiSpring, category: 'Backend', color: '#6db33f' },
  kafka: { icon: SiApachekafka, category: 'Backend', color: '#231f20' },
  graphql: { icon: SiGraphql, category: 'Backend', color: '#e10098' },
  'rest apis': { icon: SiPostman, category: 'Backend', color: '#ff6c37' },
  api: { icon: SiPostman, category: 'Backend', color: '#ff6c37' },
  microservices: { icon: FaCog, category: 'Backend', color: '#ff6c37' },
  react: { icon: SiReact, category: 'Frontend', color: '#61dafb' },
  reactjs: { icon: SiReact, category: 'Frontend', color: '#61dafb' },
  'next.js': { icon: SiNextdotjs, category: 'Frontend', color: '#000000' },
  html5: { icon: SiHtml5, category: 'Frontend', color: '#e34f26' },
  css: { icon: SiCss3, category: 'Frontend', color: '#1572b6' },
  'tailwind css': {
    icon: SiTailwindcss,
    category: 'Frontend',
    color: '#06b6d4',
  },
  aws: { icon: SiAmazonwebservices, category: 'DevOps', color: '#ff9900' },
  azure: { icon: FaCloud, category: 'DevOps', color: '#0078d4' },
  docker: { icon: SiDocker, category: 'DevOps', color: '#2496ed' },
  kubernetes: { icon: SiKubernetes, category: 'DevOps', color: '#326ce5' },
  terraform: { icon: SiTerraform, category: 'DevOps', color: '#7b42bc' },
  'github actions': {
    icon: SiGithubactions,
    category: 'DevOps',
    color: '#2088ff',
  },
  'ci/cd': { icon: SiGithubactions, category: 'DevOps', color: '#2088ff' },
  postgresql: { icon: SiPostgresql, category: 'Database', color: '#336791' },
  mysql: { icon: SiMysql, category: 'Database', color: '#4479a1' },
  mongodb: { icon: SiMongodb, category: 'Database', color: '#47a248' },
  redis: { icon: SiRedis, category: 'Database', color: '#dc382d' },
  git: { icon: SiGit, category: 'Tools', color: '#f05032' },
  sonarqube: { icon: SiSonarqube, category: 'Tools', color: '#4e9bcd' },
  jest: { icon: SiJest, category: 'Tools', color: '#c21325' },
  intellij: { icon: SiIntellijidea, category: 'Tools', color: '#000000' },
  'vs code': { icon: FaCode, category: 'Tools', color: '#007acc' },
  maven: { icon: SiApache, category: 'Tools', color: '#c71a36' },
  grafana: { icon: SiGrafana, category: 'Tools', color: '#f46800' },
  micrometer: { icon: FaCog, category: 'Tools', color: '#6db33f' },
  postman: { icon: SiPostman, category: 'Tools', color: '#ff6c37' },
};

/**
 * Get icon information for a technology
 * @param techName - Name of the technology
 * @param fallbackColor - Fallback color if technology not found
 * @returns TechIcon object with icon, category, and color
 */
export const getTechIcon = (
  techName: string,
  fallbackColor: string = '#6b7280'
): TechIcon => {
  const normalizedName = techName.toLowerCase().trim();

  if (TECH_ICONS[normalizedName]) {
    return TECH_ICONS[normalizedName];
  }
  for (const [key, value] of Object.entries(TECH_ICONS)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value;
    }
  }

  return {
    icon: FaLightbulb,
    category: 'Other',
    color: fallbackColor,
  };
};

/**
 * Simple skills data organized by technology categories
 * Designed for ATS-friendly, clean presentation
 */
export const simpleSkillsData: { categories: SkillCategory[] } = {
  categories: [
    {
      name: 'Languages',
      skills: [
        {
          name: 'Java',
          years: '5+ years',
          level: 'Experienced',
          role: 'Backend development, microservices, enterprise applications at Lenskart & Infosys',
        },
        {
          name: 'TypeScript',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Frontend development, type-safe React applications, API integrations',
        },
        {
          name: 'JavaScript',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Full-stack development, React UIs, Node.js backends, testing frameworks',
        },
        {
          name: 'Python',
          years: '2 years',
          level: 'Learning',
          role: 'Data processing, machine learning projects, automation scripts',
        },
      ],
    },
    {
      name: 'Backend',
      skills: [
        {
          name: 'Spring Boot',
          years: '5+ years',
          level: 'Experienced',
          role: 'Microservices architecture, REST APIs, enterprise applications across all roles',
        },
        {
          name: 'Microservices',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Distributed systems, service orchestration, scalable architecture design',
        },
        {
          name: 'Kafka',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Event-driven architecture, real-time data streaming, notification systems',
        },
        {
          name: 'Redis',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Caching strategies, session management, performance optimization',
        },
        {
          name: 'PostgreSQL',
          years: '4+ years',
          level: 'Experienced',
          role: 'Primary database for enterprise applications, complex queries, data modeling',
        },
        {
          name: 'MySQL',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Relational database design, CRUD operations, banking applications',
        },
        {
          name: 'MongoDB',
          years: '2 years',
          level: 'Learning',
          role: 'NoSQL document storage, flexible schema design, modern web applications',
        },
      ],
    },
    {
      name: 'Frontend',
      skills: [
        {
          name: 'React',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Single-page applications, component libraries, user interfaces at Lenskart & Infosys',
        },
        {
          name: 'Next.js',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Server-side rendering, static site generation, modern web applications',
        },
        {
          name: 'Tailwind CSS',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Responsive design, utility-first styling, component styling',
        },
        {
          name: 'Redux',
          years: '2+ years',
          level: 'Comfortable',
          role: 'State management, complex application flows, data synchronization',
        },
      ],
    },
    {
      name: 'DevOps',
      skills: [
        {
          name: 'Docker',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Containerization, deployment automation, development environment consistency',
        },
        {
          name: 'Kubernetes',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Container orchestration, scalable deployments, cloud-native applications',
        },
        {
          name: 'AWS',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Cloud infrastructure, serverless computing, storage solutions at Backbase',
        },
        {
          name: 'GitHub Actions',
          years: '2+ years',
          level: 'Comfortable',
          role: 'CI/CD pipelines, automated testing, deployment workflows',
        },
        {
          name: 'Grafana',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Custom monitoring dashboards, performance metrics, system observability',
        },
      ],
    },
    {
      name: 'System Design',
      skills: [
        {
          name: 'Event-Driven Architecture',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Scalable system design, loose coupling, real-time processing',
        },
        {
          name: 'API Gateway',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Service mesh, request routing, authentication & authorization',
        },
        {
          name: 'Caching Strategies',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Performance optimization, data layer efficiency, response time improvement',
        },
        {
          name: 'Rate Limiting',
          years: '2+ years',
          level: 'Comfortable',
          role: 'API protection, traffic management, system stability',
        },
        {
          name: 'SAGA Pattern',
          years: '2+ years',
          level: 'Learning',
          role: 'Distributed transaction management, microservices coordination',
        },
      ],
    },
    {
      name: 'Computer Science',
      skills: [
        {
          name: 'Data Structures & Algorithms',
          years: '5+ years',
          level: 'Experienced',
          role: 'Problem solving, optimization, technical interviews, core programming foundation',
        },
        {
          name: 'Object-Oriented Programming',
          years: '5+ years',
          level: 'Experienced',
          role: 'Code organization, design patterns, maintainable software architecture',
        },
        {
          name: 'SOLID Principles',
          years: '5+ years',
          level: 'Experienced',
          role: 'Clean code practices, software design, maintainable enterprise applications',
        },
        {
          name: 'Concurrency',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Multi-threaded applications, parallel processing, performance optimization',
        },
        {
          name: 'Multithreading',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Concurrent programming, thread safety, high-performance applications',
        },
      ],
    },
  ],
};

/**
 * Helper function to get all skills flattened from categories
 */
export const getAllSimpleSkills = (): SimpleSkill[] => {
  return simpleSkillsData.categories.flatMap(category => category.skills);
};

/**
 * Legacy skills data structure for backward compatibility
 * Used by Stack.tsx and StructuredData.tsx
 */
export interface LegacySkill {
  name: string;
  rating: number;
}

/**
 * Convert simple skills to legacy format with ratings
 * Maps experience levels to numeric ratings for backward compatibility
 */
export const getLegacySkills = (): LegacySkill[] => {
  const levelToRating = {
    Experienced: 9,
    Comfortable: 8,
    Learning: 7,
  };

  return getAllSimpleSkills().map(skill => ({
    name: skill.name,
    rating: levelToRating[skill.level as keyof typeof levelToRating] || 7,
  }));
};

/**
 * Get high-rated skills for daily stack (rating >= 8)
 * Used by Stack.tsx component
 */
export const getDailyStackSkills = (): string[] => {
  return getLegacySkills()
    .filter(skill => skill.rating >= 8)
    .map(skill => skill.name);
};

/**
 * Get all skill names for SEO structured data
 * Used by StructuredData.tsx component
 */
export const getSkillNamesForSEO = (): string[] => {
  return getAllSimpleSkills().map(skill => skill.name);
};
