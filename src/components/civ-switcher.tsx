"use client";

import * as React from "react";

import Image from "next/image";
import { CIVILIZATIONS } from "@data/lib/config/civs";
import { useRouter, usePathname, useParams } from "next/navigation";
import { getCivBySlug } from "@/utils/common";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CivConfig } from "@data/types/civs";

export function CivSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const civ = getCivBySlug(params.slug as string);

  const handleCivChange = (civ: CivConfig) => {
    if (params.slug === civ.slug) return;
    router.push(pathname.replace(`/${params.slug}`, `/${civ.slug}`));
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Image
              className="rounded shadow-md cursor-pointer w-14 h-auto"
              src={"/assets/flags/" + civ.config.abbr + ".png"}
              alt={civ.config.name}
              width="0"
              height="0"
              sizes="64vw"
              priority
            />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] grid-cols-4">
              {Object.entries(CIVILIZATIONS).map(([abbr, civ], index) => {
                return (
                  <li
                    key={abbr}
                    className="row-span-3"
                    onClick={() => handleCivChange(civ)}
                  >
                    <Image
                      className="rounded shadow-md cursor-pointer w-full h-auto"
                      src={"/assets/flags/" + abbr + ".png"}
                      alt={civ.name}
                      width="0"
                      height="0"
                      sizes="64vw"
                      priority
                    />
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
