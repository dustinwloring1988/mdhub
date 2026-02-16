export interface SkillFile {
  name: string;
  content: string;
  language: string;
}

export interface SkillVersion {
  version: string;
  date: string;
  changes: string;
  files?: SkillFile[];
}

export interface Skill {
  id: string;
  slug: string;
  name: string;
  description: string;
  author: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  views: number;
  downloads: number;
  stars: number;
  currentVersion: string;
  versions: SkillVersion[];
  files: SkillFile[];
  createdAt: string;
  updatedAt: string;
}

export const CATEGORIES = [
  "Web Development",
  "Data Science",
  "DevOps",
  "Security",
  "AI/ML",
  "Automation",
  "Design",
  "Infrastructure",
] as const;

export const mockSkills: Skill[] = [
  {
    id: "1",
    slug: "web-design-guidelines",
    name: "Web Design Guidelines",
    description: "A comprehensive set of web design guidelines for AI agents to follow when building modern, accessible, and performant websites.",
    author: "vercel-labs",
    category: "Web Development",
    tags: ["design", "ui", "accessibility", "best-practices"],
    views: 12840,
    downloads: 3421,
    stars: 892,
    currentVersion: "2.1.0",
    versions: [
      { version: "2.1.0", date: "2026-02-10", changes: "Added responsive design patterns" },
      { 
        version: "2.0.0", 
        date: "2026-01-15", 
        changes: "Major rewrite with Tailwind v4 support",
        files: [
          {
            name: "skill.md",
            language: "markdown",
            content: `# Web Design Guidelines v2.0.0\n\n## Typography\n- Body text: 16px\n- Line height: 1.5\n\n## Colors\n- Use Tailwind colors\n- Dark mode required`
          },
          {
            name: "config.json",
            language: "json",
            content: `{\n  "name": "web-design-guidelines",\n  "version": "2.0.0",\n  "category": "design"\n}`
          }
        ]
      },
      { 
        version: "1.0.0", 
        date: "2025-11-01", 
        changes: "Initial release",
        files: [
          {
            name: "skill.md",
            language: "markdown",
            content: `# Web Design Guidelines v1.0.0\n\n## Basics\n- Use legible fonts\n- Good contrast`
          }
        ]
      },
    ],
    files: [
      {
        name: "skill.md",
        language: "markdown",
        content: `# Web Design Guidelines\n\n## Typography\n- Use a clear hierarchy with max 3 font sizes\n- Body text: 16-18px minimum\n- Line height: 1.5-1.7 for readability\n\n## Colors\n- Maintain WCAG AA contrast ratios\n- Use semantic color tokens\n- Support dark mode\n\n## Layout\n- Mobile-first responsive design\n- Max content width: 1200px\n- Consistent spacing scale`,
      },
      {
        name: "config.json",
        language: "json",
        content: `{\n  "name": "web-design-guidelines",\n  "version": "2.1.0",\n  "agent_compatibility": ["gpt-4", "claude-3", "gemini"],\n  "category": "design"\n}`,
      },
    ],
    createdAt: "2025-11-01",
    updatedAt: "2026-02-10",
  },
  {
    id: "2",
    slug: "homelab-cluster",
    name: "Homelab Cluster Manager",
    description: "Skill for managing Kubernetes homelab clusters including deployment, monitoring, and auto-scaling configurations.",
    author: "mlesnews",
    category: "Infrastructure",
    tags: ["kubernetes", "homelab", "devops", "monitoring"],
    views: 8920,
    downloads: 2105,
    stars: 654,
    currentVersion: "1.3.2",
    versions: [
      { version: "1.3.2", date: "2026-02-05", changes: "Fixed node drain timeout" },
      { version: "1.3.0", date: "2026-01-20", changes: "Added Prometheus integration" },
    ],
    files: [
      {
        name: "skill.md",
        language: "markdown",
        content: `# Homelab Cluster Manager\n\nManage your K8s homelab with ease.\n\n## Features\n- Auto-scaling based on resource usage\n- Prometheus + Grafana monitoring\n- Automated backup schedules\n- Node health checks`,
      },
    ],
    createdAt: "2025-12-10",
    updatedAt: "2026-02-05",
  },
  {
    id: "3",
    slug: "website-watchdog",
    name: "Website Watchdog",
    description: "Monitor websites for uptime, performance metrics, and content changes. Get alerts via Slack, Discord, or email.",
    author: "grkmguney",
    category: "Automation",
    tags: ["monitoring", "uptime", "alerts", "performance"],
    views: 6340,
    downloads: 1876,
    stars: 423,
    currentVersion: "1.1.0",
    versions: [
      { version: "1.1.0", date: "2026-01-28", changes: "Added Discord webhook support" },
      { version: "1.0.0", date: "2025-12-15", changes: "Initial release" },
    ],
    files: [
      {
        name: "skill.md",
        language: "markdown",
        content: `# Website Watchdog\n\nMonitor any website for:\n- Uptime (HTTP status checks)\n- Performance (Core Web Vitals)\n- Content changes (DOM diffing)\n\n## Alert Channels\n- Slack\n- Discord\n- Email\n- Custom webhooks`,
      },
    ],
    createdAt: "2025-12-15",
    updatedAt: "2026-01-28",
  },
  {
    id: "4",
    slug: "api-security-scanner",
    name: "API Security Scanner",
    description: "Automated security scanning for REST and GraphQL APIs. Detects common vulnerabilities like SQL injection, XSS, and auth bypasses.",
    author: "securitybot",
    category: "Security",
    tags: ["security", "api", "scanning", "vulnerabilities"],
    views: 15200,
    downloads: 4890,
    stars: 1120,
    currentVersion: "3.0.1",
    versions: [
      { version: "3.0.1", date: "2026-02-08", changes: "Patched false positive in CORS check" },
    ],
    files: [
      {
        name: "skill.md",
        language: "markdown",
        content: `# API Security Scanner\n\nComprehensive API security testing.\n\n## Checks\n- SQL Injection\n- XSS (reflected/stored)\n- Auth bypass attempts\n- CORS misconfiguration\n- Rate limiting verification`,
      },
    ],
    createdAt: "2025-09-20",
    updatedAt: "2026-02-08",
  },
  {
    id: "5",
    slug: "data-pipeline-builder",
    name: "Data Pipeline Builder",
    description: "Build and manage ETL data pipelines with support for multiple sources, transformations, and destinations.",
    author: "dataflow",
    category: "Data Science",
    tags: ["etl", "data", "pipeline", "analytics"],
    views: 9100,
    downloads: 2780,
    stars: 567,
    currentVersion: "1.5.0",
    versions: [
      { version: "1.5.0", date: "2026-02-01", changes: "Added Snowflake connector" },
    ],
    files: [
      {
        name: "skill.md",
        language: "markdown",
        content: `# Data Pipeline Builder\n\nCreate robust ETL pipelines.\n\n## Supported Sources\n- PostgreSQL, MySQL, MongoDB\n- REST APIs, GraphQL\n- S3, GCS buckets\n- Kafka streams`,
      },
    ],
    createdAt: "2025-10-05",
    updatedAt: "2026-02-01",
  },
  {
    id: "6",
    slug: "prompt-optimizer",
    name: "Prompt Optimizer",
    description: "Automatically optimize and test prompts for better LLM performance. Includes A/B testing and scoring frameworks.",
    author: "ai-tools",
    category: "AI/ML",
    tags: ["prompts", "llm", "optimization", "testing"],
    views: 22400,
    downloads: 7650,
    stars: 2340,
    currentVersion: "2.0.0",
    versions: [
      { version: "2.0.0", date: "2026-02-12", changes: "Claude 4 support, new scoring engine" },
    ],
    files: [
      {
        name: "skill.md",
        language: "markdown",
        content: `# Prompt Optimizer\n\nOptimize your prompts for peak performance.\n\n## Features\n- Automated prompt rewriting\n- A/B testing framework\n- Quality scoring (coherence, relevance, accuracy)\n- Token usage optimization\n- Multi-model comparison`,
      },
    ],
    createdAt: "2025-08-15",
    updatedAt: "2026-02-12",
  },
];
