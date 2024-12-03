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
  const unit = getUnit(id);
  const abilities = getAbilities(civ.config, id);
  const variation = getMostAppropriateVariation<Unit>(unit!, civ.config);
  const match = findClosestMatch(ITEMS.UNITS, id, civ.config);

  console.log("unit");
  console.log(unit);

  console.log("variation");
  console.log(variation);

  console.log("match");
  console.log(match);

  if (match?.id !== id) {
    redirect(`/${locale}/civs/${slug}/units/${match?.id}`);
  }

  return (
    <div>
      {unit?.name}
      <p>{unit?.description}</p>

      <p>{variation.description}</p>
    </div>
  );
}
