import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'TypeScript', level: 92, icon: '🔷' },
      { name: 'JavaScript (ES6+)', level: 95, icon: '✨' },
      { name: 'ReScript', level: 70, icon: '🔬' },
      { name: 'Python', level: 75, icon: '🐍' },
      { name: 'C++', level: 80, icon: '⚙️' },
      { name: 'SQL', level: 78, icon: '🗄️' },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'React.js', level: 94, icon: '⚛️' },
      { name: 'Tailwind CSS', level: 85, icon: '🎨' },
      { name: 'Micro-Frontend', level: 80, icon: '🧩' },
      { name: 'SSE / WebSockets', level: 88, icon: '⚡' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 82, icon: '🟢' },
      { name: 'Express.js', level: 80, icon: '🚂' },
      { name: 'REST APIs', level: 90, icon: '🔗' },
      { name: 'IndexedDB', level: 85, icon: '💾' },
    ],
  },
  {
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 78, icon: '🐘' },
      { name: 'MongoDB', level: 80, icon: '🍃' },
      { name: 'Redis', level: 72, icon: '🔴' },
    ],
  },
  {
    label: 'AI & Agents',
    skills: [
      { name: 'AgentSDK', level: 88, icon: '🤖' },
      { name: 'Prompt Engineering', level: 85, icon: '💬' },
      { name: 'RAG', level: 78, icon: '📚' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git & GitHub', level: 92, icon: '🛠️' },
      { name: 'Highcharts', level: 82, icon: '📊' },
      { name: 'Postman', level: 88, icon: '📮' },
    ],
  },
];
