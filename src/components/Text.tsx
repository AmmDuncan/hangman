import React from "react";

import { cn } from "@/utils/cn";

type PossibleTextElements =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "label";
type Props = {
  children: React.ReactNode;
  as?: PossibleTextElements;
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  asVariant?: boolean;
  className?: string;
} & React.ComponentProps<PossibleTextElements>;

export const Text = React.memo(function Text(props: Props) {
  const {
    as = "div",
    variant = "p",
    weight,
    asVariant = false,
    className = "",
    children,
    ...rest
  } = props;

  const computedFontWeight = React.useMemo(() => {
    if (!weight)
      return variant.includes("h") // if it's a heading text
        ? "normal"
        : "normal";
    return weight;
  }, [weight, variant]);

  const fontWeights: Record<Exclude<Props["weight"], undefined>, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "!font-bold",
    extrabold: "!font-extrabold",
    black: "!font-black",
  };

  const variantClasses: Record<Exclude<Props["variant"], undefined>, string> = {
    h1: "lg:text-[136px] md:text-[120px] text-[88px] leading-[120px]",
    h2: "lg:text-[88px] md:text-[64px] text-[40px] leading-[96px]",
    h3: "lg:text-[48px] md:text-[32px] text-[32px] leading-[64px]",
    h4: "lg:text-[32px] md:text-[26px] text-[26px] leading-[40px]",
    h5: "lg:text-base",
    h6: "text-base",
    p: "text-[26px] leading-[32px]",
    span: "text-[20px] leading-[1.2]",
  };

  const classNames = cn([
    className,
    { [variantClasses[variant]]: !!variant },
    { [fontWeights[computedFontWeight]]: !!computedFontWeight },
  ]);

  const evaluatedElement = asVariant ? variant : as;

  return React.createElement(
    evaluatedElement,
    { className: classNames, ...rest },
    children,
  );
});
