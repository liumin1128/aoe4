"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AgeTabsProps = {
  age: number;
  setAge: (age: number) => void;
  minAge: number;
};

const ages = [1, 2, 3, 4];

export const PRETTY_AGE_MAP_SHORT = ["", "I", "II", "III", "IV"];

export const AgeTabs = (props: AgeTabsProps) => {
  const { age, setAge, minAge } = props;

  return (
    <Tabs
      defaultValue={`${age}`}
      // className="border rounded-lg"
      onValueChange={(e) => {
        setAge(parseInt(e, 0));
      }}
    >
      <TabsList className="grid w-full grid-cols-4">
        {ages.map((age) => {
          return (
            <TabsTrigger
              key={age}
              value={`${age}`}
              disabled={age < minAge}
              className="font-bold font-serif"
            >
              {PRETTY_AGE_MAP_SHORT[age]}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};
