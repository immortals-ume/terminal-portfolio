/**
 * Enhanced Skills Data Structure
 *
 * This file contains the enhanced skills data with proficiency levels,
 * years of experience, descriptions, icons, and daily stack markers.
 */

import type { ProficiencyLevel, Skill } from '@/lib/types';

// Re-export types for backward compatibility
export type { ProficiencyLevel, Skill };

export interface CategoryData {
    name: string;
    icon: string;
    skills: Skill[];
}

export interface SkillsData {
    categories: CategoryData[];
    dailyStack: string[];
}

/**
 * Proficiency level configuration mapping
 */
export const proficiencyConfig = {
    Expert: {
        percentage: 100,
        label: 'Expert',
        icon: '⭐⭐⭐'
    },
    Advanced: {
        percentage: 75,
        label: 'Advanced',
        icon: '⭐⭐'
    },
    Intermediate: {
        percentage: 50,
        label: 'Intermediate',
        icon: '⭐'
    },
    Beginner: {
        percentage: 25,
        label: 'Beginner',
        icon: '○'
    }
} as const;

/**
 * Enhanced skills data with proficiency levels and metadata
 */
export const skillsDataEnhanced: SkillsData = {
    categories: [
        {
            name: 'Languages',
            icon: '💻',
            skills: [
                {
                    name: 'Java 21',
                    proficiency: 'Expert',
                    yearsOfExperience: 5,
                    description: 'Multithreading & concurrency patterns, JVM tuning & GC optimization, Stream API & functional programming, Design patterns implementation',
                    isDaily: true
                },
                {
                    name: 'TypeScript',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Type-safe development, advanced types, generics, decorators, and modern ES features',
                    isDaily: true
                },
                {
                    name: 'JavaScript (ES6+)',
                    proficiency: 'Advanced',
                    yearsOfExperience: 4,
                    description: 'Modern JavaScript features, async/await, promises, closures, and functional programming',
                    isDaily: false
                },
                {
                    name: 'Python',
                    proficiency: 'Intermediate',
                    yearsOfExperience: 2,
                    description: 'Scripting, automation, data processing, and backend development',
                    isDaily: false
                }
            ]
        },
        {
            name: 'Backend',
            icon: '⚙️',
            skills: [
                {
                    name: 'Spring Boot 3',
                    proficiency: 'Expert',
                    yearsOfExperience: 5,
                    description: 'Built Bulk Order & Gift Voucher microservices, Kafka event-driven integration, Redis caching + rate limiting, Micrometer + Grafana observability, Designed scalable REST APIs',
                    isDaily: true
                },
                {
                    name: 'Spring Cloud',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Microservices architecture, service discovery, config management, circuit breakers',
                    isDaily: false
                },
                {
                    name: 'Microservices',
                    proficiency: 'Advanced',
                    yearsOfExperience: 4,
                    description: 'Distributed systems design, service communication, API gateway patterns',
                    isDaily: true
                },
                {
                    name: 'Kafka',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Producer/Consumer with partitions & groups, DLQ, retries, idempotent consumers, Exactly-once semantics, Order pipeline for high throughput systems',
                    isDaily: true
                },
                {
                    name: 'Redis',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Caching strategies, session management, pub/sub, rate limiting',
                    isDaily: true
                },
                {
                    name: 'Hibernate/JPA',
                    proficiency: 'Advanced',
                    yearsOfExperience: 4,
                    description: 'ORM mapping, query optimization, lazy loading, caching strategies',
                    isDaily: false
                },
                {
                    name: 'MySQL',
                    proficiency: 'Advanced',
                    yearsOfExperience: 4,
                    description: 'Database design, query optimization, indexing, replication',
                    isDaily: false
                },
                {
                    name: 'PostgreSQL',
                    proficiency: 'Expert',
                    yearsOfExperience: 4,
                    description: 'Query optimization & indexing, ACID transactions, Replication & backup strategies, JSON & advanced data types',
                    isDaily: true
                },
                {
                    name: 'MongoDB',
                    proficiency: 'Intermediate',
                    yearsOfExperience: 2,
                    description: 'NoSQL database design, aggregation pipelines, indexing strategies',
                    isDaily: false
                }
            ]
        },
        {
            name: 'Frontend',
            icon: '🎨',
            skills: [
                {
                    name: 'React',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Theme provider + custom hooks, Optimized re-render cycles, Built reusable component library, Used Redux Toolkit + Zustand',
                    isDaily: true
                },
                {
                    name: 'Next.js',
                    proficiency: 'Advanced',
                    yearsOfExperience: 2,
                    description: 'SSR, SSG, API routes, app router, performance optimization',
                    isDaily: true
                },
                {
                    name: 'Redux Toolkit',
                    proficiency: 'Advanced',
                    yearsOfExperience: 2,
                    description: 'State management, RTK Query, slices, middleware',
                    isDaily: false
                },
                {
                    name: 'Tailwind CSS',
                    proficiency: 'Advanced',
                    yearsOfExperience: 2,
                    description: 'Utility-first CSS, responsive design, custom configurations',
                    isDaily: true
                }
            ]
        },
        {
            name: 'DevOps',
            icon: '🚀',
            skills: [
                {
                    name: 'Docker',
                    proficiency: 'Advanced',
                    yearsOfExperience: 4,
                    description: 'Multi-stage builds, Docker Compose orchestration, Container optimization, Registry management',
                    isDaily: true
                },
                {
                    name: 'Kubernetes',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Deployment & StatefulSets, Service mesh & networking, Helm charts, Scaling & monitoring',
                    isDaily: false
                },
                {
                    name: 'AWS',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'EC2, S3, IAM, CloudWatch, RDS, VPC, Load Balancing, Lambda, API Gateway, Infrastructure as Code',
                    isDaily: true
                },
                {
                    name: 'Grafana',
                    proficiency: 'Advanced',
                    yearsOfExperience: 2,
                    description: 'Dashboard creation, alerting, data source integration, visualization',
                    isDaily: true
                },
                {
                    name: 'Prometheus',
                    proficiency: 'Intermediate',
                    yearsOfExperience: 2,
                    description: 'Metrics collection, PromQL, alerting rules, service monitoring',
                    isDaily: false
                },
                {
                    name: 'GitHub Actions',
                    proficiency: 'Advanced',
                    yearsOfExperience: 2,
                    description: 'CI/CD pipelines, workflow automation, custom actions',
                    isDaily: true
                },
                {
                    name: 'Jenkins',
                    proficiency: 'Intermediate',
                    yearsOfExperience: 2,
                    description: 'Pipeline as code, build automation, deployment orchestration',
                    isDaily: false
                }
            ]
        },
        {
            name: 'System Design',
            icon: '🏗️',
            skills: [
                {
                    name: 'Event-Driven Architecture',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Event sourcing, CQRS, message-driven systems',
                    isDaily: true
                },
                {
                    name: 'CQRS',
                    proficiency: 'Advanced',
                    yearsOfExperience: 2,
                    description: 'Command Query Responsibility Segregation, read/write separation',
                    isDaily: false
                },
                {
                    name: 'SAGA Pattern',
                    proficiency: 'Advanced',
                    yearsOfExperience: 2,
                    description: 'Distributed transactions, compensation logic, orchestration vs choreography',
                    isDaily: false
                },
                {
                    name: 'API Gateway',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Request routing, authentication, rate limiting, API composition',
                    isDaily: true
                },
                {
                    name: 'Caching Strategies',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Redis caching, CDN, cache invalidation, distributed caching',
                    isDaily: true
                },
                {
                    name: 'Rate Limiting',
                    proficiency: 'Advanced',
                    yearsOfExperience: 2,
                    description: 'Token bucket, sliding window, distributed rate limiting',
                    isDaily: true
                },
                {
                    name: 'Distributed Transactions',
                    proficiency: 'Intermediate',
                    yearsOfExperience: 2,
                    description: '2PC, SAGA, eventual consistency patterns',
                    isDaily: false
                }
            ]
        },
        {
            name: 'Computer Science',
            icon: '📚',
            skills: [
                {
                    name: 'Data Structures & Algorithms',
                    proficiency: 'Advanced',
                    yearsOfExperience: 5,
                    description: 'Trees, graphs, dynamic programming, sorting, searching',
                    isDaily: false
                },
                {
                    name: 'Object-Oriented Programming',
                    proficiency: 'Expert',
                    yearsOfExperience: 5,
                    description: 'Design patterns, inheritance, polymorphism, encapsulation',
                    isDaily: true
                },
                {
                    name: 'SOLID Principles',
                    proficiency: 'Expert',
                    yearsOfExperience: 5,
                    description: 'Single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion',
                    isDaily: true
                },
                {
                    name: 'Concurrency',
                    proficiency: 'Advanced',
                    yearsOfExperience: 4,
                    description: 'Thread safety, synchronization, locks, concurrent collections',
                    isDaily: true
                },
                {
                    name: 'Multithreading',
                    proficiency: 'Advanced',
                    yearsOfExperience: 4,
                    description: 'Thread pools, executors, parallel processing, race conditions',
                    isDaily: true
                },
                {
                    name: 'JVM Internals',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'Memory model, class loading, bytecode, JIT compilation',
                    isDaily: false
                },
                {
                    name: 'Garbage Collection',
                    proficiency: 'Advanced',
                    yearsOfExperience: 3,
                    description: 'GC algorithms, tuning, memory leaks, heap analysis',
                    isDaily: false
                }
            ]
        }
    ],
    dailyStack: [
        'Java 21',
        'TypeScript',
        'Spring Boot 3',
        'Microservices',
        'Kafka',
        'Redis',
        'PostgreSQL',
        'React',
        'Next.js',
        'Tailwind CSS',
        'Docker',
        'AWS',
        'Grafana',
        'GitHub Actions',
        'Event-Driven Architecture',
        'API Gateway',
        'Caching Strategies',
        'Rate Limiting',
        'Object-Oriented Programming',
        'SOLID Principles',
        'Concurrency',
        'Multithreading'
    ]
};

/**
 * Helper function to get all skills flattened from categories
 */
export const getAllSkills = (): Skill[] => {
    return skillsDataEnhanced.categories.flatMap(category => category.skills);
};

/**
 * Helper function to get skills by category name
 */
export const getSkillsByCategory = (categoryName: string): Skill[] => {
    const category = skillsDataEnhanced.categories.find(
        cat => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    return category?.skills || [];
};

/**
 * Helper function to get skills by proficiency level
 */
export const getSkillsByProficiency = (proficiency: ProficiencyLevel): Skill[] => {
    return getAllSkills().filter(skill => skill.proficiency === proficiency);
};

/**
 * Helper function to get daily stack skills
 */
export const getDailyStackSkills = (): Skill[] => {
    return getAllSkills().filter(skill => skill.isDaily === true);
};

/**
 * Helper function to get all unique categories
 */
export const getCategories = (): string[] => {
    return skillsDataEnhanced.categories.map(cat => cat.name);
};

/**
 * Helper function to get all unique proficiency levels
 */
export const getProficiencyLevels = (): ProficiencyLevel[] => {
    return ['Expert', 'Advanced', 'Intermediate', 'Beginner'];
};
