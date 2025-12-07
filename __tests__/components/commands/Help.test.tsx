import React from 'react';
import {render} from '@testing-library/react';
import {screen} from '@testing-library/dom';
import Help from '@/app/components/commands/Help';

describe('Help Component', () => {
    it('renders available commands text', () => {
        render(<Help/>);
        expect(screen.getByText(/Available commands/)).toBeInTheDocument();
    });

    it('renders home command', () => {
        render(<Help/>);
        expect(screen.getByText(/- home/)).toBeInTheDocument();
        expect(screen.getByText(/About and quick start/)).toBeInTheDocument();
    });

    it('renders help command', () => {
        render(<Help/>);
        expect(screen.getByText(/- help/)).toBeInTheDocument();
        expect(screen.getByText(/Show available commands/)).toBeInTheDocument();
    });

    it('renders skills command', () => {
        render(<Help/>);
        expect(screen.getByText(/- skills/)).toBeInTheDocument();
        expect(screen.getByText(/List skills/)).toBeInTheDocument();
    });

    it('renders projects command', () => {
        render(<Help/>);
        expect(screen.getByText(/- projects/)).toBeInTheDocument();
        expect(screen.getByText(/List projects with GitHub links/)).toBeInTheDocument();
    });

    it('renders education command', () => {
        render(<Help/>);
        expect(screen.getByText(/- education/)).toBeInTheDocument();
        expect(screen.getByText(/Education details/)).toBeInTheDocument();
    });

    it('renders timeline command', () => {
        render(<Help/>);
        expect(screen.getByText(/- timeline/)).toBeInTheDocument();
        expect(screen.getByText(/Work\/career timeline/)).toBeInTheDocument();
    });

    it('renders certifications command', () => {
        render(<Help/>);
        expect(screen.getByText(/- certifications/)).toBeInTheDocument();
        expect(screen.getByText(/Show professional certifications from Credly/)).toBeInTheDocument();
    });

    it('renders contact command', () => {
        render(<Help/>);
        expect(screen.getByText(/- contact/)).toBeInTheDocument();
        expect(screen.getByText(/Contact information/)).toBeInTheDocument();
    });

    it('renders github command', () => {
        render(<Help/>);
        expect(screen.getByText(/- github/)).toBeInTheDocument();
        expect(screen.getByText(/Show GitHub profile statistics/)).toBeInTheDocument();
    });

    it('renders stats command', () => {
        render(<Help/>);
        expect(screen.getByText(/- stats/)).toBeInTheDocument();
        expect(screen.getByText(/Show coding statistics and achievements/)).toBeInTheDocument();
    });

    it('renders performance command', () => {
        render(<Help/>);
        expect(screen.getByText(/- performance/)).toBeInTheDocument();
        expect(screen.getByText(/Analyze portfolio performance metrics/)).toBeInTheDocument();
    });

    it('renders system command', () => {
        render(<Help/>);
        expect(screen.getByText(/- system/)).toBeInTheDocument();
        expect(screen.getByText(/Show system information/)).toBeInTheDocument();
    });

    it('renders cursor command', () => {
        render(<Help/>);
        expect(screen.getByText(/- cursor/)).toBeInTheDocument();
        expect(screen.getByText(/Change cursor style/)).toBeInTheDocument();
    });

    it('renders clear command', () => {
        render(<Help/>);
        expect(screen.getByText(/- clear/)).toBeInTheDocument();
        expect(screen.getByText(/Clear the screen/)).toBeInTheDocument();
    });

    it('renders navigation tips', () => {
        render(<Help/>);
        expect(screen.getByText(/Navigation Tips/)).toBeInTheDocument();
        expect(screen.getByText(/Tab - Autocomplete/)).toBeInTheDocument();
        expect(screen.getByText(/Up Arrow - Show command history popup/)).toBeInTheDocument();
        expect(screen.getByText(/Down Arrow - Navigate through history/)).toBeInTheDocument();
        expect(screen.getByText(/Escape - Close popups/)).toBeInTheDocument();
        expect(screen.getByText(/Click green links to open in new tab/)).toBeInTheDocument();
    });

    it('renders try it message', () => {
        render(<Help/>);
        expect(screen.getByText(/Try it: Type 'sk' and press Tab!/)).toBeInTheDocument();
    });
});