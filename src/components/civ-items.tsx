import Link from "next/link";
import pick from "lodash/pick";
import { use } from "react";
import cls from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Building,
  getCivConfig,
  getStructuredItems,
  Technology,
  Unit,
} from "@/utils/common";

interface Props {
  slug: string;
  locale: string;
  id: string;
}

const list = ["units", "buildings", "technologies"];

export function CivItems(props: Props) {
  const { slug, id, locale } = props;
  const civ = getCivConfig(slug, "slug");
  const data = use(getStructuredItems(civ));
  const t = useTranslations();

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-8">
        {Object.entries(pick(data, list)).map(([type, typeData]) => {
          return (
            <li key={type} className="">
              <div className="ml-1 mb-2 text-lg font-semibold leading-6 ">
                {t(`types.${type}`)}
              </div>
              <ul role="list" className=" space-y-2">
                {Object.entries(typeData).map(
                  // @ts-ignore
                  ([group, groupData]: [
                    string,
                    (Unit | Building | Technology)[]
                  ]) => {
                    if (groupData.length === 0) return;
                    return (
                      <div key={group}>
                        <div className="pl-1 text-xs font-semibold leading-6 text-foreground/70">
                          {t(`types.${group}`)}
                        </div>
                        {groupData.map((i) => {
                          const icon = i?.icon?.split("/").at(-1);
                          const url = `/${locale}/civs/${slug}/${type}/${i.id}`;

                          return (
                            <li key={i.id}>
                              <Link
                                href={url}
                                className={cls(
                                  "group flex gap-x-2 rounded-md p-1 mb-1 text-sm font-normal leading-6 cursor-pointer ",
                                  `hover:bg-item-${i.type}-light hover:bg-opacity-20`,
                                  {
                                    [`bg-item-${i.type}-light bg-opacity-20 text-white`]:
                                      id === i.id,
                                  }
                                )}
                              >
                                <span
                                  className={cls(
                                    `flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-[0.625rem] font-medium text-white  bg-item-${i.type} `
                                  )}
                                >
                                  <Image
                                    className="rounded shadow-md cursor-pointer w-8 h-auto"
                                    src={"/assets/images/" + type + "/" + icon}
                                    alt={i.name}
                                    width={24}
                                    height={24}
                                    sizes="24vw"
                                    priority
                                  />
                                </span>
                                <span className="truncate">
                                  {t(`${type}.${i.id}.name`)}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
