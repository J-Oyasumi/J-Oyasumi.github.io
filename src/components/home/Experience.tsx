'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export interface ExperienceItem {
    institution: string;
    position: string;
    date: string;
    advisor?: string;
    image?: string;
}

interface ExperienceProps {
    items: ExperienceItem[];
    title?: string;
}

export default function Experience({ items, title = 'Experience' }: ExperienceProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-6">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800"
                    >
                        <div className="flex gap-6">
                            {/* Left: Institution Image */}
                            {item.image && (
                                <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.institution}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            
                            {/* Right: Position, Date, Advisor */}
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold text-primary mb-1">
                                    {item.position}
                                </h3>
                                <p className="text-lg text-accent font-medium mb-2">
                                    {item.institution}
                                </p>
                                <div className="space-y-1">
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {item.date}
                                    </p>
                                    {item.advisor && (
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Advisor: {item.advisor}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}



