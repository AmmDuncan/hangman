import { Text } from "./Text";

export function KeyboardLetter({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="text-navy-dark grid h-[74px] place-content-center rounded-[24px] bg-white px-4 py-3 hover:bg-blue hover:text-white disabled:opacity-25"
      {...props}
    >
      <Text variant="h3" asVariant>
        {children}
      </Text>
    </button>
  );
}
