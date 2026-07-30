"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AktiivaLogo } from "@/components/AktiivaLogo";
import { nav } from "@/lib/content";
import styles from "./SiteNav.module.css";

/**
 * The site's one navigation. Two colour treatments, not two components:
 * `onDark` sits over the homepage hero photograph, `onLight` over the
 * paper background on every other page. Keeping it single-sourced means
 * the link list can't drift between the hero and the subpages.
 *
 * Client component only because the active link is derived from
 * usePathname() — there is no other interactivity here.
 */
export function SiteNav({ tone = "onLight" }: { tone?: "onDark" | "onLight" }) {
  const pathname = usePathname();
  return (
    <header className={`${styles.header} ${styles[tone]}`}>
      <Link href="/" className={styles.logoLink} aria-label="Aktiiva ry — etusivu">
        <AktiivaLogo
          variant={tone === "onDark" ? "mark-white" : "mark-navy"}
          height={38}
          priority={tone === "onDark"}
        />
      </Link>
      <nav aria-label="Päävalikko">
        <ul className={styles.nav}>
          {nav.map((item) => {
            // "/" would otherwise prefix-match every route.
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={active ? styles.active : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
