import React from 'react';
import { render, screen } from '@testing-library/react';
import TerminalOutput from '@/app/components/terminal/TerminalOutput';

describe('TerminalOutput Component', () => {
  const mockSubmitted = [
    'guest@portfolio:~$ help',
    'guest@portfolio:~$ skills',
    'guest@portfolio:~$ projects',
  ];

  const mockOutput = [
    { type: 'text' as const, value: 'Welcome to the terminal!' },
    { type: 'text' as const, value: 'Here are the available commands:' },
    { type: 'component' as const, key: 'help', element: <div>Help Component</div> },
  ];

  it('renders submitted commands', () => {
    render(<TerminalOutput submitted={mockSubmitted} output={[]} />);
    
    expect(screen.getByText('guest@portfolio:~$ help')).toBeInTheDocument();
    expect(screen.getByText('guest@portfolio:~$ skills')).toBeInTheDocument();
    expect(screen.getByText('guest@portfolio:~$ projects')).toBeInTheDocument();
  });

  it('renders text output items', () => {
    render(<TerminalOutput submitted={[]} output={mockOutput} />);
    
    expect(screen.getByText('Welcome to the terminal!')).toBeInTheDocument();
    expect(screen.getByText('Here are the available commands:')).toBeInTheDocument();
  });

  it('renders component output items', () => {
    render(<TerminalOutput submitted={[]} output={mockOutput} />);
    
    expect(screen.getByText('Help Component')).toBeInTheDocument();
  });

  it('renders both submitted commands and output', () => {
    render(<TerminalOutput submitted={mockSubmitted} output={mockOutput} />);
    
    // Check submitted commands
    expect(screen.getByText('guest@portfolio:~$ help')).toBeInTheDocument();
    expect(screen.getByText('guest@portfolio:~$ skills')).toBeInTheDocument();
    
    // Check output
    expect(screen.getByText('Welcome to the terminal!')).toBeInTheDocument();
    expect(screen.getByText('Help Component')).toBeInTheDocument();
  });

  it('handles empty submitted array', () => {
    render(<TerminalOutput submitted={[]} output={mockOutput} />);
    
    expect(screen.getByText('Welcome to the terminal!')).toBeInTheDocument();
    expect(screen.getByText('Help Component')).toBeInTheDocument();
  });

  it('handles empty output array', () => {
    render(<TerminalOutput submitted={mockSubmitted} output={[]} />);
    
    expect(screen.getByText('guest@portfolio:~$ help')).toBeInTheDocument();
    expect(screen.getByText('guest@portfolio:~$ skills')).toBeInTheDocument();
    expect(screen.getByText('guest@portfolio:~$ projects')).toBeInTheDocument();
  });

  it('handles both empty arrays', () => {
    const { container } = render(<TerminalOutput submitted={[]} output={[]} />);
    
    // Should render without errors
    expect(container).toBeInTheDocument();
  });

  it('preserves order of submitted commands', () => {
    const { container } = render(<TerminalOutput submitted={mockSubmitted} output={[]} />);
    
    const textContent = container.textContent;
    const helpIndex = textContent?.indexOf('help') || 0;
    const skillsIndex = textContent?.indexOf('skills') || 0;
    const projectsIndex = textContent?.indexOf('projects') || 0;
    
    expect(helpIndex).toBeLessThan(skillsIndex);
    expect(skillsIndex).toBeLessThan(projectsIndex);
  });

  it('preserves order of output items', () => {
    const { container } = render(<TerminalOutput submitted={[]} output={mockOutput} />);
    
    const textContent = container.textContent;
    const welcomeIndex = textContent?.indexOf('Welcome') || 0;
    const commandsIndex = textContent?.indexOf('Here are the available') || 0;
    const helpIndex = textContent?.indexOf('Help Component') || 0;
    
    expect(welcomeIndex).toBeLessThan(commandsIndex);
    expect(commandsIndex).toBeLessThan(helpIndex);
  });

  it('handles complex component elements', () => {
    const complexOutput = [
      {
        type: 'component' as const,
        key: 'complex',
        element: (
          <div>
            <h2>Complex Component</h2>
            <p>With multiple elements</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        ),
      },
    ];

    render(<TerminalOutput submitted={[]} output={complexOutput} />);
    
    expect(screen.getByText('Complex Component')).toBeInTheDocument();
    expect(screen.getByText('With multiple elements')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles mixed text and component output', () => {
    const mixedOutput = [
      { type: 'text' as const, value: 'Text before component' },
      { type: 'component' as const, key: 'middle', element: <span>Middle Component</span> },
      { type: 'text' as const, value: 'Text after component' },
    ];

    render(<TerminalOutput submitted={[]} output={mixedOutput} />);
    
    expect(screen.getByText('Text before component')).toBeInTheDocument();
    expect(screen.getByText('Middle Component')).toBeInTheDocument();
    expect(screen.getByText('Text after component')).toBeInTheDocument();
  });

  it('handles multiline text output', () => {
    const multilineOutput = [
      { type: 'text' as const, value: 'Line 1\nLine 2\nLine 3' },
    ];

    render(<TerminalOutput submitted={[]} output={multilineOutput} />);
    
    expect(screen.getByText(/Line 1/)).toBeInTheDocument();
    expect(screen.getByText(/Line 2/)).toBeInTheDocument();
    expect(screen.getByText(/Line 3/)).toBeInTheDocument();
  });

  it('handles empty text values', () => {
    const emptyTextOutput = [
      { type: 'text' as const, value: '' },
      { type: 'text' as const, value: 'Non-empty text' },
    ];

    render(<TerminalOutput submitted={[]} output={emptyTextOutput} />);
    
    expect(screen.getByText('Non-empty text')).toBeInTheDocument();
  });

  it('uses unique keys for output items', () => {
    const outputWithKeys = [
      { type: 'text' as const, value: 'Text 1' },
      { type: 'text' as const, value: 'Text 2' },
      { type: 'component' as const, key: 'comp1', element: <div>Component 1</div> },
      { type: 'component' as const, key: 'comp2', element: <div>Component 2</div> },
    ];

    const { container } = render(<TerminalOutput submitted={[]} output={outputWithKeys} />);
    
    // Should render without React key warnings
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Text 1')).toBeInTheDocument();
    expect(screen.getByText('Text 2')).toBeInTheDocument();
    expect(screen.getByText('Component 1')).toBeInTheDocument();
    expect(screen.getByText('Component 2')).toBeInTheDocument();
  });
});