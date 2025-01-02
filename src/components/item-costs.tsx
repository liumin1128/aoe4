import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { Item } from "@data/types/items";

const resources = [
  "food",
  "wood",
  "gold",
  "stone",
  "oliveoil",
  "popcap",
  "vizier",
  "time",
];

const imgUrls = {
  food: "/assets/resources/food.png",
  gold: "/assets/resources/gold.png",
  stone: "/assets/resources/stone.png",
  wood: "/assets/resources/wood.png",
  time: "/assets/resources/time.png",
  popcap: "/assets/resources/popcap.png",
  oliveoil: "/assets/resources/oliveoil.png",
  vizier: "/assets/resources/vizierpoints.png",
};

interface Props {
  costs: Item["costs"];
}

export function Costs({ costs }: Props) {
  const t = useTranslations();

  const list: any = [];

  resources.map((i) => {
    if (costs[i]) {
      list.push({
        value: costs[i],
        icon: imgUrls[i],
        key: i,
      });
    }
  });

  if (!list.length) {
    return "-";
  }

  return (
    <div className="flex items-center gap-4">
      {list.map((i) => {
        return (
          <div key={i} className="flex items-center text-sm">
            <span>{i.value}</span>
            <Image
              className="h-4 object-contain w-5"
              src={i.icon}
              alt={i}
              width={0}
              height={0}
              sizes="100vw"
              priority
            />
          </div>
        );
      })}
    </div>
  );
}
