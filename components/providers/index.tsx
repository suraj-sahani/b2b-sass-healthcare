import { type ReactNode } from "react";
import { TooltipProvider } from "../ui/tooltip";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
}
