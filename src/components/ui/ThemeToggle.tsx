'use client';

import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useThemeStore, resolveTheme } from '@/lib/stores/themeStore';
import { useMessages } from '@/lib/i18n/useMessages';

// Two-state switch: light <-> dark. A first-time visitor starts from their system preference,
// but there is no "follow system" option in the cycle.
export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const messages = useMessages();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Same footprint as the button so the header doesn't shift on hydration.
    return <span className="nb-icon-btn" aria-hidden="true" />;
  }

  const effective = resolveTheme(theme);
  const next = effective === 'dark' ? 'light' : 'dark';
  const label = `${messages.theme.currentTheme}: ${effective === 'dark' ? messages.theme.dark : messages.theme.light}`;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="nb-icon-btn"
      title={label}
      aria-label={label}
    >
      {effective === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
