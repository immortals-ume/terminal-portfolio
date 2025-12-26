'use client';

import { memo, useCallback, type ReactNode } from 'react';
import { usePreload } from '@/hooks/usePreload';

export type Command =
  | 'projects'
  | 'timeline'
  | 'skills'
  | 'education'
  | 'certifications'
  | 'achievements'
  | 'blog';

interface CommandPreloaderProps {
  command: Command;
  children: ReactNode;
  className?: string;
}

const COMMAND_IMPORTS: Record<Command, () => Promise<unknown>> = {
  projects: () => import('@/app/components/commands/Projects'),
  timeline: () => import('@/app/components/commands/Timeline'),
  skills: () => import('@/app/components/commands/Skills'),
  education: () => import('@/app/components/commands/Education'),
  certifications: () => import('@/app/components/commands/Certifications'),
  achievements: () => import('@/app/components/commands/Achievements'),
  blog: () => import('@/app/components/commands/Blog'),
};

const CommandPreloader = ({
  command,
  children,
  className = '',
}: CommandPreloaderProps) => {
  const { preloadComponent } = usePreload();

  const handleMouseEnter = useCallback(() => {
    preloadComponent(COMMAND_IMPORTS[command]);
  }, [command, preloadComponent]);

  return (
    <span onMouseEnter={handleMouseEnter} className={className}>
      {children}
    </span>
  );
};

export default memo(CommandPreloader);
