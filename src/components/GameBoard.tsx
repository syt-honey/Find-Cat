import React, { useState, useEffect } from 'react';
import { Cat, Bird } from 'lucide-react';
import { Difficulty } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface GameBoardProps {
  difficulty: Difficulty;
  onSuccess: () => void;
}

const difficultySettings = {
  '简单': { grid: 3, items: 9, shuffleInterval: 2000 },
  '适中': { grid: 4, items: 16, shuffleInterval: 1500 },
  '困难': { grid: 5, items: 25, shuffleInterval: 1000 },
};

const GameBoard: React.FC<GameBoardProps> = ({ difficulty, onSuccess }) => {
  const [catPosition, setCatPosition] = useState(0);
  const [showMessage, setShowMessage] = useState('');
  const settings = difficultySettings[difficulty];

  useEffect(() => {
    const timer = setInterval(() => {
      setCatPosition(Math.floor(Math.random() * settings.items));
    }, settings.shuffleInterval);
    return () => clearInterval(timer);
  }, [difficulty, settings.items]);

  const handleClick = (index: number) => {
    if (index === catPosition) {
      setShowMessage('找到了！🎉');
      onSuccess();
      setTimeout(() => setShowMessage(''), 1000);
    } else {
      setShowMessage('再试一次！🔍');
      setTimeout(() => setShowMessage(''), 1000);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 
                     bg-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold text-purple-600"
          >
            {showMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="grid gap-4 mx-auto max-w-2xl"
        style={{ 
          gridTemplateColumns: `repeat(${settings.grid}, 1fr)`,
        }}
      >
        {Array.from({ length: settings.items }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleClick(index)}
            className="aspect-square bg-white rounded-lg shadow-md hover:shadow-lg
                     flex items-center justify-center transition-all
                     hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {index === catPosition ? (
              <Cat className="w-8 h-8 text-purple-600" />
            ) : (
              <Bird className="w-8 h-8 text-blue-400" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default GameBoard;