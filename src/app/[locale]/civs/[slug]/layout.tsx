import React, { use } from "react";
import { CivItems } from "@/components/civ-items";

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

  console.log("locale", locale);

  return (
    <div className="flex min-h-full flex-col">
      <header className="fixed w-full shrink-0 border-b border-gray-200 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          Aoe4
        </div>
      </header>

      <div className="pt-16 mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div
            className="h-full fixed border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6 hidden lg:block"
            style={{
              overflowY: "auto",
            }}
          >
            <CivItems id="" slug={slug} locale={locale} />
          </div>
          <div className="px-4 py-6 sm:px-6 lg:pl-72 xl:flex-1 xl:pl-72">
            {children}
          </div>
        </div>
        {/* <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6"></div> */}
      </div>
    </div>
  );
}
