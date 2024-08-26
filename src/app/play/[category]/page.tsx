import { redirect } from "next/navigation";

import data from "@/assets/data.json";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { Text } from "@/components/Text";
import { GameView } from "@/features/game/components/GameView";
import { HealthProgress } from "@/features/game/components/HealthProgress";
import { OptionsButton } from "@/features/game/components/OptionsButton";
import { SoundToggle } from "@/features/game/components/SoundToggle";
import { GameSoundProvider } from "@/features/game/context/GameSoundContext";
import { GameStateContextProvider } from "@/features/game/context/GameStateContext";
import { HealthContextProvider } from "@/features/game/context/HealthContext";

type Category = keyof typeof data.categories;

export default function Play({ params }: { params: { category: Category } }) {
  const category = decodeURIComponent(params.category) as Category;

  if (!data.categories[category]) {
    return redirect("/pick-a-category");
  }

  return (
    <GameSoundProvider>
      <HealthContextProvider>
        <GameStateContextProvider category={category}>
          <div className="h-full w-full overflow-auto bg-gradient-to-b from-[#190131dd] to-[#282B96dd]">
            <div className="container py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-14">
                  <OptionsButton />
                  <Text variant="h2" className="text-white">
                    {category}
                  </Text>
                </div>

                <div className="grid grid-cols-[4fr_1fr] items-center gap-4 md:grid-cols-[240px_1fr]">
                  <HealthProgress />
                  <HeartIcon className="h-6 w-6 md:h-8 md:w-8 lg:h-12 lg:w-12" />
                </div>
              </div>

              <div>
                <GameView />
              </div>
            </div>

            <SoundToggle />
          </div>
        </GameStateContextProvider>
      </HealthContextProvider>
    </GameSoundProvider>
  );
}
