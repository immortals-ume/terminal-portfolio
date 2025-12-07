import React from 'react';
import {render, screen} from '@testing-library/react';
import Projects from '@/app/components/commands/Projects';

// Mock GitHub service
jest.mock('@/lib/github', () => ({
    createGitHubService: () => ({
        getRepositories: jest.fn().mockResolvedValue([]),
    }),
}));

describe('Projects Component', () => {
    it('renders loading state initially', () => {
        render(<Projects/>);
        expect(screen.getByText(/Loading projects/)).toBeInTheDocument();
    });

    it('renders component without crashing', () => {
        const {container} = render(<Projects/>);
        expect(container).toBeInTheDocument();
    });
});