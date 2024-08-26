"use client";
import { useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

import * as Tooltip from "@radix-ui/react-tooltip";

import { useGameSound } from "../context/GameSoundContext";

export function SoundToggle() {
  const { isMuted, setIsMuted } = useGameSound();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "m") {
        event.preventDefault();
        setIsMuted(!isMuted);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMuted, setIsMuted]);

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`fixed bottom-4 right-4 rounded-full p-2 shadow-lg ${
              isMuted ? "bg-gray-400" : "bg-blue"
            }`}
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6 text-white" />
            ) : (
              <Volume2 className="h-6 w-6 text-white" />
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="rounded bg-white px-2 py-1 text-sm text-gray-800 shadow-md"
            sideOffset={5}
          >
            Ctrl + M
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
