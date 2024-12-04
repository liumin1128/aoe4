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
import names from "./names.json";

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
  ...baseEN,
  units: getObj(unitsTrans),
  civs: getObj(civs),
  technologies: getObj(techTrans),
  buildings: getObj(buildingsTrans),
  upgrades: getObj(upgradesTrans),
  abilities: getObj(abilities),
});

function convertToTitleCase(str) {
  return str
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

let missCount = 0;

function getObjCN(list: Translation[]) {
  return list.reduce((acc, item) => {
    let name = item.name;
    if (names[name]) {
      name = names[name];
      // console.log("Found: ", name);
    } else {
      console.log('"' + name + '": "",');
      missCount++;
    }
    acc[item.id as string] = { name: name, description: item.description };
    return acc;
  }, {});
}

writeFile("../../messages/cn.json", {
  ...baseCN,
  units: getObjCN(unitsTrans),
  civs: getObjCN(civs),
  technologies: getObjCN(techTrans),
  buildings: getObjCN(buildingsTrans),
  upgrades: getObjCN(upgradesTrans),
  abilities: getObjCN(abilities),
});

console.log("Missing: ", missCount);
