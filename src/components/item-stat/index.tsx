"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { AgeTabs } from "@/components/age-tabs";
import { StatBar } from "@/components/item-stat/stat-bar";
import {
  Building,
  ModifyableProperty,
  UnifiedItem,
  Unit,
} from "@data/types/items";
import { CivConfig } from "@data/types/civs";
import { getItemTechnologies } from "@/utils/technologies";
import { getStatMap } from "./utils";

export const SUPPORTED_MODIFIER_PROPERTIES: ModifyableProperty[] = [
  "meleeArmor",
  "meleeAttack",
  "rangedArmor",
  "rangedAttack",
  "fireAttack",
  "fireArmor",
  "siegeAttack",
  "burst",
  "hitpoints",
  "moveSpeed",
  "attackSpeed",
  "lineOfSight",
  "maxRange",
];

type AgeTabsProps = {
  item: UnifiedItem<Unit | Building>;
  civ: CivConfig;
};

export const ItemStatPrimary = (props: AgeTabsProps) => {
  const t = useTranslations();
  const { item, civ } = props;
  const [age, setAge] = useState(4);

  const variations = item.variations
    // 当前文明的变体
    .filter((i) => i.civs.includes(civ.abbr))
    // 按时代排序
    .sort((a, b) => a.age - b.age)
    .filter((i) => i.age <= age);
  // console.log("variations");
  // console.log(variations);

  const minAge = variations[0].age;
  const variation = variations.find((i) => i.age === age) || variations[0];

  if (!variation) {
    return null;
  }

  const filterdtechs = getItemTechnologies(civ, item, age);
  const statMap = getStatMap(variations, filterdtechs, variation.weapons);

  const type = item.type === "unit" ? "unit" : "building";

  const listMap = {
    unit: [
      "meleeAttack",
      "rangedAttack",
      "siegeAttack",
      "fireAttack",
      "meleeArmor",
      "rangedArmor",
    ],
    building: ["rangedAttack", "rangedArmor", "fireArmor"],
  };

  return (
    <div>
      <div className="space-y-4">
        <AgeTabs age={age} setAge={setAge} minAge={minAge} />

        <StatBar
          label={t("common.hitpoints")}
          unit={0.5}
          modifiers={statMap.hitpoints!}
        />

        {listMap[type].map((property) => {
          return (
            <div key={property}>
              <StatBar
                label={t("common." + property)}
                modifiers={statMap[property]!}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
