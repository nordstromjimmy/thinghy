"use client";
type Props = {
  size?: number; // size in pixels
  color?: string;
  className?: string;
};

export default function LoadingSpinner({
  size = 24,
  color = "#facc15",
  className,
}: Props) {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent ${className}`}
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderTopColor: "transparent",
      }}
    />
  );
}
