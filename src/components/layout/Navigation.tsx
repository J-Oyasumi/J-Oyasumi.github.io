'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import type { SiteConfig } from '@/lib/config';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { I18nRuntimeConfig } from '@/types/i18n';

interface NavigationProps {
  items: SiteConfig['navigation'];
  siteTitle: string;
  enableOnePageMode?: boolean;
  i18n: I18nRuntimeConfig;
  itemsByLocale?: Record<string, SiteConfig['navigation']>;
  siteTitleByLocale?: Record<string, string>;
}

// Quiet notebook header: plain mono tabs top-right, the current one underlined.
export default function Navigation({
  items,
  enableOnePageMode,
  i18n,
  itemsByLocale,
}: NavigationProps) {
  const pathname = usePathname();
  const locale = useLocaleStore((state) => state.locale);
  const [activeHash, setActiveHash] = useState('');
  const resolvedLocale = i18n.enabled ? locale : i18n.defaultLocale;

  const effectiveItems = useMemo(() => {
    return itemsByLocale?.[resolvedLocale] || itemsByLocale?.[i18n.defaultLocale] || items;
  }, [i18n.defaultLocale, items, itemsByLocale, resolvedLocale]);

  useEffect(() => {
    if (!enableOnePageMode) return;
    const sync = () => setActiveHash(window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [enableOnePageMode]);

  const hrefFor = (item: SiteConfig['navigation'][number]) =>
    enableOnePageMode ? (item.href === '/' ? '/' : `/#${item.target}`) : item.href;

  const isActive = (item: SiteConfig['navigation'][number]) => {
    if (enableOnePageMode) {
      return item.href === '/' ? !activeHash : activeHash === `#${item.target}`;
    }
    // Static export uses trailing slashes ("/publications/").
    const path = pathname.replace(/\/$/, '') || '/';
    return item.href === '/' ? path === '/' : path.startsWith(item.href);
  };

  return (
    <header className="nb-topbar">
      <nav className="nb-tabs" aria-label="Sections">
        {effectiveItems.map((item) => (
          <Link
            key={item.target}
            href={hrefFor(item)}
            className="nb-tab"
            aria-current={isActive(item) ? 'page' : undefined}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <span className="flex items-center">
        <LanguageToggle i18n={i18n} />
        <ThemeToggle />
      </span>
    </header>
  );
}
