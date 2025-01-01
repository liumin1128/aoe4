"use client";

import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export function AppDrawer({ children, trigger }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left">
        <SheetClose asChild>
          <div
            onClick={() => {
              setOpen(false);
            }}
          >
            {children}
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
