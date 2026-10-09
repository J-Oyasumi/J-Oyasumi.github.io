import Image from 'next/image';

// Small institution logo pasted beside an entry, framed like the paper thumbnails.
export default function OrgLogo({ src, name }: { src?: string; name: string }) {
    if (!src) return null;
    return (
        <span className="nb-logo">
            <Image src={src} alt={`${name} logo`} width={80} height={80} />
        </span>
    );
}
