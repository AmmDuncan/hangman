"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const HealthContext = createContext<{
  health: number;
  setHealth: Dispatch<SetStateAction<number>>;
}>({
  health: 8,
  setHealth: () => {},
});

export const FULL_HEALTH = 8;

export function HealthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [health, setHealth] = useState(FULL_HEALTH);
  return (
    <HealthContext.Provider value={{ health, setHealth }}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealthContext() {
  return useContext(HealthContext);
}
