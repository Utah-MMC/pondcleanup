import sanitizeHtml from 'sanitize-html';

export function sanitizeProductDescription(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p',
      'div',
      'span',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'h4',
      'blockquote',
      'code',
      'pre',
      'a',
      'img',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt'],
    },
    allowedSchemes: ['http', 'https', 'data'],
    // Strip all inline styles/classes from AliDrop HTML so it doesn't wreck layout
    allowedClasses: {},
    allowedStyles: {},
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'nofollow noopener', target: '_blank' }),
    },
    // Remove empty tags produced by overly-nested HTML
    exclusiveFilter(frame) {
      return frame.tag === 'div' && !frame.text.trim() && (!frame.attribs || Object.keys(frame.attribs).length === 0);
    },
  });
}


