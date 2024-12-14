import {
  Building,
  ModifyableProperty,
  Selector,
  Technology,
  Unit,
  Weapon,
} from "@data/types/items";
import uniqBy from "lodash/uniqBy";

// const AgeUnitName = ["Veteran","Elite"]
export const PRETTY_AGE_MAP_SHORT = ["", "I", "II", "III", "IV"];

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

type UnitStat = Partial<Record<ModifyableProperty, number>>;

export type StatItem = {
  id: string;
  value?: number;
  type: string; // "base" | "upgrade" | "technology" | "bonus";
  label: string;
  effect: string; // "change" | "add" | "multiply";
  effectType: string; // "base" | "upgrade" | "passive" | "bonus";
  item?: Technology;
  target?: Selector;
};

export type StatMap = Partial<Record<ModifyableProperty, StatItem[]>>;

export function getStat(v: Unit | Building): UnitStat {
  const stats: UnitStat = {
    hitpoints: v.hitpoints,
    lineOfSight: v.sight.line / 4.5,
  };

  if (v.type === "unit") {
    stats.moveSpeed = v.movement.speed;
  }

  // const melee = v.weapons.find((w) => w?.type == "melee" && w.modifiers);
  // const weapons = v.weapons.filter((w) => w?.type != "melee" || w === melee);

  // 拿第一把武器
  const weapons = uniqBy(v.weapons, "type");

  for (const w of weapons) {
    if (w.type === "melee") {
      stats.meleeAttack = w.damage;
    } else if (w.type === "ranged") {
      stats.rangedAttack = w.damage;
    } else if (w.type === "siege") {
      stats.siegeAttack = w.damage;
    } else if (w.type === "fire") {
      stats.fireAttack = w.damage;
    }

    if (w.type != "fire" || v.weapons.length == 1) stats.attackSpeed = w.speed;

    if (w.burst) stats.burst = w.burst.count;

    if (w.type == "siege" || w.type == "ranged") {
      stats.maxRange = w?.range?.max;
      stats.minRange = w?.range?.min;
    }
  }

  for (const a of v.armor) {
    // We assume there's only one armor type per variation, for now.
    if (a.type == "melee") stats.meleeArmor = a.value;
    else if (a.type == "ranged") stats.rangedArmor = a.value;
    else if (a.type == "fire") stats.fireArmor = a.value;
  }

  return stats;
}

export function getStatMap(
  variations: (Unit | Building)[],
  technologies: Technology[],
  weapons: Weapon[]
) {
  const statMap: StatMap = {};

  // 计算不同时代变种的属性
  const statList = variations.map((i) => getStat(i));

  // 计算不同时代变种的差异
  variations.map((i, index) => {
    SUPPORTED_MODIFIER_PROPERTIES.map((key) => {
      const st = getStat(i);
      let statItem: StatItem;
      if (index === 0) {
        const v = st[key];
        if (!v) return;
        statItem = {
          value: v,
          type: "base",
          effectType: "base",
          label: "Base",
          effect: "change",
          id: i.id,
        };
        statMap[key] = [statItem];
      } else {
        const curr = st[key]!;
        const prev = statList[index - 1][key]!;
        if (curr !== prev) {
          statItem = {
            value: curr - prev,
            type: "upgrade",
            effectType: "upgrade",
            label: "Upgrade to Age " + PRETTY_AGE_MAP_SHORT[i.age],
            effect: "change",
            id: i.id,
          };
          statMap[key]?.push(statItem);
        }
      }
    });
  });

  // 计算科技的属性
  for (const tech of technologies) {
    if (tech.effects) {
      for (const modifier of tech?.effects) {
        if (SUPPORTED_MODIFIER_PROPERTIES.includes(modifier.property)) {
          statMap[modifier.property] ??= [];
          statMap[modifier.property]?.push({
            value: modifier.value,
            type: tech.type,
            effectType: modifier.type,
            label: tech.name,
            effect: modifier.effect,
            id: tech.baseId,
            item: tech,
          });
        }
      }
    }
  }

  // 计算武器的属性
  for (const i of weapons) {
    if (i.modifiers) {
      // matched 只用一把武器
      let matched = false;
      for (const modifier of i.modifiers) {
        if (SUPPORTED_MODIFIER_PROPERTIES.includes(modifier.property)) {
          statMap[modifier.property] ??= [];
          statMap[modifier.property]?.push({
            id: i.name!,
            value: modifier.value,
            type: "bonus",
            effectType: "bonus",
            label: modifier.target?.class?.join(",") + "",
            effect: modifier.effect,
            target: modifier.target,
          });
          matched = true;
        }
      }
      if (matched) {
        break;
      }
    }
  }

  return statMap;
}
