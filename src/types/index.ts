export interface Skill {
  name: string;
  level: number; // 0–100
  icon: string;  // emoji
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
}
