'use client';

import { useMemo, useState } from 'react';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import { useMessages } from '@/lib/i18n/useMessages';
import { InlineMarkdown } from '@/components/ui/NotebookMarkdown';
import PublicationItem from './PublicationItem';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
}

// Search only earns its place once the list is long enough to need it.
const SEARCH_THRESHOLD = 6;

export default function PublicationsList({ config, publications, embedded = false }: PublicationsListProps) {
    const messages = useMessages();
    const [query, setQuery] = useState('');
    const Title = embedded ? 'h2' : 'h1';

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return publications;
        return publications.filter((pub) =>
            [pub.title, pub.venue, pub.journal, pub.conference, String(pub.year), ...pub.authors.map((a) => a.name)]
                .some((field) => field?.toLowerCase().includes(q))
        );
    }, [publications, query]);

    return (
        <section className="nb-section" id="publications" aria-labelledby="publications-h">
            <Title id="publications-h" className="nb-h2">{config.title}</Title>
            {config.description && <p className="nb-note"><InlineMarkdown>{config.description}</InlineMarkdown></p>}

            {publications.length >= SEARCH_THRESHOLD && (
                <input
                    type="search"
                    className="nb-search"
                    placeholder={messages.publications.searchPlaceholder}
                    aria-label={messages.publications.searchPlaceholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            )}

            {filtered.length === 0 ? (
                <p className="nb-meta">{messages.publications.noResults}</p>
            ) : (
                <div>
                    {filtered.map((pub) => <PublicationItem key={pub.id} pub={pub} />)}
                </div>
            )}
        </section>
    );
}
