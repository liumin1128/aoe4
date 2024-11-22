import { useTranslations } from "next-intl";
import { use } from 'react'
import Image from "next/image";

import {getCivBySlug} from "@/utils/common";
import cls from "classnames";


interface Params {
  slug: string 
}

interface Props {
  params: Promise<Params>
}

export default function Civ({ params }: Props) {

  const { slug } = use(params)
  const t = useTranslations();
  const civ = getCivBySlug(slug)

  return (
    <div>
      <h3 className="text-base">{t("civs.abbasid.name")}</h3>
      <p className="text-base">{t("civs.abbasid.description")}</p>

      <div className="mt-8">
        {["units", "buildings", "technologies"].map((type) => {
          return (
            <div key={type} className="py-4">
              <h2 className="text-sm   text-white/50 font-bold mt-2 mb-3 ">
                {t("common.special")}
                {t(`types.${type}`)}
              </h2>

              <div className="flex">
                <div className="lg:columns-2 2xl:columns-4 gap-16 space-y-4">
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
                        <div key={i.id} className="flex items-center">
                          <span
                            className={cls(
                              `flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-[0.625rem] font-medium text-white  bg-item-${i.type} `
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
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
