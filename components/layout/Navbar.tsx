"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import Img from "../Img";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/chat", label: "AI Chat" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Img src="/logo.png" alt="Logo" className="size-10" />
          <span className="font-display text-[17px] font-700 tracking-tight text-text">
            Save<span className="text-primary">Poultry</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-4 py-2 text-sm font-500 transition-colors ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted hover:text-text"
              }`}
            >
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-primary-light"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/try"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-500 text-white shadow-sm transition-all hover:bg-primary-hover hover:shadow-md md:inline-flex"
          >
            Try Now
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-muted"
            onClick={() => setOpen(!open)}
          >
            {open ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-surface px-6 py-4 space-y-1 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-4 py-2.5 text-sm font-500 ${
                pathname === link.href
                  ? "bg-primary-light text-primary"
                  : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
