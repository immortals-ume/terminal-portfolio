import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TerminalInput from '@/app/components/terminal/TerminalInput';

// Mock child components
jest.mock('@/app/components/terminal/CommandHistory', () => {
    return {
        __esModule: true,
        default: function MockCommandHistory({onCommandSelect, isVisible}: any) {
            return isVisible ? (
                <div data-testid="command-history">
                    <button onClick={() => onCommandSelect('help')}>help</button>
                    <button onClick={() => onCommandSelect('skills')}>skills</button>
                </div>
            ) : null;
        },
        useCommandHistory: () => ({
            addToHistory: jest.fn(),
        }),
    };
});

jest.mock('@/app/components/terminal/CommandSuggestions', () => {
    return function MockCommandSuggestions({suggestions, onSuggestionSelect, isVisible}: any) {
        return isVisible ? (
            <div data-testid="command-suggestions">
                {suggestions.map((suggestion: string) => (
                    <button key={suggestion} onClick={() => onSuggestionSelect(suggestion)}>
                        {suggestion}
                    </button>
                ))}
            </div>
        ) : null;
    };
});

jest.mock('@/app/components/terminal/TerminalCursor', () => {
    return function MockTerminalCursor({cursorType, cursorVisible}: any) {
        return (
            <span data-testid="terminal-cursor" data-visible={cursorVisible}>
        {cursorType}
      </span>
        );
    };
});

