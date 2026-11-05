export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  highlightMetric?: string;
}

export interface Skill {
  name: string;
  percentage: number;
  category: 'frontend' | 'backend' | 'styling' | 'cms';
  icon: string;
  experienceLevel: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  tagline: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}
