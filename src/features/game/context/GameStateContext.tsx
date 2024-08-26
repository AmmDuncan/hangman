"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import useSound from "use-sound";

import data from "@/assets/data.json";
import lose from "@/assets/sounds/lose.mp3";
import tada from "@/assets/sounds/tada.mp3";
import { pickRandom } from "@/utils/helpers";

import { Category, CategoryOption } from "../types";

import { useGameSound } from "./GameSoundContext";
import { FULL_HEALTH, useHealthContext } from "./HealthContext";

const GameStateContext = createContext<{
  playing: boolean;
  youWon: boolean;
  youLost: boolean;
  activeOption: CategoryOption;
  selectedLetters: string[];
  handleWon: () => void;
  handleLost: () => void;
  handlePause: () => void;
  handlePlay: () => void;
  setSelectedLetters: Dispatch<SetStateAction<string[]>>;
}>({
  playing: true,
  youWon: false,
  youLost: false,
  selectedLetters: [],
  activeOption: { name: "", selected: false },
  handleWon: () => {},
  handleLost: () => {},
  handlePause: () => {},
  handlePlay: () => {},
  setSelectedLetters: () => {},
});

export const GameStateContextProvider = ({
  children,
  category,
}: {
  children?: ReactNode;
  category: Category;
}) => {
  const [playTada] = useSound(tada, { volume: 0.5 });
  const [playLose] = useSound(lose, { volume: 0.5 });

  const { isMuted } = useGameSound();
  const { setHealth } = useHealthContext();
  const [playing, setPlaying] = useState(true);
  const [youWon, setYouWon] = useState(false);
  const [youLost, setYouLost] = useState(false);

  const [optionList, setOptionList] = useState<CategoryOption[]>(
    data.categories[category],
  );
  const optionsRemaining = useMemo(() => {
    return optionList.filter((option) => !option.selected);
  }, [optionList]);

  const [activeOption, setActiveOption] = useState(
    pickRandom(optionsRemaining),
  );
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  function handleWon() {
    if (!isMuted) playTada();

    setYouWon(true);
    setPlaying(false);
  }

  function handleLost() {
    if (!isMuted) playLose();

    setYouLost(true);
    setPlaying(false);
  }

  function handlePause() {
    setPlaying(false);
  }

  function handlePlay() {
    if (youWon || youLost) {
      setHealth(FULL_HEALTH);
      setSelectedLetters([]);
      setYouWon(false);
      setYouLost(false);
      setOptionList((prev) =>
        prev.map((option) =>
          option.name === activeOption.name
            ? { ...option, selected: true }
            : option,
        ),
      );
      setActiveOption(pickRandom(optionsRemaining));
    }
    setPlaying(true);
  }

  return (
    <GameStateContext.Provider
      value={{
        playing,
        youWon,
        youLost,
        activeOption,
        selectedLetters,
        handleWon,
        handleLost,
        handlePause,
        handlePlay,
        setSelectedLetters,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export function useGameStateContext() {
  return useContext(GameStateContext);
}
