"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { AgeTabs } from "@/components/age-tabs";
import { StatBar } from "@/components/item-stat/stat-bar";
import { ModifyableProperty, UnifiedItem, Unit } from "@data/types/items";
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
  item: UnifiedItem<Unit>;
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

  // console.log("variation");
  // console.log(variation);

  if (!variation) {
    return null;
  }

  const filterdtechs = getItemTechnologies(civ, item, age);
  const statMap = getStatMap(variations, filterdtechs, variation.weapons);

  return (
    <div>
      <div className="space-y-4">
        <AgeTabs age={age} setAge={setAge} minAge={minAge} />

        <StatBar
          label={t("common.hitpoints")}
          unit={0.5}
          modifiers={statMap.hitpoints!}
        />

        <StatBar
          label={t("common.meleeAttack")}
          modifiers={statMap.meleeAttack!}
        />

        <StatBar
          label={t("common.rangedAttack")}
          modifiers={statMap.rangedAttack!}
        />

        <StatBar
          label={t("common.siegeAttack")}
          modifiers={statMap.siegeAttack!}
        />

        <StatBar
          label={t("common.fireAttack")}
          modifiers={statMap.fireAttack!}
        />

        <StatBar
          label={t("common.meleeArmor")}
          modifiers={statMap.meleeArmor!}
        />

        <StatBar
          label={t("common.rangedArmor")}
          modifiers={statMap.rangedArmor!}
        />
      </div>

      {/* <StatBar label="Hitpoints" icon="heart" stat={stats.hitpoints} max={1000} item={props.item} age={age} />
                <StatBar label="Siege Attack" icon="meteor" stat={stats.siegeAttack} max={500} multiplier={stats.burst} item={props.item} age={age} />
                <StatBar label="Melee Attack" icon="swords" stat={stats.meleeAttack} max={50} item={props.item} age={age} />
                <StatBar label="Ranged Attack" icon="bow-arrow" stat={stats.rangedAttack} max={50} multiplier={stats.burst} item={props.item} age={age} /> */}
    </div>
  );
};
