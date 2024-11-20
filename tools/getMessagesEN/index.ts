import { civilizations, units, technologies, buildings, upgrades } from "@data/sdk";
import { writeFile } from "./utils";
import { CIVILIZATIONS } from "@data/lib/config/civs";

interface Translation {
  id: string;
  name: string;
  description: string;
}

const civs = Object.values(CIVILIZATIONS).map((civ) => {
  return {
    id: civ.slug,
    name: civ.name,
    description: civilizations.Get(civ.abbr).info.description,
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
    acc[item.id as string] = { name: item.name, description: item.description };
    return acc;
  }, {});
}

writeFile("../../messages/en.json", {
  units: getObj(unitsTrans),
  civs: getObj(civs),
  technologies: getObj(techTrans),
  buildings: getObj(buildingsTrans),
  upgrades: getObj(upgradesTrans),
});
