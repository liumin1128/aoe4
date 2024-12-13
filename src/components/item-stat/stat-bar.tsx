import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { StatItem } from "./utils";
import Image from "next/image";
import cls from "classnames";
import get from "lodash/get";
import {
  Target,
  Heart,
  Swords,
  Flame,
  Axe,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
type Props = {
  label: string;
  modifiers: StatItem[];
  unit?: number;
};

const colorsMap = {
  base: "bg-slate-100",
  upgrade: "bg-item-unit-light",
  influence: "bg-item-technology",
  passive: "bg-item-technology",
  bonus: "bg-slate-100/10",
};

const sortIndex = ["base", "upgrade", "influence", "passive", "bonus"];

function getBfb(t: number) {
  if (t < 1) {
    return 1;
  }
  // console.log("t", t);
  return Math.floor(t);
}

export const StatBar = (props: Props) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { label, unit = 3, modifiers = [] } = props;
  const t = useTranslations();

  // console.log("sortedModifiers");
  // console.log(sortedModifiers);

  const sortedModifiers = [...modifiers]
    .sort((a, b) => {
      return sortIndex.indexOf(a.effectType) - sortIndex.indexOf(b.effectType);
    })
    // 转换加成类型，计算百分比
    .map((i) => {
      if (i.effect === "multiply") {
        const base = [...modifiers]
          .filter((i) => i.effectType === "base" || i.effectType === "upgrade")
          .map((i) => i.value!)
          .reduce((a, b) => a + b, 0);
        // console.log("11111", base, i.value);

        i.effect = "change";
        i.value = base! * (i.value! - 1);

        // todo： 关于日本的计算还有问题，需要确认百分比加成计算方式

        // console.log("i.value: ", i.id, i.value);
      }

      return i;
    })
    // 计算浮点数
    .map((i) => {
      if (i.effect === "change") {
        i.value = getBfb(i.value!);
      }
      return i;
    });

  // console.log("sortedModifiers");
  // console.log(sortedModifiers);

  if (!Array.isArray(sortedModifiers) || sortedModifiers.length === 0)
    return null;

  // const base = [...sortedModifiers]
  //   .filter((i) => i.effectType === "base")
  //   .map((i) => i.value!)
  //   .reduce((a, b) => a + b, 0);

  // 计算总数
  const total = [...sortedModifiers]
    .filter(
      (i) =>
        i.effectType === "base" ||
        i.effectType === "upgrade" ||
        i.effectType === "passive"
    )
    .map((i) => i.value!)
    .reduce((a, b) => a + b, 0);

  // const technologys = modifiers
  //   .filter((i) => i.effectType === "passive" || i.effectType === "upgrade")
  //   .map((i) => {
  //     if (i.effect === "change") {
  //       return i.value!;
  //     } else if (i.effect === "add") {
  //     } else if (i.effect === "multiply") {
  //       return Math.ceil(total! * (i.value! - 1));
  //     }
  //   });

  // console.log("technologys");
  // console.log(technologys);

  // const technology = technologys.reduce((a, b) => a! + b!, 0)!;

  // console.log("technology");
  // console.log(technology);

  // console.log("sortedModifiers");
  // console.log(sortedModifiers);

  return (
    <div>
      <div
        className="flex text-xs space-x-2 items-center mr-3 cursor-pointer"
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        <span className="flex-1">{`${label} ${total}`}</span>
        <ChevronRight
          className={cls(
            "w-[16px] h-[16px] text-foreground/50 transform transition-all ",
            {
              "rotate-90": showMore,
            }
          )}
        />
      </div>

      {showMore && (
        <div className="text-xs border p-2 mt-2 mb-2 space-y-3 bg-muted rounded-lg">
          {sortedModifiers.map((i, idx) => {
            if (i.type === "technology") {
              const icon = i?.item?.icon?.split("/").at(-1);

              return (
                <div key={idx} className="flex">
                  <span
                    className={cls(
                      `flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-sm text-[0.625rem] font-medium text-white  bg-item-${i.type} mr-2`
                    )}
                  >
                    <Image
                      className="rounded shadow-md cursor-pointer w-8 h-auto"
                      src={"/assets/images/technologies/" + icon}
                      alt={i?.item?.name + ""}
                      width={28}
                      height={28}
                      sizes="28vw"
                      priority
                    />
                  </span>

                  <div className="flex-1">
                    <div className="flex">
                      <span className="flex-1">
                        {/* {i.id} */}
                        {t(`technologies.${i.id}.name`)}
                      </span>
                      <span>+{i.value}</span>
                    </div>

                    <div className="text-foreground/50 mt-1">
                      {t(`technologies.${i.id}.description`)}
                    </div>
                  </div>
                </div>
              );
            }

            if (i.type === "bonus") {
              console.log("i", i.target);

              return (
                <div key={idx} className="">
                  <div className="flex">
                    <span className="flex-1">
                      {t("common.bonus")}
                      {": "}
                      {get(i, "target.class[0]", [])
                        .map((i) => t(`classes.${i}`))
                        .join(",")}
                    </span>
                    <span>+{i.value}</span>
                  </div>
                </div>
              );
            }

            return (
              <div key={idx} className="">
                <div className="flex">
                  <span className="flex-1">{i.label}</span>
                  <span>+{i.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!showMore && (
        <div
          className="flex space-x-0.5 mt-1 max-w-[240px] cursor-pointer"
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {sortedModifiers.map((i, idx) => {
            return (
              <div key={idx} className="relative group">
                <div
                  className={`value h-[12px] ${colorsMap[i.effectType]}`}
                  style={{ width: `${i.value! * unit}px` }}
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-muted text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {i.label}: +{i.value}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
