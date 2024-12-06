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
  const abilities = getAbilities(civ.config, id);
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

  return (
    <div>
      <div className="pb-8">
        <ItemHeader item={item} civ={civ.config} />
      </div>

      <div className="pb-8">
        <HighlightedText text={`${t(`${item.type}s.${id}.description`)}`} />
      </div>

      <h3 className=" font-bold text-lg ">{t("common.abilities")}</h3>

      <div className="mt-6 mb-10">
        <Abilities civ={civ.config} locale={locale} item={item} />
      </div>

      <h3 className=" font-bold text-lg ">{t("common.producedAt")}</h3>

      <div className="mt-6 mb-10">
        <ProducedAt civ={civ.config} locale={locale} item={item} />
      </div>
    </div>
  );
}
