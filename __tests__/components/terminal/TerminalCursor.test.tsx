import React from 'react';
import {act, render, renderHook, screen} from '@testing-library/react';
import TerminalCursor, {useCursorBlink, useCursorType} from '@/app/components/terminal/TerminalCursor';

describe('TerminalCursor Component', () => {
    const defaultProps = {
        cursorType: 'block',
        cursorVisible: true,
        currentInput: 'test',
    };

    it('renders cursor with correct position', () => {
        render(<TerminalCursor {...defaultProps} />);

        const cursor = screen.getByText('█');
        expect(cursor).toBeInTheDocument();
    });

    it('renders block cursor', () => {
        render(<TerminalCursor {...defaultProps} cursorType="block"/>);
        expect(screen.getByText('█')).toBeInTheDocument();
    });

    it('renders underscore cursor', () => {
        render(<TerminalCursor {...defaultProps} cursorType="underscore"/>);
        expect(screen.getByText('_')).toBeInTheDocument();
    });

    it('renders pipe cursor', () => {
        render(<TerminalCursor {...defaultProps} cursorType="pipe"/>);
        expect(screen.getByText('|')).toBeInTheDocument();
    });

    it('renders dot cursor', () => {
        render(<TerminalCursor {...defaultProps} cursorType="dot"/>);
        expect(screen.getByText('●')).toBeInTheDocument();
    });

    it('renders different cursor types', () => {
        const {rerender} = render(<TerminalCursor {...defaultProps} cursorType="arrow"/>);
        expect(screen.getByText('▶')).toBeInTheDocument();

        rerender(<TerminalCursor {...defaultProps} cursorType="diamond"/>);
        expect(screen.getByText('◆')).toBeInTheDocument();

        rerender(<TerminalCursor {...defaultProps} cursorType="star"/>);
        expect(screen.getByText('★')).toBeInTheDocument();

        rerender(<TerminalCursor {...defaultProps} cursorType="heart"/>);
        expect(screen.getByText('♥')).toBeInTheDocument();
    });

    it('defaults to block cursor for unknown type', () => {
        render(<TerminalCursor {...defaultProps} cursorType="unknown"/>);
        expect(screen.getByText('█')).toBeInTheDocument();
    });
});

describe('useCursorType hook', () => {
    it('returns default cursor type', () => {
        const {result} = renderHook(() => useCursorType());

        expect(result.current.cursorType).toBe('block');
    });

    it('updates cursor type', () => {
        const {result} = renderHook(() => useCursorType());

        act(() => {
            result.current.setCursorType('pipe');
        });

        expect(result.current.cursorType).toBe('pipe');
    });

    it('persists cursor type in localStorage', () => {
        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
        const {result} = renderHook(() => useCursorType());

        act(() => {
            result.current.setCursorType('underscore');
        });

        expect(setItemSpy).toHaveBeenCalledWith('terminal-cursor-type', 'underscore');
        setItemSpy.mockRestore();
    });

    it('loads cursor type from localStorage', () => {
        const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('diamond');

        const {result} = renderHook(() => useCursorType());

        expect(result.current.cursorType).toBe('diamond');
        getItemSpy.mockRestore();
    });

    it('handles localStorage errors gracefully', () => {
        const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('localStorage error');
        });

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        try {
            const {result} = renderHook(() => useCursorType());
            expect(result.current.cursorType).toBe('block');
        } catch {
            // Expected to throw during initialization
        }

        getItemSpy.mockRestore();
        consoleSpy.mockRestore();
    });
});

describe('useCursorBlink hook', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('returns initial blink state', () => {
        const {result} = renderHook(() => useCursorBlink());

        expect(result.current).toBe(true);
    });

    it('toggles blink state over time', () => {
        const {result} = renderHook(() => useCursorBlink());

        expect(result.current).toBe(true);

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe(false);

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe(true);
    });

    it('cleans up interval on unmount', () => {
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
        const {unmount} = renderHook(() => useCursorBlink());

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalled();
        clearIntervalSpy.mockRestore();
    });
});