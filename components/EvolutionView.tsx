import React, { useState, useRef } from 'react';
import { RetroButton } from './RetroButton';
import { EVOLUTION_TITLES } from '../constants';

interface EvolutionViewProps {
  completedCount: number;
  onBack: () => void;
}

export const EvolutionView: React.FC<EvolutionViewProps> = ({ completedCount, onBack }) => {
  // Max unlocked level
  const maxLevel = Math.min(completedCount, EVOLUTION_TITLES.length - 1);

  // State for currently viewed level
  const [viewingLevel, setViewingLevel] = useState(maxLevel);

  const currentTitle = EVOLUTION_TITLES[viewingLevel];
  const imagePath = `./evolution_${viewingLevel}.png`;

  // Navigation handlers
  const handlePrev = () => {
    if (viewingLevel > 0) setViewingLevel(l => l - 1);
  };

  const handleNext = () => {
    if (viewingLevel < maxLevel) setViewingLevel(l => l + 1);
  };

  // Swipe Logic
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe Threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped Left -> Next
        handleNext();
      } else {
        // Swiped Right -> Prev
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300 w-full max-w-md mx-auto">
      <div className="bg-white border-4 border-pink-400 p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] w-full text-center">
        <h2 className="text-xl text-pink-600 mb-2 uppercase tracking-wide">My Style</h2>

        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-4 px-4">
          <button
            onClick={handlePrev}
            disabled={viewingLevel === 0}
            className={`text-2xl ${viewingLevel === 0 ? 'opacity-20' : 'active:scale-90'}`}
          >
            ◀
          </button>
          <div className="text-xs text-gray-500">
            Level {viewingLevel} / {maxLevel}
          </div>
          <button
            onClick={handleNext}
            disabled={viewingLevel === maxLevel}
            className={`text-2xl ${viewingLevel === maxLevel ? 'opacity-20' : 'active:scale-90'}`}
          >
            ▶
          </button>
        </div>

        <div
          className="relative w-64 h-80 mx-auto bg-pink-50 border-4 border-pink-200 mb-6 flex items-center justify-center overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={viewingLevel} // Force re-render for animation
            src={imagePath}
            alt={`Style Level ${viewingLevel}`}
            className="w-full h-full object-contain animate-in fade-in duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLElement).parentElement;
              if (parent) parent.innerText = "Add image: " + imagePath;
            }}
          />

          {/* Swipe Hint */}
          {maxLevel > 0 && (
            <div className="absolute bottom-2 text-[8px] text-pink-300 opacity-50">
              SWIPE ↔
            </div>
          )}
        </div>

        <h3 className="text-lg text-purple-600 mb-4 h-8">{currentTitle}</h3>

        <p className="text-[10px] text-gray-400 mb-6 px-4">
          {viewingLevel === maxLevel
            ? "Solve more riddles to unlock new outfits!"
            : "Keep going to unlock more!"}
        </p>

        <RetroButton onClick={onBack} fullWidth variant="secondary">
          Back to Hub
        </RetroButton>
      </div>
    </div>
  );
};