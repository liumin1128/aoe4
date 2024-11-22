import { useTranslations } from "next-intl";
import { use } from 'react'

interface Params {
  slug: string 
}

interface Props {
  params: Promise<Params>
}

export default function Civ({ params }: Props) {

  const { slug } = use(params)
  const t = useTranslations();

  return (
    <div>
      <div>{slug}</div>
      <h3 className="text-base">{t("civs.abbasid.name")}</h3>
    </div>
  );
}
