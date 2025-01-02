import { useTranslations } from "next-intl";
import { CivConfig } from "@data/types/civs";
import { UnifiedItem } from "@data/types/items";
import { technologies } from "@data/sdk";
import cls from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props {
  locale: string;
  civ: CivConfig;
  item: UnifiedItem;
}

function getResearches(item: UnifiedItem, civ: CivConfig) {
  const list = technologies
    .where({ producedAt: item.id, civilization: civ?.abbr })
    .order("age");
  return list;
}

export function Researches({ item, civ, locale }: Props) {
  const t = useTranslations();
  const list = getResearches(item, civ);

  if (!list.length) {
    return "-";
  }

  return (
    <ul role="list" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {list.map((i) => {
        const icon =
          "/assets/images/technologies/" + i?.icon?.split("/").at(-1);

        return (
          <li key={i.id} className="flex gap-x-4 items-center">
            <Link
              href={`/${locale}/civs/${civ.slug}/technologies/${i.id}`}
              className="flex gap-x-2 items-center"
            >
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
                {t(`technologies.${i.id}.name`)}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
