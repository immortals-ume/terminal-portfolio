import type { Achievement, BlogPost } from '@/lib/types';

export const personalInfo = {
  name: 'Kapil Srivastava',
  email: 'Available upon request',
  phone: 'Available upon request',
  location: 'Gurugram, India',
  role: 'Software Development Engineer ',
  company: 'Lenskart',
  experience: '4.6 years',
  github: 'immortals-ume',
  linkedin: 'kapil-srivastava-72911-di',
  leetcode: 'Ayanokoji09',
  website: 'https://kapilsrivastava.dev',
  summary:
    'Experienced Software Development Engineer with 4.6+ years of expertise in building scalable backend systems and microservices. Proven track record of delivering high-impact features that drive 40% engagement increases and optimize system performance by 85%. Skilled in Java, Spring Boot, React, and cloud technologies with experience across e-commerce, fintech, and enterprise domains. Currently pursuing advanced studies in Quantum Computing at IIT Madras while contributing to innovative solutions at Lenskart.',
};

export const workExperience = [
  {
    period: 'Aug 2025 - Present',
    description:
      'Career Break , Professional Development Focused on structured upskilling through industry-recognized certifications and hands-on learning in AI, Machine Learning, Generative AI, Quantum Computing',
  },
  {
    period: 'Feb 2024 - Jul 2025',
    role: 'Software Development Engineer 1 (TECH@LENSKART)',
    company: 'Lenskart',
    type: 'Full-time',
    location: 'India',
    description:
      'Working on backend development and system integrations for e-commerce platform',
    technologies: [
      'Java',
      'Spring Boot',
      'ReactJS',
      'Kafka',
      'Micrometer',
      'Grafana',
      'Aws',
    ],
    achievements: [
      'Integrated Sprinklr based automated ticketing into internal dashboards, significantly reducing manual operational effort and streamlining customer support workflows.',
      'Designed and implemented the backend for the Salesmen Skill Set module, enabling granular tracking and assessment of individual capabilities to support data-driven performance management.',
      'Built a custom monitoring and alerting platform using Micrometer, Grafana, and internal UI dashboards, enabling faster incident detection and more effective operational response.',
      'Developed and launched the Free Gift Product feature using ReactJS with full backend API support, improving user engagement and enhancing the overall purchase experience.',
      'Engineered backend workflows for Gift Voucher campaigns in collaboration with product and marketing teams, enabling scalable, configurable campaigns and improving customer engagement.',
      'Led backend API design and development for the Bulk Order system, improving usability, reliability, and adoption through well-defined service contracts and coordinated backend flows.',
      'Owned code quality and design standards by leading Sonarqube driven code reviews and structured peer sessions, preventing production issues and mentoring junior engineers on clean architecture and best practices.',
      'Partnered with product and business stakeholders to translate requirements into scalable backend solutions, balancing delivery speed with long-term maintainability and system design correctness.',
      'Participated in backend hiring by conducting technical interviews, contributing to team growth while maintaining high engineering and design standards.',
    ],
    projects: [
      {
        name: 'Sprinklr Integration',
        description:
          'Integrated Sprinklr for automated ticketing in internal dashboards to streamline customer support operations.',
      },
      {
        name: 'Salesmen Skill Set Module',
        description:
          'Engineered backend module to enable granular tracking and evaluation of sales capabilities.',
      },
      {
        name: 'Custom Monitoring Suite',
        description:
          'Developed custom dashboards using Micrometer and Grafana for internal service monitoring.',
      },
      {
        name: 'Free Gift Product Feature',
        description:
          'Implemented end-to-end feature using ReactJS and backend APIs, improving engagement by 40%.',
      },
      {
        name: 'Gift Voucher Campaigns',
        description:
          'Built scalable backend workflows and APIs for campaign management, increasing engagement by 40%.',
      },
      {
        name: 'Bulk Order System',
        description:
          'Led backend development using Spring Boot, Java, and Kafka for efficient bulk order handling.',
      },
    ],
  },
  {
    period: 'Oct 2023 - Jan 2024',
    description: 'Career Break',
  },
  {
    period: 'May 2023 - Sep 2023',
    role: 'Backend Engineer',
    company: 'Backbase',
    type: 'Full-time',
    location: 'India',
    description:
      'Developed backend services and APIs for financial technology platform.',
    technologies: [
      'Spring Boot',
      'AWS',
      'Kubernetes',
      'QueryDSL',
      'SonarQube',
      'Aws',
    ],
    achievements: [
      'Designed and documented Low-Level Designs (LLDs) and OpenAPI specifications for client-facing and internal APIs, establishing clear service contracts and enabling faster, parallel development across teams.',
      'Built high-throughput payment and data-integration services using Spring Boot and the BillDesk platform, focusing on low latency, idempotency, and reliable transaction processing.',
      'Deployed and operated microservices on AWS EKS (Kubernetes), integrating AWS Secrets Manager into CI/CD pipelines to ensure secure configuration management and reliable production deployments.',
      'Developed a reusable Feign-based internal SDK to standardize service-to-service communication, reducing duplicated logic and improving consistency across the microservices ecosystem.',
      'Implemented flexible, performant data access layers using QueryDSL, enabling dynamic filtering while preserving clean repository abstractions and query efficiency.',
      'Owned code quality and design standards by leading SonarQube-driven code reviews and structured peer sessions, preventing production issues and mentoring junior engineers on clean architecture and best practices.',
      'Partnered with product and business stakeholders to translate requirements into scalable backend solutions, balancing delivery speed with long-term maintainability and system design correctness.',
    ],
    projects: [
      {
        name: 'HDFC Net-Banking Platform',
        description:
          'Scalable online banking platform enhancing digital payment experience and transaction reliability for retail customers.',
      },
    ],
  },
  {
    period: 'Apr 2022 - Apr 2023',
    role: 'Senior Systems Engineer',
    company: 'Infosys',
    type: 'Full-time',
    location: 'Remote',
    description:
      'Led backend and system integration initiatives, improving scalability, resilience, and performance across enterprise solutions.',
    technologies: [
      'Java',
      'Spring Boot',
      'ReactJS',
      'Kafka',
      'Azure AD',
      'Redis',
      'Liquibase',
      'Docker',
      'Kubernetes',
      'Mockito',
      'Spring Batch',
      'Spring Mail',
    ],
    achievements: [
      'Integrated Azure Active Directory (AAD) with a Spring Boot backend and a custom React-based UI, implementing enterprise-grade authentication and authorization to strengthen security and access control.',
      'Designed and implemented a batch processing system using Spring Batch and SFTP to handle large-scale data ingestion and transformation efficiently and reliably.',
      'Wrote and maintained comprehensive unit tests using Mockito and actively practiced test-driven development (TDD) to improve code correctness and long-term system reliability.',
      'Managed database schema evolution using Liquibase and supported containerized deployments using Docker and Kubernetes across multiple environments.',
      'Collaborated closely with cross-functional teams in Agile ceremonies, contributing to end-to-end feature development, design reviews, and CI/CD-driven delivery pipelines.',
    ],
    projects: [
      {
        name: 'Regulatory Data Tracking (RDT)',
        description:
          'Centralized system improving regulatory compliance, audit transparency, and operational efficiency across business units.',
      },
    ],
  },
  {
    period: 'Oct 2020 - Apr 2022',
    role: 'Systems Engineer',
    company: 'INFOSYS',
    type: 'Full-time',
    location: 'Remote',
    description:
      'Contributed to full-stack enterprise projects, ensuring performance, maintainability, and scalability of web applications.',
    technologies: [
      'Java',
      'Spring Boot',
      'ReactJS',
      'Redux',
      'Swagger',
      'SQL',
      'Jest',
      'Mockito',
      'REST APIs',
    ],
    achievements: [
      'Built a scalable, event-driven notification system using Kafka and Spring Mail, enabling reliable asynchronous communication and high system availability.',
      'Developed a fault-tolerant file integration layer using Azure Blob Storage, strengthening document processing reliability and operational resilience.',
      'Designed reusable and modular ReactJS components for single-page applications, integrating Redux and React Router to support predictable state management and navigation.',
      'Diagnosed and resolved high-priority production issues in live systems under strict SLAs, maintaining system stability through effective debugging and root-cause analysis.',
    ],
    projects: [
      {
        name: 'Regulatory Data Tracking (RDT)',
        description:
          'Centralized system improving regulatory compliance, audit transparency, and operational efficiency across business units.',
      },
    ],
  },
  {
    period: 'Jan 2020 - Mar 2020',
    role: 'Engineer Intern',
    company: 'INFOSYS',
    type: 'Internship',
    location: 'Remote',
    description:
      'Worked on foundational backend systems and microservice integrations during internship tenure.',
    technologies: ['Java', 'Spring Boot', 'SQL'],
    achievements: [],
  },
];

