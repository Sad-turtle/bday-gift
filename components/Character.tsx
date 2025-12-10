import React, { useEffect, useState } from 'react';
import { Direction } from '../types';

interface CharacterProps {
  direction: Direction;
  isMoving: boolean;
}

export const Character: React.FC<CharacterProps> = ({ direction, isMoving }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isMoving) {
      interval = setInterval(() => {
        setFrame(prev => (prev + 1) % 4);
      }, 100);
    } else {
      setFrame(0);
    }
    return () => clearInterval(interval);
  }, [isMoving]);

  // Sprite Sheet Logic (4x4 Grid)
  // Row 0: Front (DOWN)
  // Row 1: Side Right (RIGHT)
  // Row 2: Side Left (LEFT)
  // Row 3: Back (UP)
  const getRow = () => {
    switch (direction) {
      case 'DOWN': return 0;
      case 'RIGHT': return 2;
      case 'LEFT': return 1;
      case 'UP': return 3;
      default: return 0;
    }
  };

  const row = getRow();

  // Calculate background position percentages
  // 0% = 1st frame, 33.33% = 2nd frame, 66.66% = 3rd frame, 100% = 4th frame
  const bgX = `${frame * 33.33}%`;
  const bgY = `${row * 33.33}%`;

  return (
    <div className="w-full h-full relative pointer-events-none">
      {/* 
         Sprite Container
         We apply a CSS filter to brighten the image as requested to simulate lighter skin.
         Note: Ideally, you should edit the 'princess.png' file in an image editor for best results.
      */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-16"
        style={{
          backgroundImage: 'url("./princess.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '400% 400%', // 4 columns x 4 rows
          backgroundPosition: `${bgX} ${bgY}`,
          imageRendering: 'pixelated',
          // High brightness and lower contrast to lighten skin tone significantly
          filter: 'brightness(1.5) contrast(0.8) sepia(0.2)'
        }}
      >
        {/* Fallback if image fails */}
        <img
          src="./princess.png"
          alt="Princess"
          className="opacity-0 w-full h-full"
          onError={(e) => {
            const parent = (e.target as HTMLElement).parentElement;
            if (parent) {
              parent.style.backgroundImage = 'none';
              parent.style.backgroundColor = '#ec4899';
              parent.style.borderRadius = '4px';
            }
          }}
        />
      </div>
    </div>
  );
};