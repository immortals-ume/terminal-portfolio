/**
 * useHoverState Hook
 * 
 * Manages hover state for items in a list or collection. Provides stable
 * callback references for optimal performance with React.memo.
 * 
 * @template T - Type of the hover identifier (default: number)
 * @returns Object with hover state and handlers
 * 
 * @example
 * ```tsx
 * const { hovered, handleEnter, handleLeave, isHovered } = useHoverState<number>();
 * 
 * {items.map((item, index) => (
 *   <Card
 *     key={item.id}
 *     onMouseEnter={() => handleEnter(index)}
 *     onMouseLeave={handleLeave}
 *     isHovered={isHovered(index)}
 *   />
 * ))}
 * ```
 */

import { useState, useCallback } from 'react';

export function useHoverState<T = number>() {
  const [hovered, setHovered] = useState<T | null>(null);
  
  const handleEnter = useCallback((id: T) => {
    setHovered(id);
  }, []);
  
  const handleLeave = useCallback(() => {
    setHovered(null);
  }, []);
  
  const isHovered = useCallback((id: T) => {
    return hovered === id;
  }, [hovered]);
  
  return { 
    hovered, 
    handleEnter, 
    handleLeave, 
    isHovered 
  };
}
