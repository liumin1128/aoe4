import {
  civilizations,
  units,
  technologies,
  buildings,
  upgrades,
  abilities,
} from "@data/sdk";
import { writeFile } from "./utils";
import { CIVILIZATIONS } from "@data/lib/config/civs";
import baseEN from "./baseEN.json";
import baseCN from "./baseCN.json";

interface Translation {
  id: string;
  name: string;
  description: string;
}

const civs = Object.values(CIVILIZATIONS).map((civ) => {
  console.log(civilizations.Get(civ.abbr).info);
  const info = civilizations.Get(civ.abbr).info;
  return {
    id: civ.slug,
    name: civ.name,
    description: info.description,
    overview: info.overview,
  };
});

const unitsTrans: Translation[] = units.map((unit) => {
  return {
    id: unit.id as string,
    name: unit.name as string,
    description: unit.description as string,
  };
});

const techTrans: Translation[] = technologies.map((unit) => {
  return {
    id: unit.id as string,
    name: unit.name as string,
    description: unit.description as string,
  };
});

const buildingsTrans: Translation[] = buildings.map((unit) => {
  return {
    id: unit.id as string,
    name: unit.name as string,
    description: unit.description as string,
  };
});

const upgradesTrans: Translation[] = upgrades.map((unit) => {
  return {
    id: unit.id as string,
    name: unit.name as string,
    description: unit.description as string,
  };
});

function getObj(list: Translation[]) {
  return list.reduce((acc, item) => {
    acc[item.id as string] = {
      name: item.name,
      description: item.description,
      overview: item.overview,
    };
    return acc;
  }, {});
}

// writeFile("../../messages/en.json", {
//   ...baseEN,
//   units: getObj(unitsTrans),
//   civs: getObj(civs),
//   technologies: getObj(techTrans),
//   buildings: getObj(buildingsTrans),
//   upgrades: getObj(upgradesTrans),
//   abilities: getObj(abilities),
// });

writeFile("../../messages/cn.json", {
  ...baseCN,
  units: getObj(unitsTrans),
  civs: getObj(civs),
  technologies: getObj(techTrans),
  buildings: getObj(buildingsTrans),
  upgrades: getObj(upgradesTrans),
  abilities: getObj(abilities),
});
