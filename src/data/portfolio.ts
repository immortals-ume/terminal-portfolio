import type { Achievement, BlogPost } from "@/lib/types";

export const personalInfo = {
    name: "Kapil Srivastava",
    email: "kapil.srivastava712@gmail.com",
    phone: "Available upon request",
    location: "Gurugram, India",
    role: "Software Development Engineer",
    company: "Lenskart",
    experience: "4.6 years",
    github: "immortals-ume",
    linkedin: "kapil-srivastava-72911-di",
    leetcode: "Ayanokoji09",
    website: "https://kapilsrivastava.dev",
    summary: "Experienced Software Development Engineer with 4.6+ years of expertise in building scalable backend systems and microservices. Proven track record of delivering high-impact features that drive 40% engagement increases and optimize system performance by 85%. Skilled in Java, Spring Boot, React, and cloud technologies with experience across e-commerce, fintech, and enterprise domains. Currently pursuing advanced studies in Quantum Computing at IIT Madras while contributing to innovative solutions at Lenskart."
};

export const workExperience = [
    {
        period: "Aug 2025 - Dec 2025",
        description: "career Break"
    },
    {
        period: "Feb 2024 - Jul 2025",
        role: "Software Development Engineer 1 (TECH@LENSKART)",
        company: "LENSKART",
        type: "Full-time",
        location: "India",
        description: "Working on backend development and system integrations for e-commerce platform",
        technologies: ["Java", "Spring Boot", "ReactJS", "Kafka", "Micrometer", "Grafana"],
        achievements: [
            "Integrated Sprinklr for automated ticketing in internal dashboards",
            "Engineered backend for Salesmen Skill Set module with granular tracking",
            "Developed custom monitoring suite using Micrometer and Grafana dashboards",
            "Launched Free Gift Product feature driving 40% increase in user engagement",
            "Built scalable Gift Voucher Campaign workflows increasing engagement by 40%",
            "Led Bulk Order system development using Spring Boot, Java, and Kafka",
            "Conducted technical interviews and contributed to team scaling initiatives"
        ],
        projects: [
            {
                name: "Sprinklr Integration",
                description: "Integrated Sprinklr for automated ticketing in internal dashboards to streamline customer support operations."
            },
            {
                name: "Salesmen Skill Set Module",
                description: "Engineered backend module to enable granular tracking and evaluation of sales capabilities."
            },
            {
                name: "Custom Monitoring Suite",
                description: "Developed custom dashboards using Micrometer and Grafana for internal service monitoring."
            },
            {
                name: "Free Gift Product Feature",
                description: "Implemented end-to-end feature using ReactJS and backend APIs, improving engagement by 40%."
            },
            {
                name: "Gift Voucher Campaigns",
                description: "Built scalable backend workflows and APIs for campaign management, increasing engagement by 40%."
            },
            {
                name: "Bulk Order System",
                description: "Led backend development using Spring Boot, Java, and Kafka for efficient bulk order handling."
            }
        ]
    },
    {
        period: "Oct 2023 - Jan 2024",
        description: "career Break"
    },
    {
        period: "May 2023 - Sep 2023",
        role: "Backend Engineer",
        company: "BACKBASE",
        type: "Full-time",
        location: "India",
        description: "Developed backend services and APIs for financial technology platform.",
        technologies: ["Spring Boot", "AWS", "Kubernetes", "QueryDSL", "SonarQube"],
        achievements: [
            "Created Low-level design and Open API Specifications for client and service APIs, improving development speed by 20%.",
            "Developed data integration services with Spring Boot and Billdesk Platform, reducing payment processing time by 30%.",
            "Deployed apps on AWS Kubernetes clusters and implemented Secret Manager for secure CI/CD credential management, enhancing efficiency and security.",
            "Developed new QueryDSL capabilities for dynamic querying, significantly boosting backend performance and client application flexibility.",
            "Conducted code reviews using SonarQube, reducing defects by 15% and ensuring industry best practices."
        ],
        projects: [
            {
                name: "HDFC Net-Banking Platform",
                description: "Scalable online banking platform enhancing digital payment experience and transaction reliability for retail customers."
            }
        ]
    },

    {
        period: "Apr 2022 - Apr 2023",
        role: "Senior Systems Engineer",
        company: "INFOSYS",
        type: "Full-time",
        location: "Remote",
        description: "Led backend and system integration initiatives, improving scalability, resilience, and performance across enterprise solutions.",
        technologies: [
            "Java", "Spring Boot", "ReactJS", "Kafka", "Azure AD", "Redis",
            "Liquibase", "Docker", "Kubernetes", "Mockito", "Spring Mail"
        ],
        achievements: [
            "Integrated Azure Active Directory (AAD) with a Spring Boot backend and custom React UI, enhancing authentication security and reducing vulnerability exposure by 80% through enterprise-grade access control.",
            "Designed a Batch Processing System using Spring Batch and SFTP, reducing data transformation time by 85% and boosting throughput by 75%.",
            "Developed a scalable, event-driven Notification System using Kafka and Spring Mail, achieving 99.9% uptime with a 70% reduction in latency.",
            "Built a fault-tolerant file integration layer with Azure Blob Storage, minimizing document processing errors by 70% and improving operational resilience.",
            "Optimized RESTful API performance using Redis-based caching, improving response times for high-traffic endpoints.",
            "Implemented Liquibase for database version control and Docker/Kubernetes for containerized deployment across environments.",
            "Wrote and maintained comprehensive unit tests using Mockito and adopted TDD for improved reliability.",
            "Collaborated in Agile ceremonies, participating in end-to-end design reviews, CI/CD workflows, and sprint planning."
        ],
        projects: [
            {
                name: "Regulatory Data Tracking (RDT)",
                description: "Centralized system improving regulatory compliance, audit transparency, and operational efficiency across business units."
            }
        ]
    },
    {
        period: "Oct 2020 - Apr 2022",
        role: "Systems Engineer",
        company: "INFOSYS",
        type: "Full-time",
        location: "Remote",
        description: "Contributed to full-stack enterprise projects, ensuring performance, maintainability, and scalability of web applications.",
        technologies: [
            "Java", "Spring Boot", "ReactJS", "Redux", "Swagger", "SQL", "Jest", "Mockito", "REST APIs"
        ],
        achievements: [
            "Developed unit and integration tests using Mockito (Java) and Jest (JavaScript), increasing code coverage and early defect detection.",
            "Designed reusable, modular components for ReactJS single-page applications, integrated with Redux and React Router.",
            "Created detailed Swagger-based API documentation for faster onboarding and seamless integration across teams.",
            "Resolved high-priority production bugs in live systems under tight SLAs, reducing mean time to resolution (MTTR) and improving system uptime."
        ], projects: [
            {
                name: "Regulatory Data Tracking (RDT)",
                description: "Centralized system improving regulatory compliance, audit transparency, and operational efficiency across business units."
            }
        ]
    },
    {
        period: "Jan 2020 - Mar 2020",
        role: "Engineer Intern",
        company: "INFOSYS",
        type: "Internship",
        location: "Remote",
        description: "Worked on foundational backend systems and microservice integrations during internship tenure.",
        technologies: ["Java", "Spring Boot", "SQL"],
        achievements: []
    }
];


