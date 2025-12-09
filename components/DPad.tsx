import React from 'react';
import { Direction } from '../types';

interface DPadProps {
  onMove: (dir: Direction) => void;
}

export const DPad: React.FC<DPadProps> = ({ onMove }) => {
  const btnClass = "w-14 h-14 bg-gray-200 border-b-4 border-r-4 border-gray-400 active:border-0 active:translate-y-1 rounded-lg text-2xl flex items-center justify-center select-none touch-manipulation";

  return (
    <div className="grid grid-cols-3 gap-2 w-48 mx-auto mt-4">
      <div />
      <button className={btnClass} onPointerDown={(e) => { e.preventDefault(); onMove('UP'); }}>⬆️</button>
      <div />
      
      <button className={btnClass} onPointerDown={(e) => { e.preventDefault(); onMove('LEFT'); }}>⬅️</button>
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center opacity-50">🎮</div>
      <button className={btnClass} onPointerDown={(e) => { e.preventDefault(); onMove('RIGHT'); }}>➡️</button>

      <div />
      <button className={btnClass} onPointerDown={(e) => { e.preventDefault(); onMove('DOWN'); }}>⬇️</button>
      <div />
    </div>
  );
};