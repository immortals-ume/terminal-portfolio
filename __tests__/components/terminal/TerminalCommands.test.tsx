import React from 'react';
import { createCommands, parseCommand } from '@/app/components/terminal/TerminalCommands';

// Mock all command components
jest.mock('@/app/components/commands/Help', () => () => <div>Help Component</div>);
jest.mock('@/app/components/commands/Skills', () => () => <div>Skills Component</div>);
jest.mock('@/app/components/commands/Contact', () => () => <div>Contact Component</div>);
jest.mock('@/app/components/commands/Home', () => () => <div>Home Component</div>);
jest.mock('@/app/components/commands/Projects', () => () => <div>Projects Component</div>);
jest.mock('@/app/components/commands/Education', () => () => <div>Education Component</div>);
jest.mock('@/app/components/commands/Timeline', () => () => <div>Timeline Component</div>);
jest.mock('@/app/components/commands/System', () => () => <div>System Component</div>);
jest.mock('@/app/components/commands/GitHub', () => () => <div>GitHub Component</div>);

jest.mock('@/app/components/commands/Certifications', () => () => <div>Certifications Component</div>);
jest.mock('@/app/components/commands/Cursor', () => {
  return function MockCursor({ _onCursorChange, currentCursor }: any) {
    return <div>Cursor Component - {currentCursor}</div>;
  };
});

describe('TerminalCommands', () => {
  let setCursorType: jest.Mock;
  let commands: any;

  beforeEach(() => {
    setCursorType = jest.fn();
    const setTheme = jest.fn();
    commands = createCommands(setCursorType, 'block', setTheme, 'matrix');
  });

  describe('createCommands', () => {
    it('creates all expected commands', () => {
      const expectedCommands = [
        'home', 'help', 'show skills', 'projects', 'education', 'timeline',
        'open project1', 'open project2', 'contact', 'github',
        'system', 'certifications', 'cursor', 'theme', 'clear',
        'cursor-select-0', 'cursor-select-1', 'cursor-select-2', 'cursor-select-3',
        'cursor-select-4', 'cursor-select-5', 'cursor-select-6', 'cursor-select-7',
        'cursor-select-8', 'cursor-select-9', 'theme-select-0', 'theme-select-1',
        'theme-select-2', 'theme-select-3', 'theme-select-4', 'theme-select-5'
      ];

      expectedCommands.forEach(cmd => {
        expect(commands).toHaveProperty(cmd);
        expect(commands[cmd]).toHaveProperty('description');
        expect(commands[cmd]).toHaveProperty('action');
      });
    });

    it('returns component output for component commands', () => {
      const result = commands.home.action();
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('type', 'component');
      expect(result[0]).toHaveProperty('key', 'home');
      expect(result[0]).toHaveProperty('element');
    });

    it('returns text output for text commands', () => {
      const result = commands['open project1'].action();
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('type', 'text');
      expect(result[0]).toHaveProperty('value');
      expect(result[0].value).toContain('Terminal Portfolio');
    });

    it('returns __CLEAR__ for clear command', () => {
      const result = commands.clear.action();
      expect(result).toBe('__CLEAR__');
    });

    it('calls setCursorType for cursor selection commands', () => {
      commands['cursor-select-0'].action();
      expect(setCursorType).toHaveBeenCalledWith('block');

      commands['cursor-select-1'].action();
      expect(setCursorType).toHaveBeenCalledWith('underscore');

      commands['cursor-select-2'].action();
      expect(setCursorType).toHaveBeenCalledWith('pipe');
    });

    it('returns appropriate text for cursor selection', () => {
      const result = commands['cursor-select-0'].action();
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('type', 'text');
      expect(result[0].value).toContain('Block');
    });
  });

  describe('parseCommand', () => {
    it('returns normalized command as-is for exact matches', () => {
      expect(parseCommand('help')).toBe('help');
      expect(parseCommand('HELP')).toBe('help');
      expect(parseCommand('  help  ')).toBe('help');
    });

    it('handles aliases correctly', () => {
      expect(parseCommand('skills')).toBe('show skills');
      expect(parseCommand('about')).toBe('home');
      expect(parseCommand('info')).toBe('home');
      expect(parseCommand('whoami')).toBe('home');
      expect(parseCommand('ls')).toBe('help');
      expect(parseCommand('dir')).toBe('help');
      expect(parseCommand('cls')).toBe('clear');
      expect(parseCommand('clr')).toBe('clear');
    });

    it('handles project aliases', () => {
      expect(parseCommand('project1')).toBe('open project1');
      expect(parseCommand('project2')).toBe('open project2');
    });

    it('handles cursor commands', () => {
      expect(parseCommand('cursor')).toBe('cursor');
    });

    it('handles contact aliases', () => {
      expect(parseCommand('contact-info')).toBe('contact');
      expect(parseCommand('reach')).toBe('contact');
    });

    it('handles github aliases', () => {
      expect(parseCommand('gh')).toBe('github');
      expect(parseCommand('git')).toBe('github');
    });

    it('handles timeline aliases', () => {
      expect(parseCommand('exp')).toBe('timeline');
      expect(parseCommand('experience')).toBe('timeline');
      expect(parseCommand('work')).toBe('timeline');
    });

    it('handles education aliases', () => {
      expect(parseCommand('edu')).toBe('education');
      expect(parseCommand('school')).toBe('education');
    });

    it('handles certification aliases', () => {
      expect(parseCommand('certs')).toBe('certifications');
      expect(parseCommand('badges')).toBe('certifications');
      expect(parseCommand('credentials')).toBe('certifications');
    });

    it('handles performance aliases', () => {
      expect(parseCommand('perf')).toBe('performance');
      expect(parseCommand('metrics')).toBe('performance');
    });

    it('returns original command for unknown commands', () => {
      expect(parseCommand('unknown')).toBe('unknown');
      expect(parseCommand('random-command')).toBe('random-command');
    });

    it('handles case insensitive input', () => {
      expect(parseCommand('SKILLS')).toBe('show skills');
      expect(parseCommand('About')).toBe('home');
      expect(parseCommand('CLEAR')).toBe('clear');
    });

    it('handles whitespace in input', () => {
      expect(parseCommand('  skills  ')).toBe('show skills');
      expect(parseCommand('\thelp\n')).toBe('help');
    });
  });
});