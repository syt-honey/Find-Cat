import React from 'react';
import { Trophy, Timer } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  timeRemaining: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, timeRemaining }) => {
  return (
    <div className="flex justify-center gap-8 mb-8">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
        <Trophy className="text-yellow-500" />
        <span className="font-bold text-lg">{score}</span>
      </div>
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
        <Timer className="text-red-500" />
        <span className="font-bold text-lg">{timeRemaining}秒</span>
      </div>
    </div>
  );
};

export default ScoreBoard;