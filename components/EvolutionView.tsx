import React from 'react';
import { RetroButton } from './RetroButton';
import { EVOLUTION_TITLES } from '../constants';

interface EvolutionViewProps {
  completedCount: number;
  onBack: () => void;
}

export const EvolutionView: React.FC<EvolutionViewProps> = ({ completedCount, onBack }) => {
  // Ensure we don't exceed the number of images we have titles for
  const currentLevel = Math.min(completedCount, EVOLUTION_TITLES.length - 1);
  const currentTitle = EVOLUTION_TITLES[currentLevel];
  
  // Image path: evolution_0.png, evolution_1.png, etc.
  // These files must exist in the public folder
  const imagePath = `./evolution_${currentLevel}.png`;

  return (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300 w-full max-w-md mx-auto">
      <div className="bg-white border-4 border-pink-400 p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] w-full text-center">
        <h2 className="text-xl text-pink-600 mb-2 uppercase tracking-wide">My Style</h2>
        <div className="text-xs text-gray-500 mb-6">Level {currentLevel} / 7</div>

        <div className="relative w-64 h-80 mx-auto bg-pink-50 border-4 border-pink-200 mb-6 flex items-center justify-center overflow-hidden">
          <img 
            src={imagePath} 
            alt={`Style Level ${currentLevel}`}
            className="w-full h-full object-contain"
            onError={(e) => {
               // Fallback if image missing
               (e.target as HTMLImageElement).style.display = 'none';
               const parent = (e.target as HTMLElement).parentElement;
               if (parent) parent.innerText = "Add image: " + imagePath;
            }}
          />
        </div>

        <h3 className="text-lg text-purple-600 mb-4">{currentTitle}</h3>
        
        <p className="text-[10px] text-gray-400 mb-6 px-4">
          Solve more riddles to unlock new outfits!
        </p>

        <RetroButton onClick={onBack} fullWidth variant="secondary">
          Back to Hub
        </RetroButton>
      </div>
    </div>
  );
};