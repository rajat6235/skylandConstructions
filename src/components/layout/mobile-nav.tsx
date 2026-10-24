"use client";

import Link from "next/link";
import { useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex size-[33px] items-center justify-center text-brand"
      >
        {open ? <CloseIcon className="h-[22px]" /> : <MenuIcon className="h-[22px]" />}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full z-20 bg-surface shadow-lg"
        >
          <ul className="flex flex-col py-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-[17px] text-brand hover:bg-black/10 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
