import { QuestConfig } from './types';

// ==========================================
// 👑 CONFIGURATION SECTION 👑
// ==========================================

const CURRENT_YEAR = new Date().getFullYear();

export const EVOLUTION_TITLES = [
  "Sleepy Princess (Pajamas)",
  "Fresh & Clean",
  "Secret Admirer",
  "Photogenic Queen",
  "Intellectual Beauty",
  "Artistic Soul",
  "Vibing Goddess",
  "The Ultimate Princess"
];

// MAP LEGEND:
// W = Wall
// . = Floor
// S = Start Position (Spawn)
// C = Chest (Goal)
// 1-7 = Door Numbers (Used in Hub only)

const MAPS = {
  hub: [
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "W..............................W",
    "W..1...2...3...4...5...6...7...W",
    "W..............................W",
    "WS.............................W",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
  ],
  bathroom: [
    "WWWWWWW",
    "W..C..W",
    "W.....W",
    "W..W..W",
    "W.S...W",
    "WWWWWWW"
  ],
  wardrobe: [
    "WWWWWWWWW",
    "W.......W",
    "W.WW.WW.W",
    "W.C...S.W",
    "W.......W",
    "WWWWWWWWW"
  ],
  studio: [
    "WWWWWWWWWWWWW",
    "W...........W",
    "WS....W....CW",
    "W...........W",
    "WWWWWWWWWWWWW"
  ],
  library: [
    "WWWWWWWWWWW",
    "W....C....W",
    "W.W.....W.W",
    "W....S....W",
    "WWWWWWWWWWW"
  ],
  gallery: [
    "WWWWWWWWWWW",
    "W.C.......W",
    "W...WWW...W",
    "W...W.W...W",
    "W.......S.W",
    "WWWWWWWWWWW"
  ],
  bedroom: [
    "WWWWWWW",
    "W..C..W",
    "W.....W",
    "W.....W",
    "W..S..W",
    "WWWWWWW"
  ],
  corridor: [
    "WWWWWWWWWWWWW",
    "W...........W",
    "W.S.......C.W",
    "W...........W",
    "WWWWWWWWWWWWW"
  ]
};

export const QUEST_CONFIG: QuestConfig = {
  recipientName: "Princess",
  startDate: `${CURRENT_YEAR}-12-10`,
  theme: {
    primaryColor: "pink-500",
    secondaryColor: "yellow-400"
  },
  days: [
    {
      id: 1,
      date: `${CURRENT_YEAR}-12-10`,
      title: "Level 1: The Bathroom",
      // Gift: Vibrator
      riddle: "I am a device used to induce reflex muscle contractions and stress relief.",
      answer: ["vibrator", "toy", "wand"],
      rewardMessage: "Check by the sink! 🌙",
      lockedMessage: "Patience! Opens Dec 10.",
      mapLayout: MAPS.bathroom,
      theme: { wallColor: "#0ea5e9", floorColor: "#e0f2fe", accentColor: "#ffffff" } // Clean Blue
    },
    {
      id: 2,
      date: `${CURRENT_YEAR}-12-11`,
      title: "Level 2: The Kitchen",
      // Gift: Why Nations Fail
      riddle: "I explain why the rich get rich and the poor stay poor.",
      answer: ["why nations fail", "book", "nations fail"],
      rewardMessage: "In the kitchen! 📖",
      mapLayout: MAPS.library,
      theme: { wallColor: "#d97706", floorColor: "#fffbeb", accentColor: "#b45309" } // Warm Kitchen
    },
    {
      id: 3,
      date: `${CURRENT_YEAR}-12-12`,
      title: "Level 3: The Wardrobe",
      // Gift: VS Panties
      riddle: "I am a complex structure that requires deep exploration to truly understand the friction between parties.",
      answer: ["panties", "underwear", "victoria secret", "vs", "victorias secret", "victoria's secret"],
      rewardMessage: "Hidden in your dresser! 👙",
      mapLayout: MAPS.wardrobe,
      theme: { wallColor: "#000000", floorColor: "#fbcfe8", accentColor: "#db2777" } // Sexy Black/Pink
    },
    {
      id: 4,
      date: `${CURRENT_YEAR}-12-13`,
      title: "Level 4: The Garden",
      // Gift: Lego Flower
      riddle: "I'm stiff, I'm plastic, and I need your hands to get me erect. Once I'm up, I'll stay hard and beautiful forever.",
      answer: ["lego", "flower", "lego flower", "lego flowers", "flowers", "plant"],
      rewardMessage: "On the shelf! 🌸",
      mapLayout: MAPS.gallery,
      theme: { wallColor: "#15803d", floorColor: "#dcfce7", accentColor: "#86efac" } // Garden Green
    },
    {
      id: 5,
      date: `${CURRENT_YEAR}-12-14`,
      title: "Level 5: The Washroom",
      // Gift: Electric Toothbrush
      riddle: "I vibrate in your hand and go in your mouth. Use me until you finish.",
      answer: ["toothbrush", "electric toothbrush", "brush"],
      rewardMessage: "By the sink! 🦷",
      mapLayout: MAPS.bathroom,
      theme: { wallColor: "#0ea5e9", floorColor: "#e0f2fe", accentColor: "#ffffff" } // Clean Blue
    },
    {
      id: 6,
      date: `${CURRENT_YEAR}-12-15`,
      title: "Level 6: The Studio",
      // Gift: Instax Mini
      riddle: "I shoot things.",
      answer: ["camera", "instax", "polaroid", "instax mini"],
      rewardMessage: "Inside your tote bag! 📸",
      mapLayout: MAPS.studio,
      theme: { wallColor: "#c084fc", floorColor: "#faf5ff", accentColor: "#f0abfc" } // Pop Purple
    },
    {
      id: 7,
      date: `${CURRENT_YEAR}-12-16`,
      title: "Level 7: The Finale",
      // Gift: Love Letter
      riddle: "You hold my heart in your hands. I am made of paper, but carry a love that is forever yours.",
      answer: ["love letter", "letter", "note"],
      rewardMessage: "Under your pillow. I love you! ❤️",
      mapLayout: MAPS.corridor,
      theme: { wallColor: "#eab308", floorColor: "#fffbeb", accentColor: "#ef4444" } // Golden Heart
    }
  ]
};