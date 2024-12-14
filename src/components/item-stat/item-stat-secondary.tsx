import { Unit } from "@data/types/items";
import { getStat } from "./utils";

interface Props {
  item: Unit;
}

export const ItemStatSecondary = ({ item }: Props) => {
  const stat = getStat(item);
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4">
      {[
        {
          label: "Move Speed",
          value: stat.moveSpeed,
          unit: "T/S",
        },
        {
          label: "Attack Speed",
          value: stat.attackSpeed,
          unit: "S",
        },
        {
          label: "Range",
          value: stat.maxRange?.toFixed(2),
          unit: "TILES",
        },
        {
          label: "Line of Sight",
          value: stat.lineOfSight?.toFixed(2),
          unit: "TILES",
        },
      ].map((i, index) => {
        if (i.value === undefined) {
          return null;
        }
        return (
          <div key={index} className="space-y-1">
            <h4 className="text-foreground/50 uppercase text-xs font-bold tracking-widest">
              {i.label}
            </h4>
            <p className="text-sm">
              <span className="text-lg text-foreground">{i.value}</span>
              <span className="ml-1 text-xs text-foreground/70 italic">
                {i.unit}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