export const education = [
  {
    degree: 'Executive Education programs in Quantum Computing From CODE',
    institution: 'Indian Institute of Technology, Madras',
    period: 'Aug 2025 - Apr 2026',
    description:
      'Executive Program from CODE focusing on Quantum Computing fundamentals and applications.',
    relevantCourses: [
      'Math prelims, quantum mechanics fundamentals, intro to qubits & Bloch sphere',
      'Two-qubit gates, Bell states, teleportation, physical realizations of qubits',
      'IBM Q & Qiskit, Deutsch–Jozsa, Grover search, Simon’s & Bernstein–Vazirani algorithms',
      'QFT & phase estimation, order finding & factoring, amplitude amplification, HHL algorithm',
      'Quantum cryptography (BB84), variational quantum algorithms, and error mitigation for NISQ systems',
      'Quantum ML, Qiskit runtime, transpiling & circuit cutting, quantum communication protocols, optimization on quantum computers',
    ],
  },
  {
    degree:
      'Bachelor of Technology (BTech) in Computer Science and Engineering',
    institution: 'SRM Institute of Science and Technology (SRM IST Chennai)',
    period: 'May 2016 - Jun 2020',
    gpa: 'Good Academic Standing',
    relevantCourses: [
      'Data Structures & Algorithms',
      'Software Engineering',
      'Database Management Systems',
      'Computer Networks',
      'Operating Systems',
      'Object-Oriented Programming',
    ],
  },
];