export const education = [
    {
        degree: "Executive Education programs in Quantum Computing From CODE",
        institution: "Indian Institute of Technology, Madras",
        period: "Aug 2025 - Apr 2026",
        description: "Executive Program from CODE focusing on Quantum Computing fundamentals and applications.",
        relevantCourses: [
            "Math prelims, quantum mechanics fundamentals, intro to qubits & Bloch sphere",
            "Two-qubit gates, Bell states, teleportation, physical realizations of qubits",
            "IBM Q & Qiskit, Deutsch–Jozsa, Grover search, Simon’s & Bernstein–Vazirani algorithms",
            "QFT & phase estimation, order finding & factoring, amplitude amplification, HHL algorithm",
            "Quantum cryptography (BB84), variational quantum algorithms, and error mitigation for NISQ systems",
            "Quantum ML, Qiskit runtime, transpiling & circuit cutting, quantum communication protocols, optimization on quantum computers"
        ]
    },
    {
        degree: "Bachelor of Technology (BTech) in Computer Science and Engineering",
        institution: "SRM Institute of Science and Technology (SRM IST Chennai)",
        period: "May 2016 - Jun 2020",
        gpa: "Good Academic Standing",
        relevantCourses: [
            "Data Structures & Algorithms",
            "Software Engineering",
            "Database Management Systems",
            "Computer Networks",
            "Operating Systems",
            "Object-Oriented Programming"
        ]
    }
];


