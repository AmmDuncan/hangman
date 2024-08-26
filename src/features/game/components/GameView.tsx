"use client";
import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import useSound from "use-sound";

import correct from "@/assets/sounds/correct.mp3";
import incorrect from "@/assets/sounds/incorrect.mp3";
import { Button } from "@/components/Button";
import { KeyboardLetter } from "@/components/KeyboardLetter";
import { Modal } from "@/components/Modal";
import { PlayableLetter } from "@/components/PlayableLetter";
import { YouLoseText } from "@/components/svg-text/YouLoseText";
import { YouWinText } from "@/components/svg-text/YouWinText";
import { cn } from "@/utils/cn";
import { range } from "@/utils/helpers";

import { useGameSound } from "../context/GameSoundContext";
import { useGameStateContext } from "../context/GameStateContext";
import { useHealthContext } from "../context/HealthContext";

export function GameView() {
  const [playCorrect] = useSound(correct, { volume: 0.5 });
  const [playIncorrect] = useSound(incorrect, { volume: 0.5 });

  const router = useRouter();

  const { isMuted } = useGameSound();
  const { health, setHealth } = useHealthContext();
  const {
    activeOption,
    playing,
    youWon,
    youLost,
    selectedLetters,
    handleWon,
    handlePlay,
    handleLost,
    setSelectedLetters,
  } = useGameStateContext();

  /** letters that are not yet selected */
  const remainingLetters = useMemo(() => {
    return activeOption.name
      .split("")
      .filter((letter) => !selectedLetters.includes(letter.toLowerCase()))
      .filter((letter) => letter.trim());
  }, [activeOption, selectedLetters]);

  const handleSelectKey = useCallback(
    (key: string) => {
      if (selectedLetters.includes(key) || !playing) return;
      if (!activeOption.name.toLowerCase().includes(key.toLowerCase())) {
        if (!isMuted) playIncorrect();
        setHealth((prevHealth) => prevHealth - 1);
      } else {
        if (!isMuted) playCorrect();
        setSelectedLetters((prevLetters) => [
          ...prevLetters,
          key.toLowerCase(),
        ]);
      }
    },
    [
      selectedLetters,
      activeOption,
      setHealth,
      playing,
      setSelectedLetters,
      playCorrect,
      playIncorrect,
      isMuted,
    ],
  );
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        handleSelectKey(e.key.toLowerCase());
      }
    },
    [handleSelectKey],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /** handle winning the game */
  useEffect(() => {
    if (remainingLetters.length === 0) {
      handleWon();
    }
  }, [remainingLetters, handleWon]);

  /** handle losing the game */
  useEffect(() => {
    if (health === 0) {
      handleLost();
    }
  }, [health, handleLost]);

  return (
    <div className="grid pb-20">
      <div className="mt-[64px] flex flex-wrap justify-center gap-x-16 gap-y-8 lg:mt-[88px]">
        {activeOption.name.split(" ").map((word, index) => (
          <div
            key={word + index}
            className="flex flex-wrap justify-center gap-1 md:gap-2"
          >
            {word.split("").map((letter, index) => (
              <PlayableLetter
                key={index}
                className={cn({
                  "text-transparent": !selectedLetters.includes(
                    letter.toLowerCase(),
                  ),
                })}
              >
                {letter}
              </PlayableLetter>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-24 grid grid-cols-9 gap-2 md:gap-5 lg:mt-32">
        {range(97, 97 + 25).map((num) => (
          <KeyboardLetter
            key={num}
            onClick={() => handleSelectKey(String.fromCharCode(num))}
            disabled={selectedLetters.includes(String.fromCharCode(num))}
          >
            {String.fromCharCode(num)}
          </KeyboardLetter>
        ))}
      </div>

      {/* You Won Modal */}
      <Modal isOpen={youWon} setIsOpen={handlePlay} panelClass="flex flex-col">
        <YouWinText className="mt-[-10vw] max-w-[60vw] md:-mt-24" />

        <div className="grid justify-items-center gap-8">
          <Button onClick={() => handlePlay()}>Play Again!</Button>
          <Button onClick={() => router.replace("/pick-a-category")}>
            New Category
          </Button>
          <Button variant="secondary" onClick={() => router.push("/")}>
            Quit Game
          </Button>
        </div>
      </Modal>

      {/* You Lost Modal */}
      <Modal isOpen={youLost} setIsOpen={handlePlay} panelClass="flex flex-col">
        <YouLoseText className="mt-[-10vw] max-w-[60vw] md:-mt-24" />

        <div className="grid justify-items-center gap-8">
          <Button onClick={() => handlePlay()}>Play Again!</Button>
          <Button onClick={() => router.replace("/pick-a-category")}>
            New Category
          </Button>
          <Button variant="secondary" onClick={() => router.push("/")}>
            Quit Game
          </Button>
        </div>
      </Modal>
    </div>
  );
}
