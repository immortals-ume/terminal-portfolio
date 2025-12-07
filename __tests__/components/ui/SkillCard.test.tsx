/**
 * SkillCard Component Tests
 *
 * Tests for the SkillCard component that displays individual skills with proficiency
 */

import {fireEvent, render, screen} from '@testing-library/react';
import {SkillCard} from '@/app/components/ui/SkillCard';
import type {Skill} from '@/lib/types';
import React from 'react';

// Mock useThemeColors hook
jest.mock('@/hooks/useThemeColors', () => ({
    useThemeColors: () => ({
        bgPrimary: '#0a1a2e',
        bgSecondary: '#1a2a3e',
        textPrimary: '#00d4ff',
        textSecondary: '#88d4ff',
        accent: '#00d4ff',
        success: '#00d4ff',
        warning: '#0099cc',
        error: '#ff3b30',
        neon: '#00d4ff',
        neonSoft: 'rgba(0, 212, 255, 0.2)',
    }),
}));

describe('SkillCard', () => {
    const mockSkill: Skill = {
        name: 'TypeScript',
        proficiency: 'Advanced',
        yearsOfExperience: 3,
        description: 'Type-safe development',
        isDaily: false
    };

    it('renders skill name', () => {
        render(<SkillCard skill={mockSkill} index={0}/>);
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('renders proficiency badge', () => {
        render(<SkillCard skill={mockSkill} index={0}/>);
        expect(screen.getByText('Advanced')).toBeInTheDocument();
    });

    it('renders proficiency icon', () => {
        render(<SkillCard skill={mockSkill} index={0}/>);
        // Advanced proficiency has ⭐⭐ icon
        expect(screen.getByText('⭐⭐')).toBeInTheDocument();
    });

    it('renders progress bar', () => {
        render(<SkillCard skill={mockSkill} index={0}/>);
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
    });

    it('shows daily stack indicator when isDaily is true', () => {
        render(<SkillCard skill={mockSkill} index={0} isDaily={true}/>);
        expect(screen.getByTitle('Daily Tech Stack')).toBeInTheDocument();
    });

    it('does not show daily stack indicator when isDaily is false', () => {
        render(<SkillCard skill={mockSkill} index={0} isDaily={false}/>);
        expect(screen.queryByTitle('Daily Tech Stack')).not.toBeInTheDocument();
    });

    it('calls onHover callback on mouse enter', () => {
        const onHover = jest.fn();
        render(<SkillCard skill={mockSkill} index={0} onHover={onHover}/>);

        const card = screen.getByText('TypeScript').closest('.skill-card');
        if (card) {
            fireEvent.mouseEnter(card);
            expect(onHover).toHaveBeenCalledWith('TypeScript');
        }
    });

    it('calls onHover callback with null on mouse leave', () => {
        const onHover = jest.fn();
        render(<SkillCard skill={mockSkill} index={0} onHover={onHover}/>);

        const card = screen.getByText('TypeScript').closest('.skill-card');
        if (card) {
            fireEvent.mouseLeave(card);
            expect(onHover).toHaveBeenCalledWith(null);
        }
    });

    it('renders Expert proficiency correctly', () => {
        const expertSkill: Skill = {
            name: 'Java',
            proficiency: 'Expert',
            yearsOfExperience: 5,
            isDaily: true
        };
        render(<SkillCard skill={expertSkill} index={0}/>);

        expect(screen.getByText('Expert')).toBeInTheDocument();
        expect(screen.getByText('⭐⭐⭐')).toBeInTheDocument();
    });

    it('renders Intermediate proficiency correctly', () => {
        const intermediateSkill: Skill = {
            name: 'Python',
            proficiency: 'Intermediate',
            yearsOfExperience: 2
        };
        render(<SkillCard skill={intermediateSkill} index={0}/>);

        expect(screen.getByText('Intermediate')).toBeInTheDocument();
        expect(screen.getByText('⭐')).toBeInTheDocument();
    });

    it('renders Beginner proficiency correctly', () => {
        const beginnerSkill: Skill = {
            name: 'Rust',
            proficiency: 'Beginner',
            yearsOfExperience: 1
        };
        render(<SkillCard skill={beginnerSkill} index={0}/>);

        expect(screen.getByText('Beginner')).toBeInTheDocument();
        expect(screen.getByText('○')).toBeInTheDocument();
    });

    it('shows tooltip with years of experience on hover', () => {
        render(<SkillCard skill={mockSkill} index={0}/>);

        const card = screen.getByText('TypeScript').closest('.skill-card');
        if (card) {
            fireEvent.mouseEnter(card);
            expect(screen.getByText(/3 years of experience/i)).toBeInTheDocument();
        }
    });

    it('shows tooltip with description on hover', () => {
        render(<SkillCard skill={mockSkill} index={0}/>);

        const card = screen.getByText('TypeScript').closest('.skill-card');
        if (card) {
            fireEvent.mouseEnter(card);
            expect(screen.getByText(/Type-safe development/i)).toBeInTheDocument();
        }
    });

    it('hides tooltip on mouse leave', async () => {
        const {container} = render(<SkillCard skill={mockSkill} index={0}/>);

        const card = screen.getByText('TypeScript').closest('.skill-card');
        if (card) {
            fireEvent.mouseEnter(card);
            expect(screen.getByText(/3 years of experience/i)).toBeInTheDocument();

            fireEvent.mouseLeave(card);
            // Tooltip should fade out and eventually be removed
            await new Promise(resolve => setTimeout(resolve, 250));
            expect(container.querySelector('.hover-tooltip')).not.toBeInTheDocument();
        }
    });
});
