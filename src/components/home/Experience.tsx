'use client';

import { InlineMarkdown } from '@/components/ui/NotebookMarkdown';
import OrgLogo from '@/components/home/OrgLogo';
import { formatPeriod, isoMonth, type Dated } from '@/lib/dates';

export interface ExperienceItem extends Dated {
    institution: string;
    position: string;
    advisor?: string;
    image?: string;
}

interface ExperienceProps {
    items: ExperienceItem[];
    title?: string;
}

export default function Experience({ items, title = 'Experience' }: ExperienceProps) {
    return (
        <section className="nb-section" id="experience" aria-labelledby="experience-h">
            <h2 id="experience-h" className="nb-h2">{title}</h2>
            <ul className="nb-log">
                {items.map((item, index) => (
                    <li key={index}>
                        <time className="nb-when" dateTime={isoMonth(item)}>{formatPeriod(item)}</time>
                        <span className="nb-org">
                            <OrgLogo src={item.image} name={item.institution} />
                            <span className="nb-entry">
                                <b>{item.institution}</b> — {item.position}
                                {item.advisor && <span className="nb-meta">advised by <InlineMarkdown>{item.advisor}</InlineMarkdown></span>}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
