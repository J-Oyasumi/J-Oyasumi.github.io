import ReactMarkdown, { type Components } from 'react-markdown';

const link: Components['a'] = ({ href, children }) => (
  <a href={href} className="nb-link" target="_blank" rel="noopener noreferrer">{children}</a>
);

/** Markdown blocks (paragraphs, lists) in notebook styling. */
export function NotebookMarkdown({ children }: { children: string }) {
  return <ReactMarkdown components={{ a: link }}>{children}</ReactMarkdown>;
}

/** One line of markdown rendered inline: no wrapping <p>, so it can sit inside a list item. */
export function InlineMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown components={{ a: link, p: ({ children }) => <>{children}</> }}>
      {children}
    </ReactMarkdown>
  );
}