export const projects = [
  {
    name: 'HDFC Net-Banking Platform',
    description:
      'Scalable online banking platform enhancing digital payment experience and transaction reliability for retail customers (Professional Project)',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'React'],
    category: 'Professional Work',
  },
  {
    name: 'Regulatory Data Tracking (RDT)',
    description:
      'Centralized system improving regulatory compliance, audit transparency, and operational efficiency (Professional Project)',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Microservices'],
    category: 'Professional Work',
  },
];

export const certifications = [
  {
    name: '5-Day AI Agents Intensive Course with Google',
    issuer: 'Kaggle',
    year: '2025',
    month: 'December',
    credentialId: null,
    url: 'https://www.kaggle.com/certification/badges/kapish27/105',
    skills: ['AI Agents', 'Generative AI', 'LLMs', 'Prompt Engineering'],
  },
  {
    name: 'Deep Learning with Keras and TensorFlow',
    issuer: 'IBM',
    year: '2025',
    month: 'December',
    credentialId: 'ZD1AEQ3V7KFU',
    url: 'https://www.coursera.org/account/accomplishments/verify/ZD1AEQ3V7KFU',
    skills: ['Deep Learning', 'TensorFlow', 'Keras', 'Neural Networks'],
  },
  {
    name: 'Generative AI and LLMs: Architecture and Data Preparation',
    issuer: 'IBM',
    year: '2025',
    month: 'December',
    credentialId: '8SRU44KUN675',
    url: 'https://www.coursera.org/account/accomplishments/records/8SRU44KUN675',
    skills: ['Generative AI', 'LLMs', 'Data Preparation', 'Model Architecture'],
  },
  {
    name: 'Introduction to Deep Learning & Neural Networks with Keras',
    issuer: 'IBM',
    year: '2025',
    month: 'November',
    credentialId: 'YEF3Q3G08KB7',
    url: 'https://www.coursera.org/account/accomplishments/records/YEF3Q3G08KB7',
    skills: ['Deep Learning', 'Neural Networks', 'Keras'],
  },
  {
    name: 'IISc x Qiskit Fall Fest 2025',
    issuer: 'IISc x Qiskit',
    year: '2025',
    month: 'November',
    credentialId: null,
    url: null,
    skills: ['Quantum Computing', 'Qiskit', 'Quantum Algorithms'],
  },
  {
    name: 'Framework Valley: React',
    issuer: 'Codédx',
    year: '2025',
    month: 'October',
    credentialId: null,
    url: 'https://www.codedex.io/certificates/280f994f-a9da-4cc1-8d66-7fff92bcf2b2',
    skills: ['React', 'Frontend Development', 'JavaScript'],
  },
  {
    name: 'The Origins III: JavaScript',
    issuer: 'Codédx',
    year: '2025',
    month: 'September',
    credentialId: null,
    url: 'https://www.codedex.io/certificates/839be3c0-c932-4b5b-a2b9-1149a489b6c8',
    skills: ['JavaScript', 'Web Development'],
  },
  {
    name: 'Machine Learning with Python',
    issuer: 'IBM',
    year: '2025',
    month: 'August',
    credentialId: 'S8AWGH5YXE2N',
    url: 'https://www.coursera.org/account/accomplishments/records/S8AWGH5YXE2N',
    skills: ['Machine Learning', 'Python', 'Data Science'],
  },
  {
    name: 'The Origins I: HTML',
    issuer: 'Codédx',
    year: '2025',
    month: 'August',
    credentialId: null,
    url: 'https://www.codedex.io/certificates/87c14936-4065-46ce-b8b2-7d1692b7ee45',
    skills: ['HTML', 'Web Development'],
  },
];

