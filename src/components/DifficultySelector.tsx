import React from 'react';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  disabled: boolean;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onSelect,
  disabled
}) => {
  const difficulties: Difficulty[] = ['简单', '适中', '困难'];

  return (
    <div className="flex justify-center gap-4 mb-8">
      {difficulties.map((d) => (
        <button
          key={d}
          onClick={() => onSelect(d)}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
            ${difficulty === d 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'bg-white text-purple-600 shadow hover:shadow-md'
            }
          `}
        >
          {d.charAt(0).toUpperCase() + d.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;