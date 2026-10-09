'use client';

import { useMessages } from '@/lib/i18n/useMessages';
import { InlineMarkdown } from '@/components/ui/NotebookMarkdown';
import { formatMonth } from '@/lib/dates';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();

    return (
        <section className="nb-section" id="news" aria-labelledby="news-h">
            <h2 id="news-h" className="nb-h2">{title || messages.home.news}</h2>
            <ul className="nb-log">
                {items.map((item, index) => (
                    <li key={index}>
                        <time className="nb-when" dateTime={item.date}>{formatMonth(item.date)}</time>
                        <span className="nb-entry"><InlineMarkdown>{item.content}</InlineMarkdown></span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
