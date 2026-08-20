import React from 'react';

/**
 * A deliberately small renderer for problem statements.
 *
 * Statements arrive as text carrying light markdown — `**bold**`, `` `code` ``
 * and blank-line paragraphs — and rendering them raw put literal asterisks in
 * front of candidates. This handles exactly those three things and nothing
 * else.
 *
 * It builds React nodes rather than setting innerHTML. Problem text is authored
 * by staff, but it is still content flowing into a page mid-exam, and a
 * renderer that cannot inject markup cannot be made to.
 */

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`)/g;

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(INLINE).filter(Boolean).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

const RichText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  if (!text) return null;
  // Blank lines separate paragraphs; single newlines are kept inside one.
  const paragraphs = text.split(/\n{2,}/);
  return (
    <div className={className}>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ margin: i === 0 ? '0 0 10px' : '10px 0' }}>
          {inline(p, String(i))}
        </p>
      ))}
    </div>
  );
};

export default RichText;
