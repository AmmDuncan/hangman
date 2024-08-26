"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { HamburgerIcon } from "@/components/icons/HamburgerIcon";
import { Modal } from "@/components/Modal";
import { PausedText } from "@/components/svg-text/PausedText";

import { useGameStateContext } from "../context/GameStateContext";

export function OptionsButton() {
  const { playing, youWon, youLost, handlePlay, handlePause } =
    useGameStateContext();
  const router = useRouter();

  return (
    <>
      <Button
        variant="secondary"
        className="grid h-10 w-10 place-content-center p-0 shadow-[0_-6px_0_7px_#9D2DF544_inset] md:h-16 md:w-16 lg:h-[94px] lg:w-[94px]"
        onClick={() => handlePause()}
      >
        <HamburgerIcon className="h-4 w-4 md:h-8 md:w-8 lg:h-12 lg:w-12" />
      </Button>
      <Modal
        isOpen={!playing && !youWon && !youLost}
        setIsOpen={handlePlay}
        panelClass="flex flex-col"
      >
        <PausedText className="mt-[-10vw] max-w-[60vw] md:-mt-24" />

        <div className="grid justify-items-center gap-8">
          <Button onClick={() => handlePlay()}>Continue</Button>
          <Button onClick={() => router.replace("/pick-a-category")}>
            New Category
          </Button>
          <Button variant="secondary" onClick={() => router.push("/")}>
            Quit Game
          </Button>
        </div>
      </Modal>
    </>
  );
}
