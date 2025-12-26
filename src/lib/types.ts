/**
 * Shared type definitions for the terminal portfolio application.
 * These types are used across multiple components to ensure type safety and consistency.
 */

/**
 * Represents a GitHub repository with all relevant metadata.
 * Used by Projects component and ProjectCard.
 */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name?: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  size?: number;
  fork?: boolean;
  private?: boolean;
  owner?: {
    login: string;
  };
}

/**
 * Represents an educational qualification.
 * Used by Education component and EducationCard.
 */
export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  description?: string;
  relevantCourses?: string[];
}

/**
 * Represents contact information for the portfolio owner.
 * Used by Contact component.
 */
export interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  role?: string;
  company?: string;
  experience?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
}

/**
 * Represents a professional certification.
 * Used by Certifications component and CertificationCard.
 */
export interface Certification {
  name: string;
  issuer: string;
  month: string;
  year: string;
  credentialId?: string | null;
  skills?: string[];
  url?: string | null;
}

/**
 * Represents the status of a project based on its last update.
 * Used by Projects component to display project activity status.
 */
export interface ProjectStatus {
  icon: string;
  label: string;
  color: string;
}

/**
 * Proficiency level for skills.
 * Used by SkillCard component.
 */
export type ProficiencyLevel = 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';

/**
 * Represents a skill with proficiency level and metadata.
 * Used by SkillCard component.
 */
export interface Skill {
  name: string;
  proficiency: ProficiencyLevel;
  yearsOfExperience?: number;
  description?: string;
  isDaily?: boolean;
}

/**
 * Represents a professional achievement or milestone.
 * Used by Achievements component.
 */
export interface Achievement {
  description: string;
  impact: string;
}

/**
 * Represents a blog post or article.
 * Used by Blog component.
 */
export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  url?: string;
  category: string;
}
