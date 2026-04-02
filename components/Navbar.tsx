"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/chat", label: "Try Now" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <RiLeafLine size={16} className="text-white" />
          </div>
          <span className="font-display text-lg font-700 text-text">
            Save<span className="text-primary">Poultry</span>
          </span>
        </Link>

        {/* Nav links */}
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
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg bg-primary-light"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/chat"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-600 text-white transition-colors hover:bg-primary-hover"
        >
          Diagnose Now
        </Link>
      </div>
    </nav>
  );
}