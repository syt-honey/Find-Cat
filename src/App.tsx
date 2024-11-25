import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import DifficultySelector from './components/DifficultySelector';
import GameSummary from './components/GameSummary';
import { Difficulty } from './types';

const GAME_DURATION = 30; // 30 seconds per round

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('简单');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    let timer: number;
    if (gameStarted && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setGameStarted(false);
            setShowSummary(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted]);

  const handleGameStart = () => {
    setGameStarted(true);
    setScore(0);
    setTimeRemaining(GAME_DURATION);
    setShowSummary(false);
  };

  const handleSuccess = () => {
    setScore((prev) => prev + 1);
  };

  const handleNewGame = () => {
    setShowSummary(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">找到小猫咪！</h1>
          <p className="text-lg text-purple-600">
            在小鸟群中找到躲藏的小猫咪
          </p>
        </header>

        <DifficultySelector 
          difficulty={difficulty} 
          onSelect={setDifficulty}
          disabled={gameStarted}
        />

        <ScoreBoard 
          score={score}
          timeRemaining={timeRemaining}
        />

        {showSummary ? (
          <GameSummary
            score={score}
            difficulty={difficulty}
            onNewGame={handleGameStart}
          />
        ) : !gameStarted ? (
          <button
            onClick={handleGameStart}
            className="block mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
          >
            开始游戏
          </button>
        ) : (
          <GameBoard
            difficulty={difficulty}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default App;