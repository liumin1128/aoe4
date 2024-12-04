import React, { use } from "react";
import { CivItems } from "@/components/civ-items";
import ModeToggle from "@/components/theme-toggle";
import LanguageSwitcher from "@/components/lang-toggle";
import { CivSwitcher } from "@/components/civ-switcher";

interface Params {
  locale: string;
  slug: string;
}

interface Props {
  params: Promise<Params>;
  children: React.ReactNode;
}

export default function Page({ children, params }: Props) {
  const { slug, locale } = use(params);

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 space-x-4">
          <div>Aoe4</div>
          <div className="flex-1">
            <CivSwitcher />
          </div>
          <div className="space-x-2">
            <ModeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className=" mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div
            className=" h-full fixed px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0  xl:pl-6 hidden lg:block border-r border-border/40 dark:border-border"
            style={{
              overflowY: "auto",
            }}
          >
            <CivItems id="" slug={slug} locale={locale} />
          </div>
          <div className=" px-4 py-6 sm:px-6 lg:pl-72 xl:flex-1 xl:pl-72">
            {children}
          </div>
        </div>
        {/* <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6"></div> */}
      </div>
    </div>
  );
}
