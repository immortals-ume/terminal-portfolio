'use client'

import React, { useEffect, useState } from 'react';

interface CommandHistoryProps {
  onCommandSelect: (command: string) => void;
  currentInput: string;
  isVisible: boolean;
}

export default function CommandHistory({ onCommandSelect, currentInput, isVisible }: CommandHistoryProps) {
  const [history, setHistory] = useState<string[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<string[]>([]);
  const [isFirstTime, setIsFirstTime] = useState(false);

  // Suggested commands for first-time users
  const suggestedCommands = ['home', 'help', 'skills', 'projects', 'contact', 'timeline'];

  useEffect(() => {
    // Load history from sessionStorage
    const savedHistory = sessionStorage.getItem('terminal-command-history');
    const hasVisited = sessionStorage.getItem('terminal-has-visited');
    
    if (savedHistory && savedHistory !== '[]') {
      // User has previous command history
      setHistory(JSON.parse(savedHistory));
      setIsFirstTime(false);
    } else {
      // First-time user or no previous commands
      setIsFirstTime(true);
      if (!hasVisited) {
        sessionStorage.setItem('terminal-has-visited', 'true');
      }
    }
  }, []);

  useEffect(() => {
    // Filter history based on current input
    if (currentInput.trim()) {
      if (isFirstTime || history.length === 0) {
        // Show suggested commands for first-time users
        const filtered = suggestedCommands.filter(cmd => 
          cmd.toLowerCase().includes(currentInput.toLowerCase())
        ).slice(0, 5);
        setFilteredHistory(filtered);
      } else {
        // Show actual command history
        const filtered = history.filter(cmd => 
          cmd.toLowerCase().includes(currentInput.toLowerCase())
        ).slice(0, 5);
        setFilteredHistory(filtered);
      }
    } else {
      if (isFirstTime || history.length === 0) {
        // Show top suggested commands for new users
        setFilteredHistory(suggestedCommands.slice(0, 5));
      } else {
        // Show recent command history
        setFilteredHistory(history.slice(0, 5));
      }
    }
  }, [currentInput, history, isFirstTime]);

  // Function to add commands to history (currently unused but kept for future use)
  // const addToHistory = (command: string) => {
  //   if (!command.trim()) return;
  //   
  //   const newHistory = [command, ...history.filter(cmd => cmd !== command)].slice(0, 50);
  //   setHistory(newHistory);
  //   sessionStorage.setItem('terminal-command-history', JSON.stringify(newHistory));
  //   
  //   if (isFirstTime) {
  //     setIsFirstTime(false);
  //   }
  // };

  if (!isVisible || filteredHistory.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-full left-0 mb-1 bg-black border border-green-400 rounded p-2 min-w-64 z-10">
      <div className="text-green-400 text-xs mb-1">
        {isFirstTime || history.length === 0 ? 'Suggested Commands:' : 'Command History:'}
      </div>
      {filteredHistory.map((cmd, index) => (
        <div
          key={index}
          onClick={() => onCommandSelect(cmd)}
          className="text-green-300 text-sm cursor-pointer hover:bg-green-900 hover:bg-opacity-20 px-2 py-1 rounded"
        >
          {cmd}
          {isFirstTime || history.length === 0 ? (
            <span className="text-green-600 text-xs ml-2">→ try this</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// Export the addToHistory function for external use
export const useCommandHistory = () => {
  const addToHistory = (command: string) => {
    if (!command.trim()) return;
    
    const savedHistory = sessionStorage.getItem('terminal-command-history');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    const newHistory = [command, ...history.filter((cmd: string) => cmd !== command)].slice(0, 50);
    sessionStorage.setItem('terminal-command-history', JSON.stringify(newHistory));
  };

  return { addToHistory };
};