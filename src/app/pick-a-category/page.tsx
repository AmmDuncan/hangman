import Link from "next/link";

import data from "@/assets/data.json";
import { Button } from "@/components/Button";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";

export default function PickACategory() {
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
            src="/images/pick-a-category.svg"
            alt="how to play"
            className="lg:[460px] w-[190px] md:w-[350px]"
          />
          <span className="hidden md:block"></span>
        </div>

        <ul className="mt-[100px] grid gap-4 md:grid-cols-2 md:gap-8 lg:mt-[155px] lg:grid-cols-3">
          {Object.entries(data.categories).map(([category]) => (
            <Button
              as={Link}
              href={`/play/${category}`}
              className="h-[77px] rounded-[20px] md:h-[182px] md:rounded-[40px] lg:h-[190px]"
              key={category}
            >
              {category}
            </Button>
          ))}
        </ul>
      </div>
    </div>
  );
}
