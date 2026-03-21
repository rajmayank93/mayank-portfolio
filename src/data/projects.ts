import { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'DesignKit UI',
    description:
      'A modular React component library with 30+ production-ready components. Published on npm with full TypeScript support, Storybook docs, and accessibility built in.',
    tags: ['React', 'TypeScript', 'Storybook', 'npm'],
    liveUrl: '#',
    githubUrl: import.meta.env.VITE_GITHUB_URL || '#',
  },
  {
    title: 'ShopFast',
    description:
      'E-commerce storefront with cart management, advanced product filters, and Stripe payment integration. Optimised for Core Web Vitals with SSR via Next.js.',
    tags: ['Next.js', 'Tailwind CSS', 'Stripe', 'TypeScript'],
    liveUrl: '#',
    githubUrl: import.meta.env.VITE_GITHUB_URL || '#',
  },
  {
    title: 'DevPulse Dashboard',
    description:
      'Real-time analytics dashboard with live WebSocket data feeds, interactive Highcharts visualisations, and SSE-backed streaming updates.',
    tags: ['React', 'Highcharts', 'WebSockets', 'SSE'],
    liveUrl: '#',
    githubUrl: import.meta.env.VITE_GITHUB_URL || '#',
  },
];
