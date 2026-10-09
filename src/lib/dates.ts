// One date style for the whole site: content files say "2025-09" / "present",
// the page shows "Sep 2025" / "Present".

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2025-09" or "2025.09" -> "Sep 2025"; "present" -> "Present"; "2025" or free text is kept as written. */
export function formatMonth(value: string): string {
    const v = value.trim();
    if (/^present$/i.test(v)) return 'Present';
    const m = /^(\d{4})[-./](\d{1,2})$/.exec(v);
    if (!m) return v;
    const month = MONTHS[Number(m[2]) - 1];
    return month ? `${month} ${m[1]}` : v;
}

export interface Dated {
    start?: string;
    end?: string;
    /** Older single-field form, e.g. "2025-07 - Present"; still understood. */
    date?: string;
}

/** start/end -> "Sep 2025 – Present"; start only -> "Sep 2025". */
export function formatPeriod({ start, end, date }: Dated): string {
    if (start) return end ? `${formatMonth(start)} – ${formatMonth(end)}` : formatMonth(start);
    if (!date) return '';
    const parts = date.split(/\s+[-–]\s+/);
    return parts.map(formatMonth).join(' – ');
}

/** Machine-readable value for <time dateTime>, when the start is a plain year-month. */
export function isoMonth({ start, date }: Dated): string | undefined {
    const v = (start || date || '').trim();
    const m = /^(\d{4})[-./](\d{1,2})/.exec(v);
    return m ? `${m[1]}-${m[2].padStart(2, '0')}` : undefined;
}
