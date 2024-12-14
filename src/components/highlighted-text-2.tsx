import React from "react";
import {
  ChevronUp,
  ChevronDown,
  Minus,
  Plus,
  PlusCircle,
  MinusCircle,
} from "lucide-react";

export const HighlightedText = ({ text }: { text: string }) => {
  const list = text.split("\n");

  return (
    <div>
      {list.map((item, index) => {
        const hasPlus = item.includes("+");
        const hasMinus = item.includes("-");
        const text = item.replace("+", "").replace("-", "");
        return (
          <div key={index} className="flex items-center">
            {hasPlus && (
              <span className=" text-lime-500/90 mr-2">
                <PlusCircle className="w-4" />
              </span>
            )}

            {hasMinus && (
              <span className=" text-red-500/80 mr-2">
                <MinusCircle className="w-4" />
              </span>
            )}

            {text}
          </div>
        );
      })}
    </div>
  );
};
