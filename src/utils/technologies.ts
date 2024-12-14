import uniqBy from "lodash/uniqBy";
import { UnifiedItem, Technology } from "@data/types/items";
import { CivConfig } from "@data/types/civs";
import { technologies } from "@data/sdk";

export const getItemTechnologies = (
  civ: CivConfig,
  item: UnifiedItem,
  age: number = 4
) => {
  const technologiesVariations: Technology[] = [];

  technologies.map((t) => {
    t.variations.map((v) => {
      if (v.civs.includes(civ.abbr)) {
        technologiesVariations.push(v);
      }
    });
  });

  let filterdtechs = technologiesVariations
    // 当前时代的科技
    .filter((i) => i.age <= age)
    // 当前单位可用的科技
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
          // console.log("j.select?.class, item.classes");
          // console.log(i.id, j.select?.class, item.classes);
          matchesClass = true;
        }
      });
      return matchesId || matchesClass;
    });

  // 选择最新的科技
  filterdtechs = filterdtechs.sort((a, b) => b.age - a.age);
  filterdtechs = uniqBy(filterdtechs, "baseId");
  filterdtechs = filterdtechs.sort((a, b) => a.age - b.age);

  return filterdtechs;
};
