import React from "react";
import { useTranslations } from "next-intl";
import { ItemList } from "@data/sdk/utils";
import Image from "next/image";
import cls from "classnames";
import { CivConfig } from "@data/types/civs";
import { InlineItemLink } from "@/components/item-inline";
import { Cooldown } from "@/components/item-cooldown";
import { abilities } from "@data/sdk";
import { UnifiedItem, Ability } from "@data/types/items";

interface Props {
  civ: CivConfig;
  locale: string;
  item: UnifiedItem;
}

function getData(item: UnifiedItem, civ: CivConfig): ItemList<Ability> {
  if (civ && civ.abbr) {
    return abilities
      .where({
        civilization: civ.abbr,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        affects: `${item.type}s/${item.id}`,
      })
      .order("age")
      .sort((a, b) => (a.variations[0].active == "manual" ? -1 : 1));
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [];
}

export function Abilities(props: Props) {
  const { locale, civ, item } = props;
  const t = useTranslations();
  const list = getData(item, civ);

  return (
    <>
      <div className="">
        <ul role="list" className=" flex flex-col gap-y-4">
          {list.map((i) => {
            const variation = i?.variations[0];
            const icon =
              "/assets/images/abilities/" + i?.icon?.split("/").at(-1);

            console.log(i);
            return (
              <li key={i.id} className="flex gap-x-4">
                <div
                  className={cls(
                    ` shadow-md flex w-10 h-10 shrink-0 items-center justify-center rounded-md text-[0.625rem] font-medium  `,
                    {
                      ["bg-gradient-to-b from-[#5C457B] to-[#4D366E] border border-[#493B65]"]:
                        variation.active == "manual",
                    }
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

                <div className="">
                  <p className="text-base font-bold mb-1">
                    {t(`abilities.${i.id}.name`)}
                  </p>
                  <p className="text-sm text-foreground opacity-80">
                    {t(`abilities.${i.id}.description`)}

                    {variation.activatedOn?.length && (
                      <>
                        {variation.active === "toggle"
                          ? " Toggle on "
                          : variation.auraRange === 0
                          ? " Activate on "
                          : ` When ${
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              variation?.auraRange >= 1
                                ? `in ${variation.auraRange} tiles range of`
                                : `near`
                            }`}
                        {variation.activatedOn?.map((id, i, l) => (
                          <>
                            <InlineItemLink locale={locale} id={id} civ={civ} />
                            {`${
                              i == l.length - 2
                                ? " or "
                                : i < l.length - 1
                                ? ", "
                                : ""
                            }`}
                          </>
                        ))}
                        .
                      </>
                    )}

                    {variation.unlockedBy?.length && (
                      <>
                        {" "}
                        {t("common.requires")}{" "}
                        {variation.unlockedBy?.map((id) => {
                          return (
                            <span key={id}>
                              <InlineItemLink
                                locale={locale}
                                id={id}
                                civ={civ}
                              />
                            </span>
                          );
                        })}
                      </>
                    )}

                    {variation?.cooldown && (
                      <>
                        {" "}
                        <Cooldown seconds={variation.cooldown} />
                      </>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
