'use client';

import Image from 'next/image';
import SocialLinks from '@/components/home/SocialLinks';
import VisitorMap from '@/components/home/VisitorMap';
import { NotebookMarkdown } from '@/components/ui/NotebookMarkdown';
import SelectedPublications from '@/components/home/SelectedPublications';
import News, { NewsItem } from '@/components/home/News';
import Experience, { ExperienceItem } from '@/components/home/Experience';
import Education, { EducationItem } from '@/components/home/Education';
import Misc, { MiscItem } from '@/components/home/Misc';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import type { SiteConfig } from '@/lib/config';
import { Publication } from '@/types/publication';
import { CardPageConfig, PublicationPageConfig, TextPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list' | 'experience' | 'education' | 'misc';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: NewsItem[];
  experienceItems?: ExperienceItem[];
  educationItems?: EducationItem[];
  miscItems?: MiscItem[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'publication'; id: string; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  enableOnePageMode?: boolean;
  researchInterests?: string[];
  callout?: string;
  pagesToShow: PageData[];
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const data = dataByLocale[locale] || fallback;

  if (!data) {
    return null;
  }

  return (
    <div className="nb-wrap nb-page">
      {data.pagesToShow.map((page) => {
        if (page.type !== 'about') {
          return (
            <div key={page.id} id={page.id} className="nb-section scroll-mt-8">
              {page.type === 'publication' && (
                <PublicationsList config={page.config} publications={page.publications} embedded={true} />
              )}
              {page.type === 'text' && <TextPage config={page.config} content={page.content} embedded={true} />}
              {page.type === 'card' && <CardPage config={page.config} embedded={true} />}
            </div>
          );
        }

        // The first markdown section is the bio; it sits beside the profile column.
        const bio = page.sections.find((section) => section.type === 'markdown');
        const rest = page.sections.filter((section) => section !== bio);

        return (
          <div key={page.id} id={page.id}>
            <section className="nb-about" aria-label={bio?.title || 'About'}>
              <aside className="nb-profile">
                <figure className="nb-photo">
                  <Image src={data.author.avatar} alt={`Portrait of ${data.author.name}`} width={464} height={580} priority />
                </figure>
                {data.researchInterests && data.researchInterests.length > 0 && (
                  <dl className="nb-interests nb-mono">
                    <dt>Research interests</dt>
                    {data.researchInterests.map((interest) => <dd key={interest}><span>{interest}</span></dd>)}
                  </dl>
                )}
                {data.callout && <p className="nb-callout">{data.callout}</p>}
              </aside>
              <div className="nb-bio">
                {bio?.content && <NotebookMarkdown>{bio.content}</NotebookMarkdown>}
              </div>
            </section>

            <SocialLinks social={data.social} />

            {rest.length > 0 && <hr className="nb-rule" />}

            {rest.map((section: SectionConfig) => {
              switch (section.type) {
                case 'publications':
                  return (
                    <SelectedPublications
                      key={section.id}
                      publications={section.publications || []}
                      title={section.title}
                      enableOnePageMode={data.enableOnePageMode}
                    />
                  );
                case 'list':
                  return <News key={section.id} items={section.items || []} title={section.title} />;
                case 'experience':
                  return <Experience key={section.id} items={section.experienceItems || []} title={section.title} />;
                case 'education':
                  return <Education key={section.id} items={section.educationItems || []} title={section.title} />;
                case 'misc':
                  return <Misc key={section.id} items={section.miscItems || []} title={section.title} />;
                case 'markdown':
                  return (
                    <section key={section.id} className="nb-section nb-bio">
                      {section.title && <h2 className="nb-h2">{section.title}</h2>}
                      <NotebookMarkdown>{section.content || ''}</NotebookMarkdown>
                    </section>
                  );
                default:
                  return null;
              }
            })}
          </div>
        );
      })}
      {data.features.visitor_map && <VisitorMap src={data.features.visitor_map} />}
    </div>
  );
}
