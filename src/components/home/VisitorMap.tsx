'use client';

import { useEffect, useRef } from 'react';

// Visitor-map widget (MapMyVisitors / ClustrMaps). These scripts render the map next to
// themselves and sometimes attach extra nodes to <body>; we load the script inside our
// framed box and pull any stray widget nodes back into it.
export default function VisitorMap({ src }: { src: string }) {
    const box = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = box.current;
        if (!container || container.querySelector('script')) return;

        const globe = src.includes('globe');
        const id = src.includes('mapmyvisitors') ? (globe ? 'mmvst_globe' : 'mapmyvisitors') : (globe ? 'clstr_globe' : 'clustrmaps');
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = true;
        container.appendChild(script);

        const observer = new MutationObserver(() => {
            document.querySelectorAll(`body > [id*="${id}"], body > iframe[src*="${id}"]`).forEach((node) => {
                if (node !== container && !node.contains(container)) container.appendChild(node);
            });
        });
        observer.observe(document.body, { childList: true });

        // The MapMyVisitors globe only starts its intro once it sees a scroll event while the
        // globe is *entirely* on screen, so it can stay blank. Nudge it when it comes into view,
        // and if it still hasn't revealed itself, show the (static) globe directly.
        let reveal: IntersectionObserver | undefined;
        const waitForGlobe = window.setInterval(() => {
            const outer = container.querySelector<HTMLElement>('.mmvst_outer');
            if (!outer) return;
            window.clearInterval(waitForGlobe);
            reveal = new IntersectionObserver((entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                window.dispatchEvent(new Event('scroll'));
                window.setTimeout(() => {
                    const inner = container.querySelector<HTMLElement>('.mmvst_inner');
                    const globe = container.querySelector<HTMLElement>('.mmvst_globe');
                    if (inner && getComputedStyle(inner).display === 'none') {
                        inner.style.display = 'block';
                        if (globe) Object.assign(globe.style, { opacity: '1', visibility: 'visible', transform: 'none' });
                    }
                }, 600);
                reveal?.disconnect();
            }, { threshold: 0.4 });
            reveal.observe(outer);
        }, 200);

        return () => {
            observer.disconnect();
            reveal?.disconnect();
            window.clearInterval(waitForGlobe);
        };
    }, [src]);

    return (
        <section className="nb-section nb-visitors" aria-label="Visitor map">
            <p className="nb-visitors-label nb-mono">Visitors</p>
            <div ref={box} className={src.includes('globe') ? 'nb-visitors-globe' : 'nb-visitors-map'} />
        </section>
    );
}
