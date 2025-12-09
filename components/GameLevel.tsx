import React, { useState, useEffect, useCallback } from 'react';
import { Position, Direction } from '../types';
import { Character } from './Character';
import { DPad } from './DPad';

const TILE_SIZE = 48; // px

interface GameLevelProps {
  layout: string[]; 
  doors: { [key: number]: { isLocked: boolean, isCompleted: boolean } };
  theme?: { wallColor: string, floorColor: string, accentColor: string };
  onDoorEnter: (id: number) => void;
  onChestFound: () => void;
  startPos?: Position;
}

export const GameLevel: React.FC<GameLevelProps> = ({ 
  layout, 
  doors, 
  theme,
  onDoorEnter, 
  onChestFound,
  startPos
}) => {
  // Find 'S' in layout if startPos not provided
  const findStart = (): Position => {
    if (startPos) return startPos;
    for (let y = 0; y < layout.length; y++) {
      const x = layout[y].indexOf('S');
      if (x !== -1) return { x, y };
    }
    return { x: 1, y: 1 };
  };

  const [pos, setPos] = useState<Position>(findStart());
  const [dir, setDir] = useState<Direction>('DOWN');
  const [isMoving, setIsMoving] = useState(false);

  // Parse Layout
  const getTileAt = (x: number, y: number): string => {
    if (y < 0 || y >= layout.length) return 'W';
    const row = layout[y];
    if (x < 0 || x >= row.length) return 'W';
    return row[x];
  };

  const handleMove = useCallback((direction: Direction) => {
    setDir(direction);
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 200);

    let nextX = pos.x;
    let nextY = pos.y;

    if (direction === 'UP') nextY--;
    if (direction === 'DOWN') nextY++;
    if (direction === 'LEFT') nextX--;
    if (direction === 'RIGHT') nextX++;

    const tileChar = getTileAt(nextX, nextY);

    if (tileChar === 'W') return; // Wall

    if (/[1-7]/.test(tileChar)) {
        const doorId = parseInt(tileChar);
        onDoorEnter(doorId);
        return;
    }

    if (tileChar === 'C') {
        setPos({ x: nextX, y: nextY });
        setTimeout(onChestFound, 300); 
        return;
    }

    setPos({ x: nextX, y: nextY });

  }, [pos, layout, onDoorEnter, onChestFound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'w'].includes(e.key)) handleMove('UP');
      else if (['ArrowDown', 's'].includes(e.key)) handleMove('DOWN');
      else if (['ArrowLeft', 'a'].includes(e.key)) handleMove('LEFT');
      else if (['ArrowRight', 'd'].includes(e.key)) handleMove('RIGHT');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  // Default theme (Corridor)
  const currentTheme = theme || { wallColor: '#57534e', floorColor: '#f5f5f4', accentColor: '#fbbf24' };

  return (
    <div className="flex flex-col items-center">
        <div 
          className="relative overflow-hidden border-8 border-gray-800 bg-gray-900 shadow-xl rounded-lg"
          style={{ 
            width: Math.min(window.innerWidth - 32, layout[0].length * TILE_SIZE), 
            height: Math.min(400, layout.length * TILE_SIZE) 
          }}
        >
            <div 
                className="absolute transition-all duration-300 ease-out"
                style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-${pos.x * TILE_SIZE + TILE_SIZE/2}px, -${pos.y * TILE_SIZE + TILE_SIZE/2}px)`
                }}
            >
                {layout.map((row, y) => (
                    <div key={y} className="flex">
                        {row.split('').map((char, x) => {
                            let content = null;
                            let style = { width: TILE_SIZE, height: TILE_SIZE, backgroundColor: currentTheme.floorColor };

                            if (char === 'W') {
                                style.backgroundColor = currentTheme.wallColor;
                                content = <div className="w-full h-full border-b-4 border-black/20"></div>;
                            } else if (char === 'S') {
                                // Start pos, render floor
                            } else if (char === 'C') {
                                content = <div className="text-3xl animate-bounce">🎁</div>;
                            } else if (/[1-7]/.test(char)) {
                                const id = parseInt(char);
                                const door = doors[id];
                                if (!door) {
                                    content = null;
                                } else if (door.isCompleted) {
                                    content = <div className="text-2xl w-full h-full flex items-center justify-center bg-green-100 border-4 border-green-500 rounded">✅</div>;
                                } else if (door.isLocked) {
                                    content = <div className="text-2xl w-full h-full flex items-center justify-center bg-gray-300 border-4 border-gray-500 rounded">🔒</div>;
                                } else {
                                    content = (
                                      <div 
                                        className="text-2xl w-full h-full flex items-center justify-center border-4 animate-pulse rounded"
                                        style={{ backgroundColor: currentTheme.accentColor, borderColor: currentTheme.wallColor }}
                                      >
                                        🚪
                                      </div>
                                    );
                                }
                            }

                            return (
                                <div key={`${x}-${y}`} className="relative flex items-center justify-center box-border" style={style}>
                                    {content}
                                </div>
                            );
                        })}
                    </div>
                ))}
                
                <div 
                    className="absolute z-10 transition-all duration-200 ease-linear"
                    style={{ 
                        width: TILE_SIZE, 
                        height: TILE_SIZE,
                        left: pos.x * TILE_SIZE,
                        top: pos.y * TILE_SIZE
                    }}
                >
                    <Character direction={dir} isMoving={isMoving} />
                </div>
            </div>
        </div>
        
        <div className="mt-4">
           <DPad onMove={handleMove} />
        </div>
    </div>
  );
};