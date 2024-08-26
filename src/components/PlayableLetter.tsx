import { cn } from "@/utils/cn";

import { Text } from "./Text";

export function PlayableLetter({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "grid h-[72px] w-[56px] cursor-auto place-content-center rounded-2xl bg-blue px-4 py-3 text-white shadow-[0_-2px_0px_3px_#140E66_inset,0_1px_0_6px_#3C74FF_inset] disabled:opacity-25 md:h-[100px] md:w-[88px] md:rounded-[24px] md:px-[42px] lg:h-[128px] lg:w-[112px] lg:rounded-[40px]",
        className,
      )}
      {...props}
    >
      <Text variant="h2" asVariant>
        {children}
      </Text>
    </button>
  );
}
