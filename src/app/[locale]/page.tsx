"use server";

import { redirect } from "next/navigation";

interface Params {
  locale: string 
}

interface Props {
  params: Promise<Params>
}

export default async function redirectPage({ params }: Props) {
  const { locale } = await params
  redirect(`/${locale || "zh-CN"}/civs/abbasid`); // Navigate to the new post page
}

