// components/Tooltip.tsx
import { ReactNode } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className="relative group inline-flex items-center">
      {children}

      <div
        className="
          absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-3
          px-4 py-2 text-[11px] font-medium
          bg-white text-[#0A3F40]
          border border-[#8DB1B2]/40
          rounded-2xl shadow-md
          opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
          pointer-events-none
          transition-all duration-200 ease-out whitespace-nowrap
        "
      >
        {text}
      </div>
    </div>
  );
}
