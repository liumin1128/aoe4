import Image from "next/image";
import { CivConfig } from "@data/types/civs";
import { UnifiedItem } from "@/types/data";
import { useTranslations } from "next-intl";
import cls from "classnames";

interface Props {
  item: UnifiedItem;
  civ: CivConfig;
}

export function ItemHeader(props: Props) {
  const { item, civ } = props;
  const t = useTranslations();
  const icon = item?.icon?.split("/").at(-1);

  return (
    <div className="flex items-center space-x-6 py-8 ">
      <Image
        className={cls(
          "rounded shadow-md cursor-pointer w-20 h-20 ",
          `bg-item-${item.type}`
        )}
        src={"/assets/images/" + item.type + "s/" + icon}
        alt={civ.abbr}
        width={0}
        height={0}
        sizes="128vw"
        priority
      />
      <div className="space-y-1">
        <p className={cls("text-sm", `text-item-${item.type}`)}>
          {item.classes.map((i) => t(`classes.${i}`)).join(" ")}
        </p>

        <h3 className="text-2xl font-bold">
          {t(`${item.type}s.${item.id}.name`)}
        </h3>

        <div className="flex space-x-2 items-center">
          <Image
            className="rounded-xs shadow-md cursor-pointer w-6 h-3"
            src={"/assets/flags/" + civ.abbr + ".png"}
            alt={civ.abbr}
            width={0}
            height={0}
            sizes="10vw"
            priority
          />
          <p className="text-xs font-bold text-foreground/70">
            {t(`civs.${civ.slug}.name`)}
          </p>
        </div>
      </div>
    </div>
  );
}
