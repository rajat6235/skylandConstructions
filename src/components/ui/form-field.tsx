import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
};

/** Wraps an input whose label floats up when the field is focused or filled. */
export function FieldShell({ id, label, error, optional, children, className }: FieldShellProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-[9px] left-4 origin-left text-[15px] text-[#888] transition-all duration-200 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:tracking-wide peer-focus:text-brand peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-wide"
      >
        {label}
        {optional && <span className="font-normal text-[#aaa]"> (optional)</span>}
      </label>
      <p
        id={`${id}-error`}
        aria-live="polite"
        className={cn(
          "overflow-hidden text-[13px] leading-5 text-[#d93025] transition-all duration-200",
          error ? "mt-1.5 max-h-10 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {error}
      </p>
    </div>
  );
}

export const inputClass = (invalid: boolean) =>
  cn(
    "peer block w-full border bg-[#f7f7f7] px-4 pt-[22px] pb-2 text-[15px] text-ink transition-[border-color,background-color,box-shadow] duration-200 outline-none placeholder:text-transparent focus:bg-white focus:shadow-[0_0_0_3px_rgba(6,174,196,0.15)]",
    invalid ? "border-[#d93025] focus:border-[#d93025]" : "border-[#e2e2e2] hover:border-[#c8c8c8] focus:border-brand",
  );
