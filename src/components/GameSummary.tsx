import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import { Difficulty } from '../types';
import { motion } from 'framer-motion';

interface GameSummaryProps {
  score: number;
  difficulty: Difficulty;
  onNewGame: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({ score, difficulty, onNewGame }) => {
  const getMessage = (score: number) => {
    if (score === 0) return '继续加油哦！';
    if (score < 5) return '做得不错！';
    if (score < 10) return '太棒了！';
    return '你太厉害了！';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto"
    >
      <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-purple-800 mb-2">游戏结束！</h2>
      <p className="text-lg text-purple-600 mb-4">
        在{difficulty}难度下，
        <br />
        你找到了 <span className="font-bold text-xl">{score}</span> 只小猫咪！
      </p>
      <p className="text-purple-500 mb-6">{getMessage(score)}</p>
      <button
        onClick={onNewGame}
        className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
      >
        再玩一次 <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default GameSummary;