'use client'

import React, { useEffect, useState } from 'react';

interface CommandHistoryProps {
  onCommandSelect: (command: string) => void;
  currentInput: string;
  isVisible: boolean;
}

let inMemoryHistory: string[] = [];
let historyUpdateListeners: (() => void)[] = [];

const notifyHistoryUpdate = () => {
  historyUpdateListeners.forEach(listener => listener());
};

export default function CommandHistory({ onCommandSelect, currentInput, isVisible }: CommandHistoryProps) {
  const [history, setHistory] = useState<string[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<string[]>([]);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const suggestedCommands = ['home', 'help', 'skills', 'projects', 'contact', 'timeline'];

  useEffect(() => {
    setHistory(inMemoryHistory);
    setIsFirstTime(inMemoryHistory.length === 0);

    const updateHistory = () => {
      setHistory([...inMemoryHistory]);
      setIsFirstTime(inMemoryHistory.length === 0);
    };

    historyUpdateListeners.push(updateHistory);

    return () => {
      historyUpdateListeners = historyUpdateListeners.filter(listener => listener !== updateHistory);
    };
  }, []);

  useEffect(() => {
    if (currentInput.trim()) {
      if (isFirstTime || history.length === 0) {

        const filtered = suggestedCommands.filter(cmd =>
          cmd.toLowerCase().includes(currentInput.toLowerCase())
        ).slice(0, 5);
        setFilteredHistory(filtered);
      } else {
        const filtered = history.filter(cmd =>
          cmd.toLowerCase().includes(currentInput.toLowerCase())
        ).slice(0, 5);
        setFilteredHistory(filtered);
      }
    } else {
      if (isFirstTime || history.length === 0) {
        setFilteredHistory(suggestedCommands.slice(0, 5));
      } else {
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
      {filteredHistory && filteredHistory.length > 0 ? filteredHistory.map((cmd, index) => (
        <div
          key={index}
          onClick={() => cmd && onCommandSelect(cmd)}
          className="text-green-300 text-sm cursor-pointer hover:bg-green-900 hover:bg-opacity-20 px-2 py-1 rounded"
        >
          {cmd || "Unknown command"}
          {isFirstTime || history.length === 0 ? (
            <span className="text-green-600 text-xs ml-2">→ try this</span>
          ) : null}
        </div>
      )) : (
        <div className="text-green-600 text-xs">No commands available</div>
      )}
    </div>
  );
}

export const useCommandHistory = () => {
  const addToHistory = (command: string) => {
    if (!command.trim()) return;

    inMemoryHistory = [command, ...inMemoryHistory.filter((cmd: string) => cmd !== command)].slice(0, 50);

    notifyHistoryUpdate();
  };

  return { addToHistory };
};