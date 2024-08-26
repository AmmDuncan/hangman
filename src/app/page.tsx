import Link from "next/link";

import { Button } from "@/components/Button";
import { PlayIcon } from "@/components/icons/PlayIcon";

export default function Home() {
  return (
    <main className="grid h-max min-h-full w-full place-content-center py-40">
      <div className="flex h-[500px] w-[595px] max-w-[90vw] flex-col items-center gap-12 rounded-[72px] bg-gradient-to-b from-[#344ABA] to-[#001479D4] shadow-[0_-8px_0px_4px_#140E66_inset,0_6px_0_8px_#3C74FF_inset]">
        <img
          src="/images/logo.svg"
          alt="logo"
          className="mt-[-10vw] max-w-[60vw] md:-mt-24"
        />
        <Button
          as={Link}
          href="/pick-a-category"
          className="h-[180px] w-[180px] shadow-[0_-4px_0px_5px_#243041_inset,0_-12px_0_11px_#9D2DF5_inset]"
          variant="secondary"
        >
          <PlayIcon />
        </Button>
        <Button as={Link} href="/how-to-play">
          How to play
        </Button>
      </div>
    </main>
  );
}
