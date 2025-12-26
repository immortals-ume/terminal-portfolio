/**
 * Simple Skills Data Structure
 *
 * This file contains the simple skills data structure for ATS-friendly display.
 * Focuses on clean, scannable presentation without complex interactions.
 */

import { IconBaseProps, IconType } from 'react-icons';
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
  SiRedux,
  SiSonarqube,
  SiSpring,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si';
import { FaCloud, FaCode, FaCog, FaLightbulb, FaVial } from 'react-icons/fa';
import { ReactNode } from 'react';

/**
 * Represents a simple skill with basic information
 */
export interface Skill {
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
  skills: Skill[];
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
  /* =======================
   * Languages
   * ======================= */
  java: { icon: SiOpenjdk, category: 'Language', color: '#f89820' },
  'java 17': { icon: SiOpenjdk, category: 'Language', color: '#f89820' },
  javascript: { icon: SiJavascript, category: 'Language', color: '#f7df1e' },
  typescript: { icon: SiTypescript, category: 'Language', color: '#3178c6' },
  python: { icon: SiPython, category: 'Language', color: '#3776ab' },
  html: { icon: SiHtml5, category: 'Frontend', color: '#e34f26' },
  html5: { icon: SiHtml5, category: 'Frontend', color: '#e34f26' },
  css: { icon: SiCss3, category: 'Frontend', color: '#1572b6' },
  css3: { icon: SiCss3, category: 'Frontend', color: '#1572b6' },

  /* =======================
   * Backend / Frameworks
   * ======================= */
  spring: { icon: SiSpring, category: 'Backend', color: '#6db33f' },
  'spring boot': { icon: SiSpring, category: 'Backend', color: '#6db33f' },
  'spring cloud': { icon: SiSpring, category: 'Backend', color: '#6db33f' },
  'spring security': { icon: SiSpring, category: 'Backend', color: '#6db33f' },
  'spring batch': { icon: SiSpring, category: 'Backend', color: '#6db33f' },
  'spring mail': { icon: SiSpring, category: 'Backend', color: '#6db33f' },

  kafka: { icon: SiApachekafka, category: 'Backend', color: '#231f20' },
  graphql: { icon: SiGraphql, category: 'Backend', color: '#e10098' },

  api: { icon: SiPostman, category: 'Backend', color: '#ff6c37' },
  'rest api': { icon: SiPostman, category: 'Backend', color: '#ff6c37' },
  'rest apis': { icon: SiPostman, category: 'Backend', color: '#ff6c37' },

  microservices: { icon: FaCog, category: 'Backend', color: '#ff6c37' },

  /* =======================
   * Frontend
   * ======================= */
  react: { icon: SiReact, category: 'Frontend', color: '#61dafb' },
  reactjs: { icon: SiReact, category: 'Frontend', color: '#61dafb' },
  redux: { icon: SiRedux, category: 'Frontend', color: '#764abc' },
  'tailwind css': {
    icon: SiTailwindcss,
    category: 'Frontend',
    color: '#06b6d4',
  },
  'next.js': { icon: SiNextdotjs, category: 'Frontend', color: '#000000' },

  /* =======================
   * Databases & Caching
   * ======================= */
  postgresql: { icon: SiPostgresql, category: 'Database', color: '#336791' },
  mysql: { icon: SiMysql, category: 'Database', color: '#4479a1' },
  mongodb: { icon: SiMongodb, category: 'Database', color: '#47a248' },
  redis: { icon: SiRedis, category: 'Database', color: '#dc382d' },

  /* =======================
   * DevOps & Cloud
   * ======================= */
  aws: { icon: SiAmazonwebservices, category: 'DevOps', color: '#ff9900' },
  ec2: { icon: SiAmazonwebservices, category: 'DevOps', color: '#ff9900' },
  eks: { icon: SiAmazonwebservices, category: 'DevOps', color: '#ff9900' },
  s3: { icon: SiAmazonwebservices, category: 'DevOps', color: '#ff9900' },
  rds: { icon: SiAmazonwebservices, category: 'DevOps', color: '#ff9900' },

