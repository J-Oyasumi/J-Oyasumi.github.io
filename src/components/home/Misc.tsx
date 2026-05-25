'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

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
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="text-sm text-neutral-700 dark:text-neutral-400">
                        {item.title && (
                            <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                        )}
                        {item.link ? (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                            >
                                {item.content}
                            </a>
                        ) : (
                            <div>
                                <ReactMarkdown
                                    components={{
                                        p: ({ children }) => <p className="mb-0">{children}</p>,
                                        a: ({ ...props }) => (
                                            <a
                                                {...props}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-accent hover:underline"
                                            />
                                        ),
                                    }}
                                >
                                    {item.content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </motion.section>
    );
}

