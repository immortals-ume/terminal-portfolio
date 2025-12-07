import React from 'react';
import {render, screen} from '@testing-library/react';
import System from '@/app/components/commands/System';

describe('System Component', () => {
    it('renders system information', () => {
        render(<System/>);
        expect(screen.getByText(/System Information/)).toBeInTheDocument();
    });

    it('renders current time', () => {
        render(<System/>);
        expect(screen.getByText(/Current Time/)).toBeInTheDocument();
    });

    it('renders system status', () => {
        render(<System/>);
        expect(screen.getByText(/Portfolio Status/)).toBeInTheDocument();
    });
});