  azure: { icon: FaCloud, category: 'DevOps', color: '#0078d4' },
  'azure ad': { icon: FaCloud, category: 'DevOps', color: '#0078d4' },
  'azure active directory': {
    icon: FaCloud,
    category: 'DevOps',
    color: '#0078d4',
  },
  'blob storage': { icon: FaCloud, category: 'DevOps', color: '#0078d4' },

  docker: { icon: SiDocker, category: 'DevOps', color: '#2496ed' },
  kubernetes: { icon: SiKubernetes, category: 'DevOps', color: '#326ce5' },
  k8s: { icon: SiKubernetes, category: 'DevOps', color: '#326ce5' },

  terraform: { icon: SiTerraform, category: 'DevOps', color: '#7b42bc' },

  'github actions': {
    icon: SiGithubactions,
    category: 'DevOps',
    color: '#2088ff',
  },
  'ci/cd': { icon: SiGithubactions, category: 'DevOps', color: '#2088ff' },

  /* =======================
   * Monitoring & Quality
   * ======================= */
  grafana: { icon: SiGrafana, category: 'Tools', color: '#f46800' },
  micrometer: { icon: FaCog, category: 'Tools', color: '#6db33f' },
  sonarqube: { icon: SiSonarqube, category: 'Tools', color: '#4e9bcd' },

  // junit: { icon: SiJUnit5, category: 'Tools', color: '#25a162' },
  mockito: { icon: FaVial, category: 'Tools', color: '#78c257' },
  jest: { icon: SiJest, category: 'Tools', color: '#c21325' },

  maven: { icon: SiApache, category: 'Tools', color: '#c71a36' },
  // liquibase: { icon: SiLiquibase, category: 'Tools', color: '#2962ff' },

