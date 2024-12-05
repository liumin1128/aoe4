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

  console.log(civ);

  return (
    <div>
      <div className="flex items-center space-x-6 py-8 ">
        <Image
          className="rounded shadow-md cursor-pointer w-20 h-18"
          src={"/assets/flags/" + civ.config.abbr + ".png"}
          alt={civ.config.abbr as string}
          width={0}
          height={0}
          sizes="128vw"
          priority
        />
        <div className="space-y-1">
          <h3 className="text-sm font-bold leading-none">
            {t(`civs.${civ.config.slug}.name`)}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("common.civilization")}
          </p>
        </div>
      </div>

      <p className="text-base">{t(`civs.${civ.config.slug}.description`)}</p>

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
                  {civ.data[type]
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

      <div className="md:columns-2 gap-16 space-y-6 leading-6 text-white/80">
        {civ.data.info.overview.map((i) => {
          return (
            <div key={i.title} className="break-inside-avoid max-w-prose">
              <h2 className="text-lg text-white/40 font-bold mt-2 mb-3">
                {i.title}
              </h2>
              {i.description && (
                <p className="whitespace-pre-wrap">{i.description}</p>
              )}
              {Array.isArray(i.list) && i.list.length > 0 && (
                <ul className="list-disc list-inside marker:text-white/30">
                  {i?.list?.map((j) => {
                    return (
                      <li key={j} className="-indent-5 pl-5">
                        {j}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
