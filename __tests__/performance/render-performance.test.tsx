/**
 * Render Performance Tests
 * 
 * These tests measure the initial render performance of key components
 * to ensure the Tailwind refactoring doesn't negatively impact performance.
 */

import { render } from '@testing-library/react';
import React from 'react';

// Import components to test
import Achievements from '@/app/components/commands/Achievements';
import Blog from '@/app/components/commands/Blog';
import Certifications from '@/app/components/commands/Certifications';
import Contact from '@/app/components/commands/Contact';
import Education from '@/app/components/commands/Education';
import Skills from '@/app/components/commands/Skills';
import Timeline from '@/app/components/commands/Timeline';

// Mock the useThemeColors hook
jest.mock('@/hooks/useThemeColors', () => ({
  useThemeColors: () => ({
    accent: '#00ff00',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    bgPrimary: '#000000',
    bgSecondary: '#1a1a1a',
    neonSoft: 'rgba(0, 255, 0, 0.3)',
  }),
}));

// Mock GitHub API
jest.mock('@/lib/github', () => ({
  fetchGitHubProjects: jest.fn().mockResolvedValue([]),
}));

// Performance measurement utility
function measureRenderTime(component: React.ReactElement): number {
  const startTime = performance.now();
  render(component);
  const endTime = performance.now();
  return endTime - startTime;
}

describe('Render Performance Tests', () => {
  // Set a reasonable threshold for render time (in milliseconds)
  const RENDER_TIME_THRESHOLD = 100; // 100ms should be more than enough for initial render

  it('should render Achievements component within performance threshold', () => {
    const renderTime = measureRenderTime(<Achievements />);
    
    console.log(`Achievements render time: ${renderTime.toFixed(2)}ms`);
    expect(renderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it('should render Blog component within performance threshold', () => {
    const renderTime = measureRenderTime(<Blog />);
    
    console.log(`Blog render time: ${renderTime.toFixed(2)}ms`);
    expect(renderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it('should render Certifications component within performance threshold', () => {
    const renderTime = measureRenderTime(<Certifications />);
    
    console.log(`Certifications render time: ${renderTime.toFixed(2)}ms`);
    expect(renderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it('should render Contact component within performance threshold', () => {
    const renderTime = measureRenderTime(<Contact />);
    
    console.log(`Contact render time: ${renderTime.toFixed(2)}ms`);
    expect(renderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it('should render Education component within performance threshold', () => {
    const renderTime = measureRenderTime(<Education />);
    
    console.log(`Education render time: ${renderTime.toFixed(2)}ms`);
    expect(renderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it('should render Skills component within performance threshold', () => {
    const renderTime = measureRenderTime(<Skills />);
    
    console.log(`SimpleSkills render time: ${renderTime.toFixed(2)}ms`);
    expect(renderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it('should render Timeline component within performance threshold', () => {
    const renderTime = measureRenderTime(<Timeline />);
    
    console.log(`Timeline render time: ${renderTime.toFixed(2)}ms`);
    expect(renderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it('should render multiple components efficiently', () => {
    const components = [
      <Achievements key="achievements" />,
      <Blog key="blog" />,
      <Certifications key="certifications" />,
      <Contact key="contact" />,
      <Skills key="skills" />,
      <Timeline key="timeline" />,
    ];

    const startTime = performance.now();
    components.forEach((component) => {
      render(component);
    });
    const endTime = performance.now();
    const totalTime = endTime - startTime;

    console.log(`Total render time for all components: ${totalTime.toFixed(2)}ms`);
    
    // All components together should render in less than 500ms
    expect(totalTime).toBeLessThan(500);
  });
});
