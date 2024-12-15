import { useTranslations } from "next-intl";
import { use } from "react";
import { redirect } from "next/navigation";
import {
  getCivBySlug,
  getTechnology,
  getMostAppropriateVariation,
  Unit,
  Building,
  findClosestMatch,
  ITEMS,
  Technology,
} from "@/utils/common";
import { ItemHeader } from "@/components/item-header";
import { HighlightedText } from "@/components/highlighted-text-2";
import { Abilities } from "@/components/item-abilities";
import { ProducedAt } from "@/components/item-produced-at";
import { ResearchAt } from "@/components/item-research-at";
import { Patches } from "@/components/patches";
import { Costs } from "@/components/item-costs";
import { ItemStatPrimary } from "@/components/item-stat";
import { ItemStatSecondary } from "@/components/item-stat/item-stat-secondary";
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
  const item = getTechnology(id)!;

  // const abilities = getAbilities(civ.config, id);
  const variation = getMostAppropriateVariation<Unit | Building | Technology>(
    item,
    civ.config
  );

  if (
    item &&
    Array.isArray(item.civs) &&
    !item.civs.includes(civ.config.abbr)
  ) {
    const match = findClosestMatch(ITEMS.TECHNOLOGIES, id, civ.config);

    if (match) {
      redirect(`/${locale}/civs/${slug}/technologies/${match?.id}`);
    } else {
      redirect(`/${locale}/civs/${slug}`);
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="basis-2/3 py-4 shrink-0 space-y-12">
          <div>
            <ItemHeader item={item} civ={civ.config} />
            <div className="mt-4">
              <HighlightedText
                text={`${t(`technologies.${id}.description`)}`}
              />
            </div>
          </div>

          <div>
            <h3 className=" font-bold text-lg  mb-4">
              {t("common.researchat")}
            </h3>
            <ResearchAt civ={civ.config} locale={locale} item={item} />
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
        </div>
      </div>
    </div>
  );
}
