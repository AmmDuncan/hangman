import Link from "next/link";

import { Button } from "@/components/Button";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";
import { Text } from "@/components/Text";

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
          <span className="hidden md:block" />
        </div>

        <div className="mt-[100px] lg:mt-[155px]">
          <ol className="grid list-inside gap-6 space-y-4 lg:grid-cols-3 lg:gap-8">
            {steps.map((step) => (
              <li
                key={step.number}
                className="flex items-center gap-10 rounded-[40px] bg-white px-10 py-8 text-center text-dark-navy lg:flex-col lg:px-11 lg:py-[60px]"
              >
                <Text variant="h2" as="p" className="hidden text-blue md:block">
                  {step.number}
                </Text>
                <div className="flex flex-col gap-2 text-left lg:items-center lg:text-center">
                  <div className="flex items-center gap-2">
                    <Text variant="h4" className="text-blue md:hidden">
                      {step.number}
                    </Text>
                    <Text variant="h4" as="h3" className="tracking-wide">
                      {step.title}
                    </Text>
                  </div>
                  <Text
                    variant="span"
                    className="tracking-wider text-[#887DC0]"
                  >
                    {step.description}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    number: "01",
    title: "CHOOSE A CATEGORY",
    description:
      "First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.",
  },
  {
    number: "02",
    title: "GUESS LETTERS",
    description:
      "Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it's wrong, you lose some health, which empties after eight incorrect guesses.",
  },
  {
    number: "03",
    title: "WIN OR LOSE",
    description:
      "You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.",
  },
];
