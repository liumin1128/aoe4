import { useTranslations } from "next-intl";
import { use } from "react";
import Image from "next/image";
import { getCivBySlug } from "@/utils/common";
import cls from "classnames";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default function Civ({ params }: Props) {
  const { slug } = use(params);
  const t = useTranslations();
  const civ = getCivBySlug(slug);

  return (
    <div>
      <div className="flex items-center space-x-6 py-8 ">
        <Image
          className="rounded shadow-md cursor-pointer w-20 h-18"
          src={"/assets/flags/" + civ.abbr + ".png"}
          alt={civ.abbr as string}
          width={0}
          height={0}
          sizes="128vw"
          priority
        />
        <div className="space-y-1">
          <h3 className="text-sm font-bold leading-none">
            {t("civs.abbasid.name")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("common.civilization")}
          </p>
        </div>
      </div>

      <p className="text-base">{t("civs.abbasid.description")}</p>

      <div className="mt-8">
        <div>
          {["units", "buildings", "technologies"].map((type) => {
            return (
              <div key={type} className="py-4">
                <h2 className="text-sm   text-foreground/70 font-bold mt-2 mb-3 ">
                  {t("common.special")}
                  {t(`types.${type}`)}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {civ[type]
                    .order("hitpoints", "age")
                    .filter((i) => i.unique)
                    .map((i) => {
                      const icon =
                        "/assets/images/" +
                        type +
                        "/" +
                        i.icon?.split("/").at(-1);

                      return (
                        <div key={i.id} className="">
                          <div className="flex items-center">
                            <span
                              className={cls(
                                `flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-[0.625rem] font-medium text-foreground  bg-item-${i.type}`
                              )}
                            >
                              <Image
                                className="rounded shadow-md cursor-pointer h-8 w-8"
                                src={icon}
                                alt={i.name}
                                width={36}
                                height={36}
                                sizes="36vw"
                                priority
                              />
                            </span>
                            <p className="ml-2 min-w-48">
                              {t(`${type}.${i.id}.name`)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
