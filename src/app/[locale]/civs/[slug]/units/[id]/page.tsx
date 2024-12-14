import { useTranslations } from "next-intl";
import { use } from "react";
import { redirect } from "next/navigation";
import {
  getCivBySlug,
  getAbilities,
  getUnit,
  getMostAppropriateVariation,
  Unit,
  findClosestMatch,
  ITEMS,
} from "@/utils/common";
import { ItemHeader } from "@/components/item-header";
import { HighlightedText } from "@/components/highlighted-text";
import { Abilities } from "@/components/item-abilities";
import { ProducedAt } from "@/components/item-produced-at";
import { Patches } from "@/components/patches";
import { Costs } from "@/components/item-costs";
import { ItemStat } from "@/components/item-stat";
import { ItemTechnologies } from "@/components/item-technologies";
import { getItemTechnologies } from "@/utils/technologies";

interface Params {
  locale: string;
  id: string;
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default function Civ({ params }: Props) {
  const { locale, id, slug } = use(params);
  const t = useTranslations();

  const civ = getCivBySlug(slug);
  const item = getUnit(id)!;

  // const abilities = getAbilities(civ.config, id);
  const variation = getMostAppropriateVariation<Unit>(item, civ.config);

  if (
    item &&
    Array.isArray(item.civs) &&
    !item.civs.includes(civ.config.abbr)
  ) {
    const match = findClosestMatch(ITEMS.UNITS, id, civ.config);

    if (match) {
      redirect(`/${locale}/civs/${slug}/units/${match?.id}`);
    } else {
      redirect(`/${locale}/civs/${slug}`);
    }
  }

  const filterdtechs = getItemTechnologies(civ.config, item);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="basis-2/3 py-4 shrink-0 space-y-12">
          <ItemHeader item={item} civ={civ.config} />

          <HighlightedText text={`${t(`${item.type}s.${id}.description`)}`} />

          <div className="">
            <h3 className="font-bold text-lg mb-4">{t("common.abilities")}</h3>
            <Abilities civ={civ.config} locale={locale} item={item} />
          </div>

          <div>
            <h3 className=" font-bold text-lg  mb-4">
              {t("common.producedAt")}
            </h3>
            <ProducedAt civ={civ.config} locale={locale} item={item} />
          </div>

          <div>
            <h3 className=" font-bold text-lg  mb-4">{t("common.patches")}</h3>
            <Patches civ={civ.config} locale={locale} item={item} />
          </div>
        </div>

        <div className="flex-auto flex flex-col gap-8">
          <div className=" border rounded-2xl p-6">
            <div className="text-foreground/50 uppercase text-xs font-bold tracking-widest mb-2">
              Costs
            </div>
            <Costs costs={variation.costs} />
          </div>

          <div className=" border rounded-2xl p-6">
            <ItemStat item={item} civ={civ.config} />
          </div>
        </div>
      </div>
      <div>
        <h3 className=" font-bold text-lg  mb-4">{t("types.technologies")}</h3>
        <ItemTechnologies technologies={filterdtechs} />
      </div>
    </div>
  );
}
