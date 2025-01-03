import React, { use } from "react";
import { CivItems } from "@/components/civ-items";
import ModeToggle from "@/components/theme-toggle";
import LanguageSwitcher from "@/components/lang-toggle";
import { CivSwitcher } from "@/components/civ-switcher";
import { Button } from "@/components/ui/button";
import { AppDrawer } from "@/components/app-drawer";
import { Menu } from "lucide-react";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
        <div className="flex h-16 mx-auto w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8 space-x-4">
          <div>Aoe4</div>
          <div className="flex-1">
            <div className="flex items-center ">
              <CivSwitcher />
              <div className="block lg:hidden">
                <AppDrawer
                  trigger={
                    <Button variant="outline">
                      <Menu />
                    </Button>
                  }
                >
                  <div
                    className="sticky w-full max-h-[calc(100vh)] xl:shrink-0"
                    style={{
                      scrollbarWidth: "none",
                      overflow: "auto",
                    }}
                  >
                    <SheetHeader>
                      <SheetTitle>帝国时代4助手</SheetTitle>
                      <SheetDescription>
                        资料库，攻略，工具，助手
                      </SheetDescription>
                    </SheetHeader>
                    <br />
                    <CivItems id="" slug={slug} locale={locale} />
                  </div>
                </AppDrawer>
              </div>
            </div>
          </div>
          <div className="space-x-2">
            <ModeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-screen-2xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="h-full w-full max-w-xs hidden xl:block">
            <div
              className="sticky max-h-[calc(100vh)] top-20 py-4  pl-6 xl:shrink-0"
              style={{
                scrollbarWidth: "none",
                overflow: "auto",
              }}
            >
              <CivItems id="" slug={slug} locale={locale} />
            </div>
          </div>
          <div className="flex-auto">
            <div className="max-w-screen-lg p-4 mx-auto gap-4 mb-4 mt-8">
              {children}
            </div>
          </div>
        </div>
        {/* <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6"></div> */}
      </div>
    </div>
  );
}
