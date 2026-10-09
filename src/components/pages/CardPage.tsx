'use client';

import { CardPageConfig } from '@/types/page';
import { InlineMarkdown, NotebookMarkdown } from '@/components/ui/NotebookMarkdown';
import { formatPeriod, isoMonth } from '@/lib/dates';

// Card pages (awards, services, teaching) render as a dated log, like News.
export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const Title = embedded ? 'h2' : 'h1';
    const id = config.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return (
        <section className="nb-section" aria-labelledby={`${id}-h`}>
            <Title id={`${id}-h`} className="nb-h2">{config.title}</Title>
            {config.description && <div className="nb-note"><NotebookMarkdown>{config.description}</NotebookMarkdown></div>}
            <ul className="nb-log">
                {config.items.map((item, index) => (
                    <li key={index}>
                        <time className="nb-when" dateTime={isoMonth(item)}>{formatPeriod(item)}</time>
                        <span className="nb-entry">
                            {item.link ? (
                                <a href={item.link} className="nb-link" target="_blank" rel="noopener noreferrer"><b>{item.title}</b></a>
                            ) : (
                                <b>{item.title}</b>
                            )}
                            {item.subtitle && <>, {item.subtitle}</>}
                            {item.content && <span className="nb-meta"><InlineMarkdown>{item.content}</InlineMarkdown></span>}
                            {item.tags && item.tags.length > 0 && <span className="nb-meta nb-mono">{item.tags.join(' · ')}</span>}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
