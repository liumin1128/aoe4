import { CIVILIZATIONS } from "@data/lib/config/civs";
import { CivConfig } from "@data/types/civs";
import { civilizations } from "@data/sdk";

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
  return civilizations.Get(civ.abbr)
}
