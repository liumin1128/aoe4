import { Modifier } from "@data/types/items";
import groupBy from "lodash/groupBy";
import {
  Moon,
  Sun,
  Sword,
  ChevronsUp,
  CirclePlus,
  ChevronUp,
} from "lucide-react";

type Props = {
  label: string;
  max: number;
  age: number;
  value: number;
  techs?: Modifier[];
  weapons?: Modifier[];
};

export const StatBar = (props: Props) => {
  const { label, value, techs = [], weapons = [] } = props;

  let techsValue = 0;
  let bonusValue = 0;

  techs.map((i) => {
    if (i.effect === "change") {
      techsValue += i.value;
    }
  });

  weapons.map((i) => {
    if (i.effect === "change") {
      if (bonusValue < i.value) {
        bonusValue = i.value;
      }
    }
  });

  return (
    <div>
      <div className="flex text-sm">
        <div className="flex space-x-2 items-center mr-3">
          <Sword className="h-[1rem] w-[1rem] mr-1" /> {value}
        </div>
        <div className="flex space-x-2 items-center mr-3">
          <ChevronUp className="h-[1rem] w-[1rem] mr-1" /> {techsValue}
        </div>
        <div className="flex space-x-2 items-center mr-3">
          <ChevronsUp className="h-[1rem] w-[1rem] mr-1" /> {bonusValue}
        </div>
        <div className="flex-1 text-right">{label}</div>
      </div>
    </div>
  );
};
