import React from 'react';
import {render, screen} from '@testing-library/react';
import Skills from '@/app/components/commands/Skills';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({children, ...props}: any) => <div {...props}>{children}</div>,
    },
}));

describe('Skills Component', () => {
    it('renders skills header', () => {
        render(<Skills/>);
        expect(screen.getByText('Programming Languages:')).toBeInTheDocument();
    });

    it('renders all skill categories', () => {
        render(<Skills/>);

        expect(screen.getByText('Programming Languages:')).toBeInTheDocument();
        expect(screen.getByText('Frameworks & Libraries:')).toBeInTheDocument();
        expect(screen.getByText('Databases:')).toBeInTheDocument();
        expect(screen.getByText('Cloud & DevOps:')).toBeInTheDocument();
    });

    it('renders skills with different levels', () => {
        render(<Skills/>);

        // Check for skill level indicators (allowing for legend text too)
        expect(screen.getAllByText(/★★★/).length).toBeGreaterThan(0); // Expert skills
        expect(screen.getAllByText(/★★☆/).length).toBeGreaterThan(0); // Advanced skills
        expect(screen.getAllByText(/★☆☆/).length).toBeGreaterThan(0); // Intermediate skills
    });

    it('renders skill legend', () => {
        render(<Skills/>);

        expect(screen.getByText(/★★★ Expert/)).toBeInTheDocument();
        expect(screen.getByText(/★★☆ Advanced/)).toBeInTheDocument();
        expect(screen.getByText(/★☆☆ Intermediate/)).toBeInTheDocument();
    });

    it('has proper structure', () => {
        const {container} = render(<Skills/>);
        expect(container.firstChild).toBeInTheDocument();
    });
});