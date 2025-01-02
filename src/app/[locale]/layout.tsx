import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
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
