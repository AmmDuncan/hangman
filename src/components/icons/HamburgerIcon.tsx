export function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      width="38"
      height="32"
      viewBox="0 0 38 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="38" height="7" fill="white" />
      <rect y="13" width="38" height="6" fill="white" />
      <rect y="25" width="38" height="7" fill="white" />
    </svg>
  );
}
