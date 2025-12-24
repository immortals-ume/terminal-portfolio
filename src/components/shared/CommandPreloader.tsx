/**
 * CommandPreloader Component
 * 
 * Preloads command components on hover to improve perceived performance.
 * Uses dynamic imports to trigger component loading before execution.
 * 
 * @component
 * @example
 * ```tsx
 * <CommandPreloader command="projects">
 *   <button>View Projects</button>
 * </CommandPreloader>
 * ```
 */

'use client'

import React, { useCallback } from 'react';
import { usePreload } from '@/hooks/usePreload';

interface CommandPreloaderProps {
  command: 'projects' | 'timeline' | 'skills' | 'stack' | 'education' | 'certifications' | 'achievements' | 'blog';
  children: React.ReactNode;
  className?: string;
}

const commandImports = {
  projects: () => import('../../app/components/commands/Projects'),
  timeline: () => import('../../app/components/commands/Timeline'),
  skills: () => import('../../app/components/commands/SimpleSkills'),
  stack: () => import('../../app/components/commands/Stack'),
  education: () => import('../../app/components/commands/Education'),
  certifications: () => import('../../app/components/commands/Certifications'),
  achievements: () => import('../../app/components/commands/Achievements'),
  blog: () => import('../../app/components/commands/Blog'),
};

const CommandPreloader: React.FC<CommandPreloaderProps> = ({ 
  command, 
  children,
  className = ''
}) => {
  const { preloadComponent } = usePreload();

  const handleMouseEnter = useCallback(() => {
    const importFn = commandImports[command];
    if (importFn) {
      preloadComponent(importFn);
    }
  }, [command, preloadComponent]);

  return (
    <span 
      onMouseEnter={handleMouseEnter}
      className={className}
    >
      {children}
    </span>
  );
};

export default React.memo(CommandPreloader);
