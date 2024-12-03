import { CIVILIZATIONS } from "@data/lib/config/civs";
import { CivConfig, CivInfo } from "@data/types/civs";
import { civilizations } from "@data/sdk";

import {
  GroupedBuildings,
  GroupedUnits,
  Technology,
  UnifiedItem,
  Unit,
} from "@/types/data";

import { Building } from "@data/types/items";

export function getCivConfig(value: string, key: string) {
  let result: CivConfig;
  Object.entries(CIVILIZATIONS).map(([, civ]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (civ[key] === value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result = civ;
    }
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return result;
}

interface Civ extends CivInfo {
  abbr?: string;
}

export function getCivBySlug(slug: string) {
  const civ = getCivConfig(slug, "slug");
  const data = civilizations.Get(civ.abbr) as unknown as CivInfo;
  return { ...data, ...civ };
}

export function splitUnitsIntoGroups(units: UnifiedItem<Unit>[]) {
  const grouped = units?.reduce(
    (acc, unit) => {
      if (unit.classes.some((c) => c === "hero")) acc.hero.push(unit);
      else if (unit.classes.some((c) => c === "ship")) acc.ships.push(unit);
      else if (
        unit.variations.some(
          (v) =>
            v.producedBy.includes("mercenary-house") ||
            v.producedBy.includes("foreign-engineering-company")
        )
      )
        acc.mercenaries.push(unit);
      else if (unit.classes.some((c) => c === "warship")) acc.ships.push(unit);
      else if (unit.classes.some((c) => c === "worker")) acc.workers.push(unit);
      else if (unit.classes.some((c) => c === "infantry"))
        acc.infantry.push(unit);
      else if (unit.classes.some((c) => c === "cavalry"))
        acc.cavalry.push(unit);
      else if (unit.classes.some((c) => c === "camel")) acc.cavalry.push(unit);
      else if (unit.classes.some((c) => c === "siege")) acc.siege.push(unit);
      else if (unit.classes.some((c) => c === "mixed")) acc.misc.push(unit);
      else acc.workers.push(unit);

      return acc;
    },
    {
      hero: [],
      workers: [],
      infantry: [],
      cavalry: [],
      siege: [],
      ships: [],
      misc: [],
      mercenaries: [],
    } as GroupedUnits
  );
  grouped.mercenaries.sort(
    (b, a) => b.variations[0].costs.total - a.variations[0].costs.total
  );
  return grouped;
}

export function splitBuildingsIntoGroups(buildings: UnifiedItem<Building>[]) {
  const grouped = buildings?.reduce(
    (acc, unit) => {
      if (unit.classes.some((c) => c === "landmark")) acc.landmarks.push(unit);
      else if (unit.classes.some((c) => c === "wonder")) acc.wonders.push(unit);
      else if (unit.classes.some((c) => c === "defensive"))
        acc.defensive.push(unit);
      else if (unit.classes.some((c) => c === "technology"))
        acc.technology.push(unit);
      else if (unit.classes.some((c) => c === "religious"))
        acc.religious.push(unit);
      else if (unit.classes.some((c) => c === "military"))
        acc.military.push(unit);
      else acc.economy.push(unit);

      return acc;
    },
    {
      landmarks: [],
      economy: [],
      military: [],
      defensive: [],
      religious: [],
      technology: [],
      wonders: [],
    } as GroupedBuildings
  );
  grouped.landmarks.sort(
    (b, a) => b.variations[0].costs.total - a.variations[0].costs.total
  );
  return grouped;
}

export function splitTechnologiesIntroGroups(
  buildings: UnifiedItem<Technology>[]
) {
  return buildings?.reduce(
    (acc, tech) => {
      if (
        tech.classes.some(
          (c) => ["advance"].includes(c) && tech.civs[0] == "ab"
        )
      )
        return acc;
      else if (
        tech.classes.some(
          () => tech.civs[0] == "ay" && tech.id.includes("wing")
        )
      )
        acc.wings.push(tech);
      else if (
        tech.classes.some((c) => c === "level-up-choice") &&
        tech.civs[0] == "je"
      )
        acc.leveling.push(tech);
      else if (
        tech.classes.some((c) => ["ship", "naval", "warship"].includes(c))
      )
        acc.naval.push(tech);
      else if (
        tech.classes.some((c) =>
          [
            "mining",
            "gathering",
            "woodcutting",
            "farm",
            "hunting",
            "villager",
            "fishing",
            "construction",
            "official",
            "population",
            "trade",
            "economic",
            "research",
            "raiding",
            "packing",
          ].includes(c)
        )
      )
        acc.economy.push(tech);
      else if (
        tech.classes.some((c) =>
          ["defensive", "emplacement", "building", "outpost", "keep"].includes(
            c
          )
        )
      )
        acc.defensive.push(tech);
      else if (tech.classes.some((c) => ["religious", "healing"].includes(c)))
        acc.religious.push(tech);
      else if (
        tech.classes.some((c) =>
          [
            "Production",
            "siege",
            "melee",
            "cavalry",
            "infantry",
            "ranged",
            "production",
            "gunpowder",
          ].includes(c)
        )
      )
        acc.military.push(tech);
      else acc.units.push(tech);

      return acc;
    },
    {
      wings: [],
      leveling: [],
      economy: [],
      naval: [],
      defensive: [],
      religious: [],
      military: [],
      units: [],
    } as Record<string, UnifiedItem<Technology>[]>
  );
}

export async function getStructuredItems(civilization?: CivConfig) {
  const sdk = await import("@data/sdk");
  if (!civilization)
    return {
      civ: undefined,
      units: splitUnitsIntoGroups(sdk.units.order("hitpoints", "age")),
      buildings: splitBuildingsIntoGroups(
        sdk.buildings.order("hitpoints", "age")
      ),
      technologies: splitTechnologiesIntroGroups(sdk.technologies.order("age")),
    };
  const civ = sdk.civilizations.Get(civilization);
  if (!civ.info) return;
  return {
    civ,
    units: splitUnitsIntoGroups(civ.units.order("hitpoints", "age")),
    buildings: splitBuildingsIntoGroups(
      civ.buildings.order("hitpoints", "age")
    ),
    technologies: splitTechnologiesIntroGroups(civ.technologies.order("age")),
  };
}
