import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QuestDay } from '../types';
import { RetroButton } from './RetroButton';

interface RiddleViewProps {
  day: QuestDay;
  isCompleted: boolean;
  onSolve: (dayId: number) => void;
  onClose: () => void;
}

export const RiddleView: React.FC<RiddleViewProps> = ({ day, isCompleted, onSolve, onClose }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(isCompleted);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedInput = answer.toLowerCase().trim();
    const isCorrect = day.answer.some(a => a.toLowerCase() === normalizedInput);

    if (isCorrect) {
      triggerConfetti();
      setShowSuccess(true);
      onSolve(day.id);
      setError(false);
    } else {
      setError(true);
      // Shake effect timeout
      setTimeout(() => setError(false), 500);
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#facc15', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#facc15', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  if (showSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="text-4xl">👑</div>
        <h3 className="text-green-600 text-lg">Quest Complete!</h3>
        <div className="bg-yellow-50 p-4 border-2 border-yellow-200 text-yellow-800 text-sm leading-relaxed">
          {day.rewardMessage}
        </div>
        <div className="text-xs text-gray-400 mt-4">
          (This level is marked as complete)
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-pink-50 p-4 border-2 border-pink-200 text-pink-800 text-sm leading-relaxed">
        {day.riddle}
      </div>

      <div>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className={`w-full p-3 font-sans text-lg border-4 outline-none transition-colors ${
            error ? 'border-red-500 bg-red-50 shake' : 'border-gray-300 focus:border-pink-400'
          }`}
        />
        {error && <p className="text-red-500 text-xs mt-2">Try again, Princess!</p>}
      </div>

      <RetroButton type="submit" fullWidth>
        Unlock Reward
      </RetroButton>
    </form>
  );
};