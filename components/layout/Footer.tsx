import Link from "next/link";
import Img from "../Img";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <Img src="/logo.png" alt="Logo" className="size-10" />

            <span className="font-display text-sm font-700 text-text">
              Save<span className="text-primary">Poultry</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-subtle">
            <Link href="/" className="hover:text-text transition-colors">
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="hover:text-text transition-colors"
            >
              How it Works
            </Link>
            <Link href="/try" className="hover:text-text transition-colors">
              Try Now
            </Link>
          </div>

          <p className="text-xs text-subtle text-center md:text-right">
            AI diagnosis ≠ professional vet advice
          </p>
        </div>
      </div>
    </footer>
  );
}
