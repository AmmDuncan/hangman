import { ElementType } from "react";

import { cn } from "@/utils/cn";

type ButtonProps<T extends ElementType = "button"> =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    as?: T;
  };

export function Button<T extends ElementType = "button">({
  variant = "primary",
  className,
  as,
  ...props
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const classNames = cn([
    "rounded-full px-16 py-3 uppercase tracking-[0.05em] text-white transition-all flex justify-center items-center",
    {
      "bg-blue shadow-[0_-2px_0px_3px_#140E66_inset,0_1px_0_6px_#3C74FF_inset] hover:bg-[#478FFF]":
        variant === "primary",
      "from-[#FE71FE] to-[#7199FF] bg-gradient-to-b shadow-[0_-2px_0px_3px_#140E66_inset,0_1px_0_6px_#C642FB_inset] hover:from-[#FF94FE] hover:to-[#9FAEFE]":
        variant === "secondary",
    },
    className,
  ]);

  const Component = as || "button";
  return <Component {...props} className={classNames} />;
}
