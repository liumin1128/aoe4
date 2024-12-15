// eslint-disable-next-line
// @ts-nocheck
import { Item, UnifiedItem } from "@data/types/items";
// import { patches } from "./patches/patch";
import { PatchLine, PatchNotes } from "@/types/patches";
import { civAbbr, civConfig } from "@/types/data";
import { CivConfig } from "@data/types/civs";
import { ChevronUp, ChevronDown, Minus } from "lucide-react";

import patches from "./patches.json";

// 生成 只带有必要信息的 patche_en.json 的代码
// const sss = patches.map((p) => {
//     return {
//       name: p.name,
//       id: p.id,
//       season: 5,
//       type: p.type,
//       date: p.date,
//       sections: p.sections.map((s) => {
//         return {
//           title: s.title,
//           subtitle: s.subtitle,
//           civs: s.civs,
//           changes: s.changes.map((c) => {
//             return {
//               items: c.items,
//               civs: c.civs,
//               diff: c.diff,
//             };
//           }),
//         };
//       }),
//     };
//   });

import { useTranslations } from "next-intl";

export function canonicalItemName(item: Item | UnifiedItem) {
  const group =
    item.type === "unit"
      ? "units"
      : item.type === "building"
      ? "buildings"
      : "technologies";
  return `${group}/${"baseId" in item ? item.baseId : item.id}`;
}

function civOverlap(filter: civAbbr[], value: civAbbr[]) {
  if (!value?.length || !filter?.length) return true;
  return filter.some((c) => value.includes(c));
}

const patchOrder = ["buff", "nerf", "fix"];

export const sortPatchDiff = (a: PatchLine, b: PatchLine) =>
  patchOrder.indexOf(a[0]) - patchOrder.indexOf(b[0]);

export function getPatchHistory(item: UnifiedItem, civs?: civConfig[]) {
  const cid = canonicalItemName(item);
  const civAbbrs = civs?.map((c) => c.abbr) || [];
  const history: { patch: PatchNotes; diff: PatchLine[] }[] = [];

  for (const [patchIndex, patch] of patches.entries()) {
    const diff: PatchLine[] = [];

    for (const section of patch.sections) {
      if (!civOverlap(civAbbrs, section.civs)) continue;

      for (const change of section.changes) {
        if (!change.items.includes(cid) || !civOverlap(civAbbrs, change.civs))
          continue;

        const filteredDiffs = change.diff
          .filter(([_, __, lc]) => civOverlap(civAbbrs, lc))
          .map(([t, l, lc = []]) => [t, l, [...lc, section.civs]]);

        // console.log("filteredDiffs");
        // console.log(filteredDiffs);

        diff.push(...filteredDiffs);
      }
    }

    if (diff.length > 0) {
      diff.sort(sortPatchDiff);
      history.push({ patch, diff, patchIndex: patchIndex });
    }
  }

  return history.sort(
    (a, b) => patches.indexOf(b.patch) - patches.indexOf(a.patch)
  );
}

interface Props {
  locale: string;
  civ: CivConfig;
  item: UnifiedItem;
}

export const Patches = ({ item, civ }: Props) => {
  const historyList = getPatchHistory(item, [civ]);

  const t = useTranslations();

  return (
    <div className="space-y-4">
      {historyList.map((history, idx) => {
        return (
          <div className="" key={history.patch.name}>
            <p className="text-xs text-foreground/60">
              {t(`patches.${history.patchIndex}.name`)}
              {` - ${new Date(history.patch.date).toLocaleDateString()}`}
            </p>

            <div className="mt-1">
              {history.diff.map(([type, change, civs]) => {
                return (
                  <p
                    key={change}
                    className="flex items-center gap-2 text-foreground"
                  >
                    {type === "fix" && (
                      <span className="w-4 h-4 flex items-center justify-center text-xs bg-foreground/5 rounded-full text-foreground">
                        <Minus className="w-3" />
                      </span>
                    )}

                    {type === "buff" && (
                      <span className="w-4 h-4 flex items-center justify-center text-xs bg-lime-500/5 rounded-full text-lime-500">
                        <ChevronUp className="w-4" />
                      </span>
                    )}

                    {type === "nerf" && (
                      <span className="w-4 h-4 flex items-center justify-center text-xs bg-rose-800/5 rounded-full text-rose-800">
                        <ChevronDown className="w-4" />
                      </span>
                    )}

                    {t(`patches${change}`)}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
