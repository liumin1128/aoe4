import Link from "next/link";
import { UnifiedItem } from "@data/types/items";
import { CivConfig } from "@data/types/civs";
import { ItemSlug } from "@data/sdk/utils";
import { civilizations } from "@data/sdk";
import Image from "next/image";
import { useTranslations } from "next-intl";

const typeToPathMap = {
  building: "buildings",
  unit: "units",
  technology: "technologies",
};

export function formatSecondsToPhrase(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  // 1 hour 2 minutes 3 seconds
  return `${h > 0 ? `${h} hr${h > 1 ? "s" : ""} ` : ""}${
    m > 0 ? `${m} min${m > 1 ? "s" : ""} ` : ""
  }${s > 0 ? `${s} sec${s > 1 ? "s" : ""}` : ""}`.trim();
}

interface Props {
  id: ItemSlug;
  civ: CivConfig;
  locale: string;
}

export const InlineItemLink = (props: Props) => {
  const { id, civ, locale } = props;

  const t = useTranslations();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const item: UnifiedItem = civilizations.Get(civ).Get(id);

  console.log("item.type");
  console.log(item.type);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const type = typeToPathMap[item.type];

  let url = `/${locale}`;
  if (civ) {
    url += `/civs/${civ.slug}`;
  }
  url += `/${type}/${item.id}`;

  const icon = "/assets/images/" + type + "/" + item?.icon?.split("/").at(-1);

  return (
    <Link href={url} className="hover:underline">
      <span
        className={`inline-block w-[1.2em] h-[1.2em] mb-[-0.2em] p-0 mx-[0.3em] bg-item-${item.type}`}
      >
        <Image
          className=" cursor-pointer w-[1.2em] h-[1.2em]"
          src={icon}
          alt={item.type}
          width={0}
          height={0}
          sizes="100vw"
          priority
        />
      </span>

      <span className="font-bold">{t(`${type}.${item.id}.name`)}</span>
    </Link>
  );
};
