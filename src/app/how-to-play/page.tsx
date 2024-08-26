import Link from "next/link";

import { Button } from "@/components/Button";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";

export default function HowToPlay() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#190131dd] to-[#282B96dd]">
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <Button
            as={Link}
            href="/"
            variant="secondary"
            className="grid h-10 w-10 place-content-center p-0 shadow-[0_-6px_0_7px_#9D2DF544_inset] md:h-16 md:w-16 lg:h-[94px] lg:w-[94px]"
          >
            <BackArrowIcon className="h-4 w-4 md:h-8 md:w-8 lg:h-12 lg:w-12" />
          </Button>
          <img
            src="/images/how-to-play.svg"
            alt="how to play"
            className="lg:[460px] w-[190px] md:w-[350px]"
          />
          <span></span>
        </div>

        <div>
          <ol className="list-inside list-decimal space-y-4 text-white">
            <li>
              <span className="font-bold">Choose a category:</span> Select a
              word category, such as animals or movies.
            </li>
            <li>
              <span className="font-bold">Guess letters:</span> The computer
              randomly selects a secret word from the chosen category and
              displays blanks for each letter. Take turns guessing letters.
            </li>
            <li>
              <span className="font-bold">Win or lose:</span> You win by
              guessing all the letters before your health runs out. You lose if
              the health bar empties before you complete the word.
            </li>
          </ol>

          <p className="mt-6 text-white">
            The computer fills in the relevant blank spaces if your guess is
            correct. If it's wrong, you lose some health, which empties after
            eight incorrect guesses.
          </p>
        </div>
      </div>
    </div>
  );
}