export const projects = [
    {
        name: "Terminal Portfolio",
        description: "Interactive terminal-style portfolio with command-line interface built with Next.js and React",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        category: "Personal Project",
        github: "https://github.com/immortals-ume/terminal-portfolio",
        live: "https://kapilsrivastava.dev"
    },
    {
        name: "HDFC Net-Banking Platform",
        description: "Scalable online banking platform enhancing digital payment experience and transaction reliability for retail customers (Professional Project)",
        technologies: ["Java", "Spring Boot", "MySQL", "React"],
        category: "Professional Work"
    },
    {
        name: "Regulatory Data Tracking (RDT)",
        description: "Centralized system improving regulatory compliance, audit transparency, and operational efficiency (Professional Project)",
        technologies: ["Java", "Spring Boot", "PostgreSQL", "Microservices"],
        category: "Professional Work"
    }
];

export const certifications = [
    {
        name: "Framework Valley: React",
        issuer: "Codédx",
        year: "2025",
        month: "October",
        credentialId: null,
        url: "https://www.codedex.io/certificates/280f994f-a9da-4cc1-8d66-7fff92bcf2b2",
        skills: []
    },
    {
        name: "The Origins III: JavaScript",
        issuer: "Codédx",
        year: "2025",
        month: "September",
        credentialId: null,
        url: "https://www.codedex.io/certificates/839be3c0-c932-4b5b-a2b9-1149a489b6c8",
        skills: []
    },
    {
        name: "Machine Learning with Python",
        issuer: "IBM",
        year: "2025",
        month: "August",
        credentialId: "S8AWGH5YXE2N",
        url: "https://www.coursera.org/account/accomplishments/records/S8AWGH5YXE2N",
        skills: ["Machine Learning", "Python", "Data Science"]
    },
    {
        name: "The Origins I: HTML",
        issuer: "Codédx",
        year: "2025",
        month: "August",
        credentialId: null,
        url: "https://www.codedex.io/certificates/87c14936-4065-46ce-b8b2-7d1692b7ee45",
        skills: ["HTML", "Web Development"]
    }
];



export const achievements: Achievement[] = [
    {
        title: "40% Engagement Boost",
        description: "Launched Free Gift Product feature and Gift Voucher Campaign workflows",
        category: "Product Impact",
        impact: "40% increase in user engagement",
        icon: "FaRocket",
        date: "2024"
    },
    {
        title: "85% Processing Speed Improvement",
        description: "Designed Batch Processing System using Spring Batch and SFTP",
        category: "Performance",
        impact: "85% reduction in data transformation time",
        icon: "FaBolt",
        date: "2023"
    },
    {
        title: "80% Security Enhancement",
        description: "Integrated Azure Active Directory with Spring Boot backend",
        category: "Security",
        impact: "80% reduction in vulnerability exposure",
        icon: "FaLock",
        date: "2023"
    },
    {
        title: "99.9% System Uptime",
        description: "Developed event-driven Notification System using Kafka",
        category: "Reliability",
        impact: "99.9% uptime with 70% latency reduction",
        icon: "FaBroadcastTower",
        date: "2023"
    },
    {
        title: "30% Payment Processing Improvement",
        description: "Developed data integration services with Billdesk Platform",
        category: "Integration",
        impact: "30% reduction in payment processing time",
        icon: "FaCreditCard",
        date: "2023"
    },
    {
        title: "70% Error Reduction",
        description: "Built fault-tolerant file integration layer with Azure Blob Storage",
        category: "Quality",
        impact: "70% reduction in document processing errors",
        icon: "FaCheckCircle",
        date: "2023"
    }
];

export const blogPosts: BlogPost[] = [
    {
        title: "Building Scalable Microservices with Spring Boot",
        description: "A comprehensive guide to designing and implementing microservices architecture using Spring Boot and Spring Cloud",
        date: "Coming Soon",
        readTime: "10 min read",
        tags: ["Spring Boot", "Microservices", "Java"],
        category: "Architecture",
        url: ""
    },
    {
        title: "Event-Driven Architecture with Kafka",
        description: "Learn how to build resilient event-driven systems using Apache Kafka for real-time data processing",
        date: "Coming Soon",
        readTime: "12 min read",
        tags: ["Kafka", "Event-Driven", "Distributed Systems"],
        category: "Backend",
        url: ""
    },
    {
        title: "Optimizing React Performance",
        description: "Best practices and techniques for building high-performance React applications with modern hooks",
        date: "Coming Soon",
        readTime: "8 min read",
        tags: ["React", "Performance", "JavaScript"],
        category: "Frontend",
        url: ""
    },
    {
        title: "Database Design Patterns for Scale",
        description: "Exploring database sharding, replication, and caching strategies for high-traffic applications",
        date: "Coming Soon",
        readTime: "15 min read",
        tags: ["Database", "PostgreSQL", "Redis"],
        category: "Database",
        url: ""
    }
];