"use client";
import { useState } from "react";
import { AgeTabs } from "@/components/age-tabs";
import { StatBar } from "@/components/stat-bar";
import {
  Item,
  Modifier,
  ModifyableProperty,
  Technology,
  UnifiedItem,
  Unit,
} from "@data/types/items";
import isEqual from "lodash/isEqual";
import { CivConfig } from "@data/types/civs";
import { StatProperty } from "@/types/stats";
import { technologies } from "@data/sdk";
import every from "lodash/every";
import includes from "lodash/includes";

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

type Stat = Partial<Record<StatProperty, number>>;

export const ItemStat = (props: AgeTabsProps) => {
  const { item, civ } = props;

  const variations = item.variations
    // 当前文明的变体
    .filter((i) => i.civs.includes(civ.abbr))
    // 按时代排序
    .sort((a, b) => a.age - b.age);

  const minAge = variations[0].age;

  const [age, setAge] = useState(minAge);

  const variation = variations.find((i) => i.age === age) || variations[0];

  console.log("variation");
  console.log(variation);

  if (!variation) {
    return null;
  }

  const stats: Stat = {
    hitpoints: variation.hitpoints,
    lineOfSight: variation.sight.line / 4.5,
  };

  if (variation.type === "unit") {
    stats.moveSpeed = variation.movement.speed;
  }

  for (const w of variation.weapons) {
    if (w.type === "melee") {
      stats.meleeAttack = w.damage;
    } else if (w.type === "ranged") {
      stats.rangedAttack = w.damage;
    } else if (w.type === "siege") {
      stats.siegeAttack = w.damage;
    } else if (w.type === "fire") {
      stats.fireAttack = w.damage;
    }

    if (w.type != "fire" || variation.weapons.length == 1)
      stats.attackSpeed = w.speed;

    if (w.burst) stats.burst = w.burst.count;

    if (w.type == "siege" || w.type == "ranged") {
      stats.maxRange = w?.range?.max;
      stats.minRange = w?.range?.min;
    }

    // if (w.modifiers) {
    //   bonus.push(...w.modifiers);
    // }
  }

  for (const a of variation.armor) {
    if (a.type == "melee") stats.meleeArmor = a.value;
    else if (a.type == "ranged") stats.rangedArmor = a.value;
    else if (a.type == "fire") stats.fireArmor = a.value;
  }

  const technologiesVariations: Technology[] = [];

  technologies.map((t) => {
    t.variations.map((v) => {
      if (v.civs.includes(civ.abbr)) {
        technologiesVariations.push(v);
      }
    });
  });

  const ssss = technologiesVariations.find((i) => i.name === "Heavy Maces");

  console.log("ssss");
  console.log(ssss);

  const filterdtechs = technologiesVariations
    .filter((i) => i.age <= age)
    .filter((i) => {
      let matchesId = false;
      let matchesClass = false;
      i?.effects?.map((j) => {
        // 匹配id
        if (j.select?.id?.includes(item.id)) {
          matchesId = true;
        }
        // 匹配class
        if (
          j.select?.class?.some((cl) =>
            cl?.every((c) => item.classes.includes(c))
          )
        ) {
          matchesClass = true;
        }
      });
      return matchesId || matchesClass;
    });

  console.log("filterdtechs");
  console.log(filterdtechs);

  const techs: Partial<Record<ModifyableProperty, Modifier[]>> = {};
  for (const tech of filterdtechs) {
    if (tech.effects) {
      for (const modifier of tech?.effects) {
        if (SUPPORTED_MODIFIER_PROPERTIES.includes(modifier.property)) {
          techs[modifier.property] ??= [];
          techs[modifier.property]?.push(modifier);
        }
      }
    }
  }

  const weapons: Partial<Record<ModifyableProperty, Modifier[]>> = {};
  for (const i of variation.weapons) {
    if (i.modifiers) {
      for (const modifier of i.modifiers) {
        if (SUPPORTED_MODIFIER_PROPERTIES.includes(modifier.property)) {
          weapons[modifier.property] ??= [];
          weapons[modifier.property]?.push(modifier);
        }
      }
    }
  }

  return (
    <div>
      <AgeTabs age={age} setAge={setAge} minAge={minAge} />
      {/* <StatBar label="Hitpoints" max={100} age={age} value={stats.hitpoints!} />

      <StatBar
        label="Siege Attack"
        max={100}
        age={age}
        value={stats.siegeAttack!}
        modifiers={modifiers.siegeAttack}
      /> */}

      <StatBar
        label="Melee Attack"
        max={100}
        age={age}
        value={stats.meleeAttack!}
        techs={techs.meleeAttack}
        weapons={weapons.meleeAttack}
      />

      {/* <StatBar label="Hitpoints" icon="heart" stat={stats.hitpoints} max={1000} item={props.item} age={age} />
                <StatBar label="Siege Attack" icon="meteor" stat={stats.siegeAttack} max={500} multiplier={stats.burst} item={props.item} age={age} />
                <StatBar label="Melee Attack" icon="swords" stat={stats.meleeAttack} max={50} item={props.item} age={age} />
                <StatBar label="Ranged Attack" icon="bow-arrow" stat={stats.rangedAttack} max={50} multiplier={stats.burst} item={props.item} age={age} /> */}
    </div>
  );
};