describe('TerminalInput Component', () => {
    const defaultProps = {
        current: '',
        setCurrent: jest.fn(),
        onSubmit: jest.fn(),
        commands: {
            help: {description: 'Show help', action: jest.fn()},
            skills: {description: 'Show skills', action: jest.fn()},
            home: {description: 'Show home', action: jest.fn()},
        },
        cursorType: 'block',
        cursorVisible: true,
        showHistory: false,
        setShowHistory: jest.fn(),
        showSuggestions: false,
        setShowSuggestions: jest.fn(),
        suggestions: [],
        setSuggestions: jest.fn(),
        autoFocus: true,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders input with prompt', () => {
        render(<TerminalInput {...defaultProps} />);

        expect(screen.getByText('guest@portfolio:~$')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('displays current input value', () => {
        render(<TerminalInput {...defaultProps} current="test command"/>);

        expect(screen.getByDisplayValue('test command')).toBeInTheDocument();
    });

    it('calls setCurrent when input changes', async () => {
        const setCurrent = jest.fn();
        render(<TerminalInput {...defaultProps} setCurrent={setCurrent}/>);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'help');

        expect(setCurrent).toHaveBeenCalledWith('h');
        expect(setCurrent).toHaveBeenCalledWith('e');
        expect(setCurrent).toHaveBeenCalledWith('l');
        expect(setCurrent).toHaveBeenCalledWith('p');
    });

    it('submits command on Enter key', async () => {
        const onSubmit = jest.fn();
        render(<TerminalInput {...defaultProps} current="help" onSubmit={onSubmit}/>);

        const form = screen.getByRole('textbox').closest('form');
        fireEvent.submit(form!);

        expect(onSubmit).toHaveBeenCalledWith('help');
    });

    it('does not submit empty command', () => {
        const onSubmit = jest.fn();
        render(<TerminalInput {...defaultProps} current="" onSubmit={onSubmit}/>);

        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, {key: 'Enter'});

        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('shows command history on ArrowUp', () => {
        const setShowHistory = jest.fn();
        const setShowSuggestions = jest.fn();
        render(
            <TerminalInput
                {...defaultProps}
                setShowHistory={setShowHistory}
                setShowSuggestions={setShowSuggestions}
            />
        );

        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, {key: 'ArrowUp'});

        expect(setShowHistory).toHaveBeenCalledWith(true);
        expect(setShowSuggestions).toHaveBeenCalledWith(false);
    });

    it('navigates through history with ArrowDown', () => {
        const setCurrent = jest.fn();
        const setShowHistory = jest.fn();
        render(
            <TerminalInput
                {...defaultProps}
                setCurrent={setCurrent}
                setShowHistory={setShowHistory}
                showHistory={true}
            />
        );

        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, {key: 'ArrowDown'});

        expect(setCurrent).toHaveBeenCalledWith('');
        expect(setShowHistory).toHaveBeenCalledWith(false);
    });

    it('handles Tab key for autocompletion', () => {
        const setCurrent = jest.fn();
        const setShowSuggestions = jest.fn();
        render(
            <TerminalInput
                {...defaultProps}
                current="he"
                setCurrent={setCurrent}
                setShowSuggestions={setShowSuggestions}
            />
        );

        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, {key: 'Tab'});

        expect(setCurrent).toHaveBeenCalledWith('help');
        expect(setShowSuggestions).toHaveBeenCalledWith(false);
    });

    it('shows suggestions for multiple matches', () => {
        const setSuggestions = jest.fn();
        const setShowSuggestions = jest.fn();
        const setShowHistory = jest.fn();
        render(
            <TerminalInput
                {...defaultProps}
                current="h"
                setSuggestions={setSuggestions}
                setShowSuggestions={setShowSuggestions}
                setShowHistory={setShowHistory}
                commands={{
                    help: {description: 'Show help', action: jest.fn()},
                    home: {description: 'Show home', action: jest.fn()},
                }}
            />
        );

        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, {key: 'Tab'});

        expect(setSuggestions).toHaveBeenCalledWith(['help', 'home']);
        expect(setShowSuggestions).toHaveBeenCalledWith(true);
        expect(setShowHistory).toHaveBeenCalledWith(false);
    });

    it('handles Escape key to close popups', () => {
        const setShowHistory = jest.fn();
        const setShowSuggestions = jest.fn();
        render(
            <TerminalInput
                {...defaultProps}
                setShowHistory={setShowHistory}
                setShowSuggestions={setShowSuggestions}
            />
        );

        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, {key: 'Escape'});

        expect(setShowHistory).toHaveBeenCalledWith(false);
        expect(setShowSuggestions).toHaveBeenCalledWith(false);
    });

    it('closes popups on regular key input', () => {
        const setShowHistory = jest.fn();
        const setShowSuggestions = jest.fn();
        render(
            <TerminalInput
                {...defaultProps}
                setShowHistory={setShowHistory}
                setShowSuggestions={setShowSuggestions}
            />
        );

        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, {key: 'a'});

        expect(setShowHistory).toHaveBeenCalledWith(false);
        expect(setShowSuggestions).toHaveBeenCalledWith(false);
    });

    it('renders command history when visible', () => {
        render(<TerminalInput {...defaultProps} showHistory={true}/>);

        expect(screen.getByTestId('command-history')).toBeInTheDocument();
    });

    it('renders command suggestions when visible', () => {
        render(
            <TerminalInput
                {...defaultProps}
                showSuggestions={true}
                suggestions={['help', 'home']}
            />
        );

        expect(screen.getByTestId('command-suggestions')).toBeInTheDocument();
        expect(screen.getByText('help')).toBeInTheDocument();
        expect(screen.getByText('home')).toBeInTheDocument();
    });

    it('handles command selection from history', async () => {
        const setCurrent = jest.fn();
        const setShowHistory = jest.fn();
        render(
            <TerminalInput
                {...defaultProps}
                showHistory={true}
                setCurrent={setCurrent}
                setShowHistory={setShowHistory}
            />
        );

        fireEvent.click(screen.getByText('help'));

        expect(setCurrent).toHaveBeenCalledWith('help');
        expect(setShowHistory).toHaveBeenCalledWith(false);
    });

    it('handles suggestion selection', async () => {
        const setCurrent = jest.fn();
        const setShowSuggestions = jest.fn();
        render(
            <TerminalInput
                {...defaultProps}
                showSuggestions={true}
                suggestions={['help']}
                setCurrent={setCurrent}
                setShowSuggestions={setShowSuggestions}
            />
        );

        fireEvent.click(screen.getByText('help'));

        expect(setCurrent).toHaveBeenCalledWith('help');
        expect(setShowSuggestions).toHaveBeenCalledWith(false);
    });

    it('renders terminal cursor', () => {
        render(<TerminalInput {...defaultProps} />);

        expect(screen.getByTestId('terminal-cursor')).toBeInTheDocument();
        expect(screen.getByTestId('terminal-cursor')).toHaveAttribute('data-visible', 'true');
    });

    it('has proper accessibility attributes', () => {
        render(<TerminalInput {...defaultProps} />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('aria-label', 'terminal input');
        expect(input).toHaveAttribute('spellCheck', 'false');
    });

    it('auto focuses when autoFocus is true', () => {
        render(<TerminalInput {...defaultProps} autoFocus={true}/>);

        const input = screen.getByRole('textbox');
        expect(input).toHaveFocus();
    });
});