import { useTranslations } from "next-intl";
import { CivConfig } from "@data/types/civs";
import { UnifiedItem } from "@data/types/items";
import { technologies, buildings } from "@data/sdk";
import cls from "classnames";
import Image from "next/image";

interface Props {
  locale: string;
  civ: CivConfig;
  item: UnifiedItem;
}

function getResearchAt(item: UnifiedItem, civ: CivConfig) {
  const producedBy = [
    ...new Set(
      item.variations
        .filter((v) => !civ || v.civs.includes(civ.abbr))
        .flatMap((v) => v.producedBy)
    ),
  ];
  console.log(producedBy);
  const items = producedBy.map((b) => buildings.get(b));
  return items;
}

export function ResearchAt({ item, civ }: Props) {
  const t = useTranslations();
  const list = getResearchAt(item, civ);

  console.log(list);

  return (
    <ul role="list" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {list.map((i) => {
        const icon = "/assets/images/buildings/" + i?.icon?.split("/").at(-1);

        return (
          <li key={i?.id} className="flex gap-x-4 items-center">
            <div
              className={cls(
                `shadow-md flex w-10 h-10 shrink-0 items-center justify-center rounded-sm text-[0.625rem] font-medium bg-item-${i?.type} `
              )}
            >
              <Image
                className="rounded shadow-md cursor-pointer w-10 h-10"
                src={icon}
                alt={i?.name + ""}
                width={0}
                height={0}
                sizes="100vw"
                priority
              />
            </div>

            <p className="text-base font-bold mb-1">
              {t(`buildings.${i?.id}.name`)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
