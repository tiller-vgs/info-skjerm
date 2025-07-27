import React from "react";

const RARITY_CLASSES = {
  common: "text-common/80 animate-shine",
  uncommon: "text-uncommon/80 animate-shine",
  rare: "text-rare/80 animate-shine",
  epic: "rarity text-epic/80 animate-shine",
  legendary: "rarity text-legendary/80 animate-shine",
  mythic: "rarity text-mythic/80 animate-shine",
} as const;

function RarityText({
  rarity,
  className,
  children,
}: {
  rarity: string;
  className?: string;
  children: React.ReactNode;
}) {
  const rarityClass =
    RARITY_CLASSES[rarity.toLowerCase() as keyof typeof RARITY_CLASSES] ||
    "text-common";

  return (
    <h2
      className={`${className} font-extrabold drop-shadow-[2px_2px_rgba(0,0,0,0.8)] ${rarityClass}`}
    >
      {children}
    </h2>
  );
}

export default RarityText;