  git: { icon: SiGit, category: 'Tools', color: '#f05032' },
  github: { icon: SiGithub, category: 'Tools', color: '#000000' },
  postman: { icon: SiPostman, category: 'Tools', color: '#ff6c37' },
  intellij: { icon: SiIntellijidea, category: 'Tools', color: '#000000' },
  'vs code': { icon: FaCode, category: 'Tools', color: '#007acc' },
  vscode: { icon: FaCode, category: 'Tools', color: '#007acc' },
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
 *  skills data organized by technology categories
 * Designed for ATS-friendly, clean presentation
 */
export const skillsData: { categories: SkillCategory[] } = {
  categories: [
    {
      name: 'Programming Languages',
      skills: [
        {
          name: 'Java (Java 17)',
          years: '4.6+ years',
          level: 'Experienced',
          role: 'Backend development, microservices, enterprise applications at Lenskart, Backbase & Infosys',
        },
        {
          name: 'JavaScript',
          years: '4.6+ years',
          level: 'Comfortable',
          role: 'Full-stack development, React UIs, Node.js services, testing frameworks',
        },
        {
          name: 'TypeScript',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Type-safe React applications, scalable frontend architecture, API integrations',
        },
        {
          name: 'Python',
          years: '1+ years',
          level: 'Learning',
          role: 'Data processing, automation scripts, machine learning & quantum computing projects',
        },
        {
          name: 'HTML5 & CSS3',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Responsive UI development, frontend layout and styling',
        },
      ],
    },

    {
      name: 'Backend & Distributed Systems',
      skills: [
        {
          name: 'Spring Boot',
          years: '4.6+ years',
          level: 'Experienced',
          role: 'REST APIs, microservices, enterprise-grade backend systems',
        },
        {
          name: 'Spring Cloud',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Service discovery, configuration management, distributed systems',
        },
        {
          name: 'Spring Security',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Authentication, authorization, OAuth2, JWT-based security',
        },
        {
          name: 'Spring Batch',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Batch processing, ETL jobs, scheduled enterprise workflows',
        },
        {
          name: 'Kafka',
          years: '4.6+ years',
          level: 'Experienced',
          role: 'Event-driven architecture, async processing, notification systems',
        },
        {
          name: 'Microservices Architecture',
          years: '4.6+ years',
          level: 'Experienced',
          role: 'Scalable system design, inter-service communication, fault tolerance',
        },
      ],
    },

    {
      name: 'Databases & Caching',
      skills: [
        {
          name: 'PostgreSQL',
          years: '4.6+ years',
          level: 'Experienced',
          role: 'Primary relational database, data modeling, complex queries',
        },
        {
          name: 'MySQL',
          years: '4.6+ years',
          level: 'Experienced',
          role: 'Relational database design, transactional systems',
        },
        {
          name: 'MongoDB',
          years: '2+ years',
          level: 'Comfortable',
          role: 'NoSQL document databases, flexible schema design',
        },
        {
          name: 'Redis',
          years: '4.6+ years',
          level: 'Experienced',
          role: 'Caching strategies, session management, performance optimization',
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
          role: 'Single-page applications, component-based UI development',
        },
        {
          name: 'Redux',
          years: '2+ years',
          level: 'Comfortable',
          role: 'State management, complex UI workflows',
        },
        {
          name: 'Tailwind CSS',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Utility-first CSS, responsive and scalable UI design',
        },
      ],
    },

    {
      name: 'DevOps & Cloud',
      skills: [
        {
          name: 'Docker',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Containerization, local & production deployments',
        },
        {
          name: 'Kubernetes (K8s)',
          years: '3+ years',
          level: 'Comfortable',
          role: 'Container orchestration, scalable cloud-native systems',
        },
        {
          name: 'AWS',
          years: '3+ years',
          level: 'Comfortable',
          role: 'EC2, EKS, S3, RDS, cloud infrastructure at Backbase',
        },
        {
          name: 'Azure',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Azure Active Directory, Blob Storage, enterprise authentication',
        },
        {
          name: 'Terraform',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Infrastructure as Code, cloud resource automation',
        },
        {
          name: 'GitHub Actions',
          years: '2+ years',
          level: 'Comfortable',
          role: 'CI/CD pipelines, automated testing & deployments',
        },
      ],
    },

    {
      name: 'Monitoring, Logging & Quality',
      skills: [
        {
          name: 'Grafana',
          years: '2+ years',
          level: 'Comfortable',
          role: 'System dashboards, latency & performance monitoring',
        },
        {
          name: 'Micrometer',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Custom metrics instrumentation in Spring Boot services',
        },
        {
          name: 'SonarQube',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Code quality analysis, technical debt tracking',
        },
      ],
    },

    {
      name: 'Testing & Developer Tools',
      skills: [
        {
          name: 'JUnit & Mockito',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Unit testing, mocking, backend test automation',
        },
        {
          name: 'Jest',
          years: '2+ years',
          level: 'Comfortable',
          role: 'Frontend testing for React applications',
        },
        {
          name: 'Maven ',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Build automation, database versioning',
        },
        {
          name: 'Liquibase',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Build automation, database versioning',
        },
        {
          name: 'Developer Tools',
          years: '5+ years',
          level: 'Experienced',
          role: 'IntelliJ IDEA, VS Code, Postman, Git, GitHub',
        },
      ],
    },

    {
      name: 'Computer Science & System Design',
      skills: [
        {
          name: 'Data Structures & Algorithms',
          years: '5+ years',
          level: 'Experienced',
          role: 'Problem solving, optimization, interview preparation',
        },
        {
          name: 'Object-Oriented Programming',
          years: '5+ years',
          level: 'Experienced',
          role: 'Clean architecture, extensible system design',
        },
        {
          name: 'SOLID Principles & Design Patterns',
          years: '5+ years',
          level: 'Experienced',
          role: 'Maintainable, scalable enterprise software',
        },
        {
          name: 'Concurrency & Multithreading',
          years: '4+ years',
          level: 'Comfortable',
          role: 'Thread safety, async processing, performance optimization',
        },
        {
          name: 'System Design',
          years: '4+ years',
          level: 'Comfortable',
          role: 'High-level design, scalability, consistency, fault tolerance',
        },
      ],
    },
  ],
};

/**
 * Helper function to get all skills flattened from categories
 */
export const getAllSkills = (): Skill[] => {
  return skillsData.categories.flatMap(category => category.skills);
};

function SiGithub(props: IconBaseProps): ReactNode {
    throw new Error('Function not implemented.');
}

