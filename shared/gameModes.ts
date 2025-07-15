import { GameMode, GameModeConfig } from "./types";

export const GAME_MODES: Record<GameMode, GameModeConfig> = {
  "5v5": {
    mode: "5v5",
    playersPerTeam: 5,
    fieldSize: "small",
    duration: 40,
    maxSubstitutions: 3,
  },
  "7v7": {
    mode: "7v7",
    playersPerTeam: 7,
    fieldSize: "medium",
    duration: 60,
    maxSubstitutions: 5,
  },
  "9v9": {
    mode: "9v9",
    playersPerTeam: 9,
    fieldSize: "large",
    duration: 70,
    maxSubstitutions: 7,
  },
  "10v10": {
    mode: "10v10",
    playersPerTeam: 10,
    fieldSize: "large",
    duration: 80,
    maxSubstitutions: 7,
  },
  "11v11": {
    mode: "11v11",
    playersPerTeam: 11,
    fieldSize: "full",
    duration: 90,
    maxSubstitutions: 5,
  },
  custom: {
    mode: "custom",
    playersPerTeam: 11, // default, can be customized
    fieldSize: "full",
    duration: 90,
    maxSubstitutions: 5,
  },
};

export const FIELD_SIZES = {
  small: {
    name: "Small Field",
    dimensions: "40x25m",
    description: "Perfect for 5v5 games",
  },
  medium: {
    name: "Medium Field",
    dimensions: "60x40m",
    description: "Ideal for 7v7 matches",
  },
  large: {
    name: "Large Field",
    dimensions: "80x50m",
    description: "Great for 9v9 and 10v10",
  },
  full: {
    name: "Full Size",
    dimensions: "100x65m",
    description: "Standard 11v11 football pitch",
  },
};

export function getGameModeInfo(mode: GameMode): GameModeConfig {
  return GAME_MODES[mode];
}

export function getRecommendedDuration(mode: GameMode): number {
  return GAME_MODES[mode].duration;
}

export function getMaxPlayers(mode: GameMode): number {
  return GAME_MODES[mode].playersPerTeam * 2;
}
