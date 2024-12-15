import { CIVILIZATIONS } from "@data/lib/config/civs";
import { CivConfig, CivInfo } from "@data/types/civs";
import {
  Ability,
  Building,
  Item,
  Modifier,
  PhysicalItem,
} from "@data/types/items";
import {
  civilizations,
  units,
  buildings,
  technologies,
  abilities,
  upgrades,
} from "@data/sdk";

import {
  GroupedBuildings,
  GroupedUnits,
  Technology,
  UnifiedItem,
  Unit,
} from "@/types/data";

import { ITEMS } from "@data/types/items";

export const PRETTY_AGE_MAP_SHORT = ["", "I", "II", "III", "IV"];

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

export function getCivBySlug(slug: string) {
  const civ = getCivConfig(slug, "slug");
  const data = civilizations.Get(civ.abbr);
  return { data, config: civ };
}

export function getUnit(id: string) {
  return units.get(id);
}

export function getTechnology(id: string) {
  return technologies.get(id);
}

export function getBuilding(id: string) {
  // let classes = [];
  // [...buildings, ...units, ...abilities, ...technologies].map((building) => {
  //   classes = classes.concat(building.classes);
  // });

  // const sss = uniq(classes);

  // const ddd = {};
  // sss.map((i) => {
  //   ddd[i] = i.charAt(0).toUpperCase() + i.slice(1);
  // });

  // console.log(JSON.stringify(ddd));

  return buildings.get(id);
}

export function getAbilities(civ: CivConfig, id: string) {
  return abilities
    .where({ civilization: civ.abbr, affects: `units/${id}` })
    .order("age");
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

export function getMostAppropriateVariation<T extends Item = Item>(
  item: UnifiedItem<T>,
  civ: CivConfig
): T {
  // @ts-expect-error
  if (!item) return null;
  return (
    (civ
      ? item.variations.filter((v) => v.civs.includes(civ.abbr))
      : item.variations
    )
      .sort((a, b) => b.costs.total - a.costs.total)
      .sort((a, b) => a.id.length - b.id.length)
      .sort((a, b) => b.civs.length - a.civs.length)[0] ?? item.variations[0]
  );
}

export type {
  Item,
  Unit,
  Building,
  UnifiedItem,
  Upgrade,
  Technology,
  Modifier,
} from "@data/types/items";

export const SIMILAIR_ITEMS = [
  ["villager", "dragon-villager"],
  ["archer", "longbowman", "gilded-archer", "yumi-ashigaru", "zhuge-nu"],
  ["spearman", "donso", "gilded-spearman", "limitanei"],
  [
    "knight",
    "lancer",
    "royal-knight",
    "keshik",
    "sofa",
    "gilded-knight",
    "mounted-samurai",
    "cataphract",
    "camel-lancer",
  ],
  [
    "monk",
    "scholar",
    "imam",
    "dervish",
    "warrior-monk",
    "shaman",
    "prelate",
    "shinto-priest",
    "buddhist-monk",
    "shaolin-monk",
  ],
  ["atabeg", "prelate"],
  ["desert-raider", "camel-rider"],
  [
    "horse-archer",
    "mangudai",
    "camel-archer",
    "tower-elephant",
    "onna-musha",
    "desert-raider",
  ],
  ["horseman", "ghazi-raider", "sipahi", "gilded-horseman"],
  ["jeannes-rider", "yuan-raider"],
  ["crossbowman", "arbaletrier", "javelin-thrower", "gilded-crossbowman"],
  ["cannon", "royal-cannon", "bombard", "great-bombard"],
  ["culverin", "royal-culverin"],
  ["mangonel", "nest-of-bees", "manjaniq"],
  ["battering-ram", "cheirosiphon"],
  ["siege-tower", "tower-of-the-sultan"],
  [
    "handcannoneer",
    "streltsy",
    "jannisary",
    "musofadi-gunner",
    "dragon-handcannoneer",
  ],
  ["traction-trebuchet", "trebuchet", "counterweight-trebuchet", "huihui-pao"],
  [
    "man-at-arms",
    "palace-guard",
    "musofadi-warrior",
    "ghulam",
    "samurai",
    "gilded-man-at-arms",
    "varangian-guard",
  ],
  ["onna-bugeisha", "landsknecht", "gilded-landsknecht"],
  ["trade-ship", "lodya-trade-ship"],
  ["transport-ship", "lodya-transport-ship"],
  ["fishing-boat", "lodya-fishing-boat"],
  ["galley", "dhow", "junk", "hunting-canoe", "light-junk", "lodya-galley"],
  ["hulk", "baghlah", "war-cog", "war-canoe", "lodya-attack-ship", "war-junk"],
  [
    "demolition-ship",
    "lodya-demolition-ship",
    "explosive-junk",
    "explosive-dhow",
  ],
  ["carrack", "baochuan", "xebec", "atakebune"],
  ["farm", "olive-grove", "pasture"],
  ["monastery", "mosque", "prayer-tent", "shinto-shrine", "buddhist-temple"],
  ["hunting-cabin", "mill", "ger", "farmhouse"],
  ["blacksmith", "forge", "mining-camp"],
  ["palisade-gate", "fortified-palisade-gate"],
  ["palisade-wall", "fortified-palisade-wall"],
  ["outpost", "wooden-fortress", "toll-outpost"],
  ["university", "madrasa"],
  ["castle", "keep"],
];

export function findClosestMatch<T extends ITEMS>(
  type: T,
  id: string,
  civ: CivConfig
) {
  const similair = SIMILAIR_ITEMS.find((units) => units.includes(id));

  const data = {
    units: units.where({ civilization: civ.abbr }),
    buildings: buildings.where({ civilization: civ.abbr }),
    technologies: technologies.where({ civilization: civ.abbr }),
  } as Record<T, UnifiedItem<PhysicalItem>[]>;

  const closestMatch =
    similair && data[type].find((i) => similair.includes(i.id));

  return closestMatch ?? null;
}

export { ITEMS } from "@data/types/items";

const typeToPathMap = {
  building: "buildings",
  unit: "units",
  technology: "technologies",
  upgrade: "upgrades",
  ability: "abilities",
};

export function typeToPath(type: keyof typeof typeToPathMap) {
  return typeToPathMap[type];
}
