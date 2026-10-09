'use client';

import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import PublicationItem from '@/components/publications/PublicationItem';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();

    return (
        <section className="nb-section" id="selected-publications" aria-labelledby="selected-publications-h">
            <h2 id="selected-publications-h" className="nb-h2">{title || messages.home.selectedPublications}</h2>
            <div>
                {publications.map((pub) => <PublicationItem key={pub.id} pub={pub} />)}
            </div>
            <p className="nb-pub-links" style={{ marginTop: 16 }}>
                <Link href={enableOnePageMode ? '/#publications' : '/publications'}>
                    <span>{messages.home.viewAll} →</span>
                </Link>
            </p>
        </section>
    );
}
