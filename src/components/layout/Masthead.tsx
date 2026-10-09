'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SiteConfig } from '@/lib/config';

// Handwritten name + mono subtitle above every page, like a notebook's title line.
// The name is the page's h1 only on the home page; other pages title themselves.
export default function Masthead({ author }: { author: SiteConfig['author'] }) {
  const pathname = usePathname();
  const isHome = (pathname.replace(/\/$/, '') || '/') === '/';
  const subtitle = [author.title, author.institution].filter(Boolean).join(' at ');
  const Name = isHome ? 'h1' : 'p';

  return (
    <div className="nb-wrap">
      <div className="nb-masthead">
        <Name className="nb-name">
          {isHome ? author.name : <Link href="/">{author.name}</Link>}
          {author.name_zh && <span className="nb-name-zh" lang="zh-CN">{author.name_zh}</span>}
        </Name>
        {subtitle && <p className="nb-sub nb-mono">{subtitle}</p>}
      </div>
      <hr className="nb-rule" />
    </div>
  );
}
