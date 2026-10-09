'use client';

import { InlineMarkdown } from '@/components/ui/NotebookMarkdown';
import OrgLogo from '@/components/home/OrgLogo';
import { formatPeriod, isoMonth, type Dated } from '@/lib/dates';

export interface EducationItem extends Dated {
    institution: string;
    degree: string;
    url?: string;
    image?: string;
    details?: string;
}

interface EducationProps {
    items: EducationItem[];
    title?: string;
}

export default function Education({ items, title = 'Education' }: EducationProps) {
    return (
        <section className="nb-section" id="education" aria-labelledby="education-h">
            <h2 id="education-h" className="nb-h2">{title}</h2>
            <ul className="nb-log">
                {items.map((item, index) => (
                    <li key={index}>
                        <time className="nb-when" dateTime={isoMonth(item)}>{formatPeriod(item)}</time>
                        <span className="nb-org">
                            <OrgLogo src={item.image} name={item.institution} />
                            <span className="nb-entry">
                                {item.url ? (
                                    <a href={item.url} className="nb-link" target="_blank" rel="noopener noreferrer"><b>{item.institution}</b></a>
                                ) : (
                                    <b>{item.institution}</b>
                                )}
                                <span className="nb-meta">{item.degree}</span>
                                {item.details && <span className="nb-meta"><InlineMarkdown>{item.details}</InlineMarkdown></span>}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