export const achievements: Achievement[] = [
  {
    description:
      'Owned code quality and design standards by leading SonarQube-driven code reviews and structured peer sessions, preventing production issues and mentoring junior engineers on clean architecture and best practices.',
    impact:
      'Improved technical confidence and readiness in peers and reduced the production issues ',
  },
  {
    description:
      'Participated in backend hiring by conducting technical interviews, contributing to team growth while maintaining high engineering and design standards',
    impact: 'Contributed to engineering team hiring',
  },
  {
    description:
      'Achieved 1800+ rating on LeetCode, ranking among the top competitive programmers globally, with strong performance in data structures and algorithms',
    impact: 'Strong algorithmic foundation',
  },
];

export const blogPosts: BlogPost[] = [
  {
    title:
      'TRIE (Prefix Tree): The Silent Workhorse Behind Autocomplete, Search Intelligence & Modern Developer Tools',
    description: 'A comprehensive guide to Trie Data Structure',
    date: 'December 5, 2025',
    readTime: '10 min read',
    tags: ['Dsa'],
    category: 'Data Structure And Algorithm',
    url: 'https://www.linkedin.com/pulse/trie-prefix-tree-silent-workhorse-behind-autocomplete-srivastava-hkwlc/',
  },
  {
    title: 'Colima: A Powerful Alternative to Docker Desktop ',
    description:
      'A comprehensive guide to Colima alternative to Docker Desktop',
    date: 'March 6, 2025',
    readTime: '10 min read',
    tags: ['Devops'],
    category: 'Devops',
    url: 'https://www.linkedin.com/pulse/colima-powerful-alternative-docker-desktop-kapil-srivastava-thksc/',
  },
];
