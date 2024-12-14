import { Technology } from "@data/types/items";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PRETTY_AGE_MAP_SHORT } from "@/utils/common";
import { Costs } from "@/components/item-costs";

type Props = {
  technologies: Technology[];
};

export function ItemTechnologies({ technologies = [] }: Props) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {technologies.map((tech) => {
        return (
          <div
            key={tech.baseId}
            className="p-4 border border-item-technology-light/30 rounded-xl bg-item-technology-light/5 space-y-4 flex flex-col"
          >
            <div className="flex">
              <span
                className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-sm text-[0.625rem] font-medium text-foreground  bg-item-technology mr-3`}
              >
                <Image
                  className="rounded shadow-md cursor-pointer h-[48px] w-[48px]"
                  src={"/assets/images/technologies/" + tech.id + ".png"}
                  alt={tech.name}
                  width={48}
                  height={48}
                  sizes="48vw"
                  priority
                />
              </span>

              <div className="w-full">
                <div className="flex">
                  <h4 className="flex-1 font-bold text-md text-foreground">
                    {t(`technologies.${tech.baseId}.name`)}
                  </h4>

                  <span className="font-bold font-serif text-item-unit-light">
                    {PRETTY_AGE_MAP_SHORT[tech.age]}
                  </span>
                </div>
                <p className="text-sm text-item-technology-light">
                  {tech.displayClasses.join(", ")}
                </p>
              </div>
            </div>

            <p className="text-foreground/80 text-md flex-1">
              {tech.unique ? `[${t("common.special")}] ` : ""}
              {t(`technologies.${tech.baseId}.description`)}
            </p>

            <div>
              <Costs costs={tech.costs} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
