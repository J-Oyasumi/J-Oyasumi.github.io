'use client';

import { InlineMarkdown } from '@/components/ui/NotebookMarkdown';

export interface MiscItem {
    title?: string;
    content: string;
    link?: string;
}

interface MiscProps {
    items: MiscItem[];
    title?: string;
}

export default function Misc({ items, title = 'Misc' }: MiscProps) {
    return (
        <section className="nb-section" id="misc" aria-labelledby="misc-h">
            <h2 id="misc-h" className="nb-h2">{title}</h2>
            <ul className="nb-misc">
                {items.map((item, index) => (
                    <li key={index}>
                        {item.title && <b>{item.title}: </b>}
                        {item.link ? (
                            <a href={item.link} className="nb-link" target="_blank" rel="noopener noreferrer">{item.content}</a>
                        ) : (
                            <InlineMarkdown>{item.content}</InlineMarkdown>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
