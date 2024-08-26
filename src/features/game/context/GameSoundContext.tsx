"use client";
import { createContext, useContext } from "react";

import { useLocalStorage } from "@uidotdev/usehooks";

export const GameSoundContext = createContext<{
  isMuted: boolean;
  setIsMuted: (_isMuted: boolean) => void;
}>({
  isMuted: false,
  setIsMuted: () => {},
});

export function GameSoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useLocalStorage("isMuted", false);

  return (
    <GameSoundContext.Provider value={{ isMuted, setIsMuted }}>
      {children}
    </GameSoundContext.Provider>
  );
}

export function useGameSound() {
  return useContext(GameSoundContext);
}
