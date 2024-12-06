import { useTranslations } from "next-intl";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCivBySlug } from "@/utils/common";
import cls from "classnames";

interface Params {
  slug: string;
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

export default function Civ({ params }: Props) {
  const { locale, slug } = use(params);
  const t = useTranslations();
  const civ = getCivBySlug(slug);

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
          <p className="text-sm text-foreground">{t("common.civilization")}</p>
        </div>
      </div>

      <p className="text-foreground">
        {t(`civs.${civ.config.slug}.description`)}
      </p>

      <div className="mt-8">
        <div>
          {["units", "buildings", "technologies"].map((type) => {
            return (
              <div key={type} className="py-4">
                <h2 className="text-lg text-foreground/60 font-bold mt-2 mb-3">
                  {t("common.special")}
                  {t(`types.${type}`)}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4">
                  {civ.data[type]
                    .order("hitpoints", "age")
                    .filter((i) => i.unique)
                    .map((i) => {
                      const icon =
                        "/assets/images/" +
                        type +
                        "/" +
                        i.icon?.split("/").at(-1);

                      const url = `/${locale}/civs/${slug}/${type}/${i.id}`;

                      return (
                        <div key={i.id} className="">
                          <Link href={url}>
                            <div className="flex items-center">
                              <span
                                className={cls(`rounded-sm bg-item-${i.type}`)}
                              >
                                <Image
                                  className="rounded shadow-md cursor-pointer"
                                  src={icon}
                                  alt={i.name}
                                  width={28}
                                  height={28}
                                  sizes="28vw"
                                  priority
                                />
                              </span>
                              <p className="ml-2 text-sm text-foreground">
                                {t(`${type}.${i.id}.name`)}
                              </p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 md:columns-2 gap-12 space-y-6 leading-6 text-foreground ">
        {civ.data.info.overview.map((i, idx) => {
          return (
            <div key={i.title} className="break-inside-avoid max-w-prose ">
              <h2 className="text-lg text-foreground/60 font-bold mt-2 mb-3">
                {t(`civs.${civ.config.slug}.overview.${idx}.title`)}
              </h2>
              {i.description && (
                <p className="whitespace-pre-wrap">
                  {t(`civs.${civ.config.slug}.overview.${idx}.description`)}
                </p>
              )}
              {Array.isArray(i.list) && i.list.length > 0 && (
                <ul className="list-disc list-inside marker:text-foreground/30">
                  {i?.list?.map((j, jdx) => {
                    return (
                      <li key={j} className="-indent-5 pl-5">
                        {t(
                          `civs.${civ.config.slug}.overview.${idx}.list.${jdx}`
                        )}
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
