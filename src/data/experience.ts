import { ExperienceEntry } from '../types';

export const experiences: ExperienceEntry[] = [
  {
    role: 'Software Development Engineer – I',
    company: 'Juspay',
    duration: 'Sep 2024 – Present',
    location: 'Bangalore, India',
    bullets: [
      'Led end-to-end architecture and SDK packaging of a modular chatbot platform using AgentSDK, enabling adoption across 5000+ merchants with real-time conversational & voice capabilities (Pipecat, RTVI).',
      'Designed plug-and-play frontend architecture with clear abstraction layers, enabling integration across 3+ independent codebases and reducing feature development time by 30%.',
      'Built low-latency streaming infrastructure using SSE (EventStream), reducing perceived response latency by 40% and improving real-time chat responsiveness.',
      'Implemented offline-first persistence layer using IndexedDB caching, improving dashboard load performance by 25% and enabling resilient chat history recovery.',
      'Developed AI-powered agents on internal collaboration platform Xyne using the JAF agent framework with a self-hosted Kimi K2 LLM.',
    ],
  },
  {
    role: 'Problem Setter Intern',
    company: 'Intervue.io',
    duration: 'Jan 2024 – Jun 2024',
    location: 'Remote',
    bullets: [
      "Authored and curated 200+ Data Structures & Algorithms problems with optimised test cases, improving the platform's technical interview question bank.",
      'Designed edge-case driven test suites and validation scripts to ensure correctness across multiple programming languages.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'AppAvengers',
    duration: 'Apr 2023 – Jun 2023',
    location: 'Remote',
    bullets: [
      'Developed driver-side interface for a cab-booking application with Google Maps API integration, improving routing accuracy and operational efficiency by 20%.',
      'Implemented WebSocket-based real-time communication between drivers and riders, reducing booking delays by 10%.',
      'Built and shipped 6+ product features including a digital payments ecosystem and push notifications.',
    ],
  },
];
