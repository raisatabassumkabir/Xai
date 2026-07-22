import { cn } from "@/lib/utils";
import React from "react";

export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section ref={ref} className={cn("relative py-24 w-full overflow-hidden", className)} {...props} />
  )
);
Section.displayName = "Section";

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", className)}
      {...props}
    />
  )
);
Container.displayName = "Container";
