import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Terminal from '@/app/components/Terminal';


jest.mock('@/app/components/terminal/SystemInitializer', () => {
    return function MockSystemInitializer({onComplete}: { onComplete: () => void }) {
        return (
            <div data-testid="system-initializer">
                <button onClick={onComplete}>Complete Initialization</button>
            </div>
        );
    };
});

jest.mock('@/app/components/terminal/TerminalHeader', () => {
    return function MockTerminalHeader() {
        return <div data-testid="terminal-header">Terminal Header</div>;
    };
});

jest.mock('@/app/components/terminal/TerminalOutput', () => {
    return function MockTerminalOutput({submitted, output}: any) {
        return (
            <div data-testid="terminal-output">
                {submitted.map((item: string, index: number) => (
                    <div key={index}>{item}</div>
                ))}
                {output.map((item: any, index: number) => (
                    <div key={index}>{item.type === 'text' ? item.value : 'Component'}</div>
                ))}
            </div>
        );
    };
});

jest.mock('@/app/components/terminal/TerminalInput', () => {
    return function MockTerminalInput({onSubmit, current, setCurrent}: any) {
        return (
            <div data-testid="terminal-input">
                <input
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmit(current);
                        }
                    }}
                />
            </div>
        );
    };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({children, ...props}: any) => <div {...props}>{children}</div>,
    },
}));

describe('Terminal Component', () => {
    beforeEach(() => {
        // Mock window.innerHeight and window.innerWidth
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 1024,
        });
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1280,
        });

        // Mock scrollIntoView
        Element.prototype.scrollIntoView = jest.fn();
    });

    it('renders system initializer when initializing', () => {
        render(<Terminal/>);
        expect(screen.getByTestId('system-initializer')).toBeInTheDocument();
    });

    it('shows terminal interface after initialization', async () => {
        render(<Terminal/>);

        // Complete initialization
        fireEvent.click(screen.getByText('Complete Initialization'));

        await waitFor(() => {
            expect(screen.getByTestId('terminal-header')).toBeInTheDocument();
            expect(screen.getByTestId('terminal-output')).toBeInTheDocument();
            expect(screen.getByTestId('terminal-input')).toBeInTheDocument();
        });
    });

    it('handles command execution', async () => {
        render(<Terminal/>);

        // Complete initialization
        fireEvent.click(screen.getByText('Complete Initialization'));

        await waitFor(() => {
            expect(screen.getByTestId('terminal-input')).toBeInTheDocument();
        });

        const input = screen.getByRole('textbox');

        // Type and execute help command
        await userEvent.type(input, 'help');
        fireEvent.keyDown(input, {key: 'Enter'});

        await waitFor(() => {
            expect(screen.getByText('guest@portfolio:~$ help')).toBeInTheDocument();
        });
    });

    it('handles clear command', async () => {
        render(<Terminal/>);

        // Complete initialization
        fireEvent.click(screen.getByText('Complete Initialization'));

        await waitFor(() => {
            expect(screen.getByTestId('terminal-input')).toBeInTheDocument();
        });

        const input = screen.getByRole('textbox');

        // Execute a command first
        await userEvent.type(input, 'help');
        fireEvent.keyDown(input, {key: 'Enter'});

        // Clear input and execute clear command
        await userEvent.clear(input);
        await userEvent.type(input, 'clear');
        fireEvent.keyDown(input, {key: 'Enter'});

        // Output should be cleared
        await waitFor(() => {
            const output = screen.getByTestId('terminal-output');
            expect(output).toBeEmptyDOMElement();
        });
    });

    it('handles unknown commands', async () => {
        render(<Terminal/>);

        // Complete initialization
        fireEvent.click(screen.getByText('Complete Initialization'));

        await waitFor(() => {
            expect(screen.getByTestId('terminal-input')).toBeInTheDocument();
        });

        const input = screen.getByRole('textbox');

        // Execute unknown command
        await userEvent.type(input, 'unknown-command');
        fireEvent.keyDown(input, {key: 'Enter'});

        await waitFor(() => {
            expect(screen.getByText("Command not found: unknown-command. Type 'help'.")).toBeInTheDocument();
        });
    });

    it('handles empty commands', async () => {
        render(<Terminal/>);

        // Complete initialization
        fireEvent.click(screen.getByText('Complete Initialization'));

        await waitFor(() => {
            expect(screen.getByTestId('terminal-input')).toBeInTheDocument();
        });

        const input = screen.getByRole('textbox');

        // Execute empty command
        fireEvent.keyDown(input, {key: 'Enter'});

        await waitFor(() => {
            // Should show the prompt without any error message
            expect(screen.getByTestId('terminal-output')).toBeInTheDocument();
        });
    });

    it('sets viewport height CSS variable on resize', () => {
        render(<Terminal/>);

        // Trigger resize event
        fireEvent(window, new Event('resize'));

        // Check if CSS variable is set
        const vh = window.innerHeight * 0.01;
        expect(document.documentElement.style.getPropertyValue('--vh')).toBe(`${vh}px`);
    });

    it('cleans up event listeners on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        const {unmount} = render(<Terminal/>);

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        removeEventListenerSpy.mockRestore();
    });
});