export const skillsData = {
    languages: [
        "Java 21",
        "TypeScript",
        "JavaScript (ES6+)",
        "Python"
    ],
    backend: [
        "Spring Boot 3",
        "Spring Cloud",
        "Microservices",
        "Kafka",
        "Redis",
        "Hibernate/JPA",
        "MySQL",
        "PostgreSQL",
        "MongoDB"
    ],
    frontend: [
        "React",
        "Next.js",
        "Redux Toolkit",
        "Tailwind",
        "TypeScript"
    ],
    devops: [
        "Docker",
        "Kubernetes",
        "AWS (EC2, S3, IAM, CloudWatch)",
        "Grafana",
        "Prometheus",
        "GitHub Actions",
        "Jenkins"
    ],
    system_design: [
        "Event-Driven Architecture",
        "CQRS",
        "SAGA Pattern",
        "API Gateway",
        "Caching (Redis, CDN)",
        "Rate Limiting",
        "Distributed Transactions"
    ],
    cs: [
        "DSA",
        "OOP",
        "SOLID Principles",
        "Concurrency",
        "Multithreading",
        "JVM Internals",
        "Garbage Collection"
    ],
    dailyStack: [
        "Java 21",
        "Spring Boot 3",
        "Kafka",
        "PostgresSQL",
        "Docker",
        "AWS",
        "Grafana",
        "React"
    ]
}

export const skillDetails: Record<string, string> = {
    springboot: `Spring Boot — Advanced
  ✔ Built Bulk Order & Gift Voucher microservices
  ✔ Kafka event-driven integration
  ✔ Redis caching + rate limiting
  ✔ Micrometer + Grafana observability
  ✔ Designed scalable REST APIs`,

    kafka: `Kafka — Advanced
  ✔ Producer/Consumer with partitions & groups
  ✔ DLQ, retries, idempotent consumers
  ✔ Exactly-once semantics
  ✔ Order pipeline for high throughput systems`,

    react: `React — Intermediate
  ✔ Theme provider + custom hooks
  ✔ Optimized re-render cycles
  ✔ Built reusable component library
  ✔ Used Redux Toolkit + Zustand`,

    java: `Java 21 — Expert
  ✔ Multithreading & concurrency patterns
  ✔ JVM tuning & GC optimization
  ✔ Stream API & functional programming
  ✔ Design patterns implementation`,

    aws: `AWS — Advanced
  ✔ EC2, S3, IAM, CloudWatch
  ✔ RDS, VPC, Load Balancing
  ✔ Lambda, API Gateway
  ✔ Infrastructure as Code`,

    docker: `Docker — Advanced
  ✔ Multi-stage builds
  ✔ Docker Compose orchestration
  ✔ Container optimization
  ✔ Registry management`,

    kubernetes: `Kubernetes — Advanced
  ✔ Deployment & StatefulSets
  ✔ Service mesh & networking
  ✔ Helm charts
  ✔ Scaling & monitoring`,

    postgres: `PostgreSQL — Expert
  ✔ Query optimization & indexing
  ✔ ACID transactions
  ✔ Replication & backup strategies
  ✔ JSON & advanced data types`
}
