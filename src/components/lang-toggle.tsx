"use client";

import React, { useContext } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { LanguageContext } from "./lang-provider";
import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSwitcher() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("LanguageSwitcher must be used within a LanguageProvider");
  }

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const { language, setLanguage } = context;

  const handleLanguageChange = (lang: string) => {
    if (params.locale === lang) return;
    setLanguage(lang);
    router.push(pathname.replace(`/${params.locale}`, `/${lang}`));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className=" cursor-pointer"
          onClick={() => handleLanguageChange("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" cursor-pointer"
          onClick={() => handleLanguageChange("zh-CN")}
        >
          Chinese
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
