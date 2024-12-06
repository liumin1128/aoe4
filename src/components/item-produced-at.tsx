import { useTranslations } from "next-intl";
import { CivConfig } from "@data/types/civs";
import { UnifiedItem } from "@data/types/items";
import { buildings } from "@data/sdk";
import uniq from "lodash/uniq";
import cls from "classnames";
import Image from "next/image";

interface Props {
  locale: string;
  civ: CivConfig;
  item: UnifiedItem;
}

function getProducedBy(item: UnifiedItem, civ: CivConfig) {
  if (civ && civ.abbr) {
    const producedByIDs = uniq(
      item?.variations
        .filter((v) => !civ || v.civs.includes(civ.abbr))
        .flatMap((v) => v.producedBy)
    );

    return producedByIDs
      .map((b) => buildings.get(b))
      .filter((i) => i?.civs?.includes(civ.abbr))
      .filter(Boolean)
      .sort((a, b) => b.civs?.length - a.civs?.length);
  } else {
    const producedByIDs = uniq(item?.variations.flatMap((v) => v.producedBy));
    return producedByIDs
      .map((b) => buildings.get(b))
      .filter(Boolean)
      .sort((a, b) => b.civs?.length - a.civs?.length);
  }
}

export function ProducedAt({ item, civ }: Props) {
  const t = useTranslations();
  const list = getProducedBy(item, civ);

  return (
    <ul role="list" className=" flex gap-8 flex-wrap">
      {list.map((i) => {
        const icon = "/assets/images/buildings/" + i?.icon?.split("/").at(-1);

        return (
          <li key={i.id} className="flex gap-x-4 items-center">
            <div
              className={cls(
                `shadow-md flex w-10 h-10 shrink-0 items-center justify-center rounded-sm text-[0.625rem] font-medium bg-item-${i.type} `
              )}
            >
              <Image
                className="rounded shadow-md cursor-pointer w-10 h-10"
                src={icon}
                alt={i.name}
                width={0}
                height={0}
                sizes="100vw"
                priority
              />
            </div>

            <p className="text-base font-bold mb-1">
              {t(`buildings.${i.id}.name`)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
