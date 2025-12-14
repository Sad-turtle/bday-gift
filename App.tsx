import React, { useState, useEffect, useRef } from 'react';
import { QUEST_CONFIG } from './constants';
import { ProgressState, GameView } from './types';
import { Modal } from './components/Modal';
import { RiddleView } from './components/RiddleView';
import { GameLevel } from './components/GameLevel';
import { EvolutionView } from './components/EvolutionView';
import { RetroButton } from './components/RetroButton';

const STORAGE_KEY = 'princess_quest_progress';

const HUB_MAP = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W..............................W",
  "W..1...2...3...4...5...6...7...W",
  "W..............................W",
  "WS.............................W",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

const App: React.FC = () => {
  // Game State
  const [progress, setProgress] = useState<ProgressState>({});
  const [today, setToday] = useState<string>('');
  const [debugMode, setDebugMode] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Navigation State
  const [view, setView] = useState<GameView>('HUB');
  const [activeDayId, setActiveDayId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lockedMessage, setLockedMessage] = useState<string | null>(null);

  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProgress(JSON.parse(saved));

    const params = new URLSearchParams(window.location.search);
    const debugDate = params.get('date');

    if (debugDate) {
      setToday(debugDate);
      setDebugMode(true);
    } else {
      const todayStr = new Date().toISOString().split('T')[0];
      setToday(todayStr);
    }
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio play failed:", error);
          // We won't alert, just let them use the toggle later
        });
      }
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().catch(e => console.error(e));
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  const handleDoorEnter = (doorId: number) => {
    const day = QUEST_CONFIG.days.find(d => d.id === doorId);
    if (!day) return;

    if (day.date > today) {
      setLockedMessage(day.lockedMessage || "Locked until the date arrives!");
      setTimeout(() => setLockedMessage(null), 3000);
      return;
    }

    setActiveDayId(doorId);
    setView('ROOM');
  };

  const handleChestFound = () => {
    setView('RIDDLE');
    setModalOpen(true);
  };

  const handleSolve = (dayId: number) => {
    const newProgress = { ...progress, [dayId]: true };
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setView('HUB');
    setActiveDayId(null);
  };

  // Pre-Game Loading Screen
  if (today && today < QUEST_CONFIG.startDate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-4 font-['Press_Start_2P']">
        <div className="bg-white border-4 border-pink-400 p-8 shadow-lg text-center">
          <h1 className="text-xl mb-4 text-pink-600">Quest Loading...</h1>
          <p className="text-xs text-gray-600 leading-6">The castle gates will open on <br /> {QUEST_CONFIG.startDate}</p>
        </div>
      </div>
    );
  }

  // Start Screen (Required for Audio)
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4 font-['Press_Start_2P'] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="bg-white p-8 border-4 border-yellow-400 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] text-center max-w-sm animate-in zoom-in duration-300">
          <h1 className="text-2xl text-pink-500 mb-6 leading-tight">Princess Quest</h1>
          <div className="text-4xl mb-6">👑</div>
          <p className="text-xs text-gray-500 mb-8 leading-relaxed">
            A magical adventure awaits you. Turn up your volume!
          </p>
          <RetroButton onClick={handleStartGame} fullWidth>
            ENTER CASTLE
          </RetroButton>
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} loop preload="auto">
          <source src="./music.mp3" type="audio/mpeg" />
        </audio>
      </div>
    );
  }

  const doorStatus: any = {};
  QUEST_CONFIG.days.forEach(day => {
    doorStatus[day.id] = {
      isLocked: day.date > today,
      isCompleted: !!progress[day.id]
    }
  });

  const activeDay = activeDayId ? QUEST_CONFIG.days.find(d => d.id === activeDayId) : null;
  const completedCount = Object.values(progress).filter(Boolean).length;

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      setProgress({});
      setView('HUB');
      setActiveDayId(null);
    }
  };

  return (
    <div className="min-h-screen pb-12 px-2 pt-4 max-w-2xl mx-auto relative select-none font-['Press_Start_2P']">

      {/* Audio Element (Persisted) */}
      <audio ref={audioRef} loop preload="auto">
        <source src="./music.mp3" type="audio/mpeg" />
      </audio>

      {/* Header & Controls */}
      <header className="flex justify-between items-center mb-6 px-2">
        <div className="flex gap-2">
          <button
            onClick={() => { setView('HUB'); setActiveDayId(null); }}
            className="bg-white border-4 border-pink-400 px-3 py-2 text-[10px] shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] hover:bg-pink-50 active:translate-y-1"
          >
            🏰 HUB
          </button>
          <button
            onClick={() => setView('EVOLUTION')}
            className="bg-purple-100 border-4 border-purple-400 px-3 py-2 text-[10px] shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] hover:bg-purple-50 active:translate-y-1"
          >
            👗 MY STYLE
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleResetProgress}
            className="bg-red-100 border-4 border-red-400 px-2 py-2 text-[10px] shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] hover:bg-red-50 active:translate-y-1 text-red-600"
            title="Reset Progress"
          >
            ↺
          </button>
          <button
            onClick={toggleMusic}
            className={`w-10 h-10 border-4 flex items-center justify-center text-lg active:scale-95 transition-colors ${isMuted ? 'bg-gray-200 border-gray-400 text-gray-500' : 'bg-green-100 border-green-400 text-green-600'}`}
          >
            {isMuted ? '🔇' : '🎵'}
          </button>
        </div>
      </header>

      {/* Game Area */}
      <div className="flex justify-center">
        {view === 'HUB' && (
          <GameLevel
            layout={HUB_MAP}
            doors={doorStatus}
            onDoorEnter={handleDoorEnter}
            onChestFound={() => { }}
          // No theme passed here = uses default grey/gold hub theme
          />
        )}

        {view === 'ROOM' && activeDay && (
          <div className="relative animate-in zoom-in-95 duration-300">
            <GameLevel
              layout={activeDay.mapLayout}
              theme={activeDay.theme}
              doors={{}}
              onDoorEnter={() => { }}
              onChestFound={handleChestFound}
            />
          </div>
        )}

        {view === 'EVOLUTION' && (
          <EvolutionView
            completedCount={completedCount}
            onBack={() => setView('HUB')}
          />
        )}

        {view === 'RIDDLE' && (
          // Riddle is handled by Modal, but we keep this empty div to maintain layout flow if needed
          <div className="h-0"></div>
        )}
      </div>

      <div className="text-center mt-6 text-[10px] text-gray-500 bg-white/80 backdrop-blur border-2 border-pink-200 p-3 rounded mx-4 shadow-sm">
        {view === 'HUB' && "GUIDE THE PRINCESS. ENTER THE DOORS."}
        {view === 'ROOM' && "FIND THE TREASURE CHEST!"}
        {view === 'EVOLUTION' && "YOUR STYLE EVOLVES AS YOU UNLOCK GIFTS!"}
      </div>

      {lockedMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-64 pointer-events-none">
          <div className="bg-red-500 text-white border-4 border-white p-4 text-center shadow-xl animate-bounce text-xs leading-5">
            {lockedMessage}
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={activeDay?.title || 'Quest'}
      >
        {activeDay && (
          <RiddleView
            day={activeDay}
            isCompleted={!!progress[activeDay.id]}
            onSolve={handleSolve}
            onClose={handleCloseModal}
          />
        )}
      </Modal>

      {debugMode && (
        <div className="fixed bottom-0 right-0 bg-black text-green-400 text-[10px] p-1 font-mono opacity-50 z-50 pointer-events-none">
          DEBUG: {today}
        </div>
      )}
    </div>
  );
};

export default App;