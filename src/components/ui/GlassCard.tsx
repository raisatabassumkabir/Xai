import { cn } from "@/lib/utils";
import React from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-panel rounded-2xl p-6 relative overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Subtle gradient overlay to enhance the glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";
