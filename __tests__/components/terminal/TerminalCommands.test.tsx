import {parseCommand} from '@/app/components/terminal/TerminalCommands';
import {themes} from '@/app/components/commands/Theme';

describe('parseCommand - Theme Selection', () => {
    describe('Valid theme indices', () => {
        it('should parse theme 1 command', () => {
            expect(parseCommand('theme 1')).toBe('theme-select-1');
        });

        it('should parse theme 5 command', () => {
            expect(parseCommand('theme 5')).toBe('theme-select-5');
        });

        it('should parse theme 10 command', () => {
            expect(parseCommand('theme 10')).toBe('theme-select-10');
        });

        it('should handle case insensitivity', () => {
            expect(parseCommand('THEME 3')).toBe('theme-select-3');
            expect(parseCommand('Theme 7')).toBe('theme-select-7');
        });

        it('should handle extra whitespace', () => {
            expect(parseCommand('  theme 2  ')).toBe('theme-select-2');
        });

        it('should parse all valid theme indices (1-10)', () => {
            for (let i = 1; i <= themes.length; i++) {
                expect(parseCommand(`theme ${i}`)).toBe(`theme-select-${i}`);
            }
        });
    });

    describe('Invalid theme indices', () => {
        it('should return error command for theme 0', () => {
            expect(parseCommand('theme 0')).toBe('theme-error-0');
        });

        it('should return error command for theme 11', () => {
            expect(parseCommand('theme 11')).toBe('theme-error-11');
        });

        it('should return error command for negative numbers', () => {
            expect(parseCommand('theme -1')).toBe('theme-error--1');
        });

        it('should return error command for large numbers', () => {
            expect(parseCommand('theme 99')).toBe('theme-error-99');
        });
    });

    describe('Theme command aliases', () => {
        it('should handle "themes" alias', () => {
            expect(parseCommand('themes')).toBe('theme');
        });

        it('should handle "colors" alias', () => {
            expect(parseCommand('colors')).toBe('theme');
        });

        it('should handle "style" alias', () => {
            expect(parseCommand('style')).toBe('theme');
        });

        it('should handle "themes" alias with numeric argument', () => {
            expect(parseCommand('themes 3')).toBe('theme-select-3');
            expect(parseCommand('themes 7')).toBe('theme-select-7');
        });

        it('should handle "colors" alias with numeric argument', () => {
            expect(parseCommand('colors 2')).toBe('theme-select-2');
            expect(parseCommand('colors 9')).toBe('theme-select-9');
        });

        it('should handle "style" alias with numeric argument', () => {
            expect(parseCommand('style 1')).toBe('theme-select-1');
            expect(parseCommand('style 10')).toBe('theme-select-10');
        });

        it('should handle aliases with invalid indices', () => {
            expect(parseCommand('themes 0')).toBe('theme-error-0');
            expect(parseCommand('colors 11')).toBe('theme-error-11');
            expect(parseCommand('style 99')).toBe('theme-error-99');
        });
    });

    describe('Base theme command', () => {
        it('should return "theme" for base command', () => {
            expect(parseCommand('theme')).toBe('theme');
        });
    });
});
