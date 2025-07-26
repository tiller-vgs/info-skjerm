import React from "react";

const RARITY_CLASSES = {
  common: "text-common opacity-",
  uncommon: "text-uncommon opacity-80",
  rare: "text-rare opacity-",
  epic: "rarity text-epic opacity-80",
  legendary: "rarity text-legendary opacity-80",
  mythic: "rarity text-mythic opacity-80",
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
