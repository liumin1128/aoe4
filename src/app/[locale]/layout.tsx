import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/lang-provider";
import "../global.css";

interface Params {
  locale: string;
}

interface Props {
  params: Promise<Params>;
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "帝国时代4资料库",
  description:
    "帝国时代4资料库是一个专注于帝国时代4游戏资料、攻略、新闻和交流的综合性网站。我们致力于为玩家提供最新、最全面的游戏信息，帮助玩家更好地掌握游戏和提升游戏体验。",
  keywords:
    "帝国时代，帝国时代4、游戏攻略、游戏资料、游戏新闻、玩家交流、游戏宝典、中世纪战争、历史策略游戏",
};

export default async function Layout(props: Props) {
  const { params, children } = props;
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </LanguageProvider>

        <Analytics />

        {/* 触发颜色渲染 */}
        <div
          className="
bg-item-unit
bg-item-technology 
bg-item-building 
bg-item-unit-light
bg-item-technology-light 
bg-item-building-light
hover:bg-item-unit-light
hover:bg-item-technology-light 
hover:bg-item-building-light


text-item-unit
text-item-technology 
text-item-building 
text-item-unit-light
text-item-technology-light 
text-item-building-light
hover:text-item-unit-light
hover:text-item-technology-light 
hover:text-item-building-light
"
        ></div>
      </body>
    </html>
  );
}
