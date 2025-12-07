import {createCommands} from '@/app/components/terminal/TerminalCommands';
import {themes} from '@/app/components/commands/Theme';

describe('Theme Selection Commands', () => {
    let mockSetTheme: jest.Mock;
    let mockSetCursorType: jest.Mock;
    let commands: ReturnType<typeof createCommands>;

    beforeEach(() => {
        mockSetTheme = jest.fn();
        mockSetCursorType = jest.fn();
        commands = createCommands(mockSetCursorType, 'block', mockSetTheme, 'essence_01');
    });

    describe('Valid theme selection', () => {
        it('should change to theme 1 (essence_01)', () => {
            const result = commands['theme-select-1'].action();
            expect(mockSetTheme).toHaveBeenCalledWith('essence_01');
            expect(result).toEqual([{
                type: 'text',
                value: '✅ Theme changed to: Essence 01 - Celestial Waters'
            }]);
        });

        it('should change to theme 5 (essence_05)', () => {
            const result = commands['theme-select-5'].action();
            expect(mockSetTheme).toHaveBeenCalledWith('essence_05');
            expect(result).toEqual([{
                type: 'text',
                value: '✅ Theme changed to: Essence 05 - Scarlet Flame'
            }]);
        });

        it('should change to theme 10 (essence_10)', () => {
            const result = commands['theme-select-10'].action();
            expect(mockSetTheme).toHaveBeenCalledWith('essence_10');
            expect(result).toEqual([{
                type: 'text',
                value: '✅ Theme changed to: Essence 10 - Lotus Bloom'
            }]);
        });

        it('should provide confirmation feedback for all valid themes', () => {
            for (let i = 1; i <= themes.length; i++) {
                const result = commands[`theme-select-${i}`].action();
                expect(result).toHaveLength(1);
                expect(result[0].type).toBe('text');
                expect(result[0].value).toContain('✅ Theme changed to:');
                expect(result[0].value).toContain('Essence');
            }
        });
    });

    describe('Invalid theme selection', () => {
        it('should show error for theme 0', () => {
            const result = commands['theme-error-0'].action();
            expect(mockSetTheme).not.toHaveBeenCalled();
            expect(result).toEqual([{
                type: 'text',
                value: `❌ Invalid theme index: 0. Please choose a number between 1 and ${themes.length}. Type 'theme' to see available themes.`
            }]);
        });

        it('should show error for theme 11', () => {
            const result = commands['theme-error-11'].action();
            expect(mockSetTheme).not.toHaveBeenCalled();
            expect(result).toEqual([{
                type: 'text',
                value: `❌ Invalid theme index: 11. Please choose a number between 1 and ${themes.length}. Type 'theme' to see available themes.`
            }]);
        });

        it('should show error for negative theme index', () => {
            const result = commands['theme-error--1'].action();
            expect(mockSetTheme).not.toHaveBeenCalled();
            expect(result[0].value).toContain('❌ Invalid theme index: -1');
        });

        it('should show error for large theme index', () => {
            const result = commands['theme-error-99'].action();
            expect(mockSetTheme).not.toHaveBeenCalled();
            expect(result[0].value).toContain('❌ Invalid theme index: 99');
        });
    });

    describe('Theme command descriptions', () => {
        it('should have descriptive text for all theme selection commands', () => {
            for (let i = 1; i <= themes.length; i++) {
                const command = commands[`theme-select-${i}`];
                expect(command.description).toBeTruthy();
                expect(command.description).toContain('Essence');
            }
        });

        it('should have error descriptions for invalid theme commands', () => {
            expect(commands['theme-error-0'].description).toBe('Invalid theme index');
            expect(commands['theme-error-11'].description).toBe('Invalid theme index');
        });
    });
});
