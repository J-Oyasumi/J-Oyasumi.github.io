'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from './FormattedBibTeXText';

// BibTeX fields are sometimes written without a scheme ("lab.github.io/project").
const withScheme = (url: string) => (/^[a-z]+:\/\//i.test(url) ? url : `https://${url}`);

export default function PublicationItem({ pub }: { pub: Publication }) {
    const messages = useMessages();
    const [showAbstract, setShowAbstract] = useState(false);
    const venue = pub.venue || pub.journal || pub.conference;

    const links = [
        pub.url && { label: messages.publications.paper, href: pub.url },
        pub.code && { label: messages.publications.code, href: pub.code },
        pub.website && { label: messages.publications.website, href: pub.website },
        pub.doi && { label: 'DOI', href: `https://doi.org/${pub.doi}` },
    ].filter(Boolean) as Array<{ label: string; href: string }>;

    return (
        <article className={pub.preview ? 'nb-pub' : 'nb-pub no-figure'}>
            {pub.preview && (
                <figure>
                    <Image src={`/papers/${pub.preview}`} alt={`${pub.title} teaser figure`} width={440} height={275} />
                </figure>
            )}
            <div>
                <h3><FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} /></h3>
                <p className="nb-authors">
                    {pub.authors.map((author, idx) => {
                        const name = `${author.name}${author.isCorresponding ? '*' : ''}${author.isCoAuthor ? '#' : ''}`;
                        return (
                            <span key={idx}>
                                {author.isHighlighted ? <span className="nb-me">{name}</span> : name}
                                {idx < pub.authors.length - 1 && ', '}
                            </span>
                        );
                    })}
                </p>
                <p className="nb-venue">
                    {venue && pub.year && venue.includes(String(pub.year)) ? venue : [venue, pub.year].filter(Boolean).join(', ')}
                </p>
                {pub.description && <p className="nb-desc">{pub.description}</p>}
                {(links.length > 0 || pub.abstract) && (
                    <p className="nb-pub-links">
                        {links.map((link) => (
                            <a key={link.label} href={withScheme(link.href)} target="_blank" rel="noopener noreferrer">
                                <span>{link.label}</span>
                            </a>
                        ))}
                        {pub.abstract && (
                            <button type="button" aria-expanded={showAbstract} onClick={() => setShowAbstract(!showAbstract)}>
                                <span>{messages.publications.abstract}</span>
                            </button>
                        )}
                    </p>
                )}
                {showAbstract && pub.abstract && <p className="nb-abstract">{pub.abstract}</p>}
            </div>
        </article>
    );
}
