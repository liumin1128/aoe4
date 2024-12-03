import { useTranslations } from "next-intl";

export function formatSecondsToPhrase(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  // 1 hour 2 minutes 3 seconds
  return `${h > 0 ? `${h} hr${h > 1 ? "s" : ""} ` : ""}${
    m > 0 ? `${m} min${m > 1 ? "s" : ""} ` : ""
  }${s > 0 ? `${s} sec${s > 1 ? "s" : ""}` : ""}`.trim();
}

interface Props {
  seconds: number;
}

export const Cooldown = (props: Props) => {
  const t = useTranslations();

  return (
    <span>
      {`${formatSecondsToPhrase(props.seconds)} ${t("common.cooldown")}`}
    </span>
  );
};
