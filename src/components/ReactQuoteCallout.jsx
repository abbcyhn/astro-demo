/**
 * @typedef {Object} LinkProps
 * @property {string} href - The URL for the link
 * @property {string} text - The text to display for the link
 */

/**
 * @param {Object} props
 * @param {string} props.title - The title of the callout
 * @param {React.ReactNode} props.children - The content of the callout
 * @param {string} [props.author] - The author of the quote
 * @param {LinkProps|null} [props.link=null] - Optional link object
 */
export default function ReactQuoteCallout({ title, children, author, link = null }) {
  return (
    <div className="border-l-4 p-6 rounded-lg my-8 relative bg-slate-50 border-l-slate-400 dark:bg-slate-800/50 dark:border-l-slate-500">
      <div className="flex items-start gap-4">
        {/* Quote Icon */}
        <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 dark:text-slate-500">
          <span className="text-2xl font-bold">"</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-semibold mb-3 mt-0 text-slate-800 dark:text-slate-200">
              {title}
            </h3>
          )}
          
          <div className={`leading-relaxed text-slate-700 dark:text-slate-300 italic ${link ? 'mb-4' : ''} ${author ? 'mb-3' : ''}`}>
            {children}
          </div>

          {author && (
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              — {author}
            </div>
          )}

          {link && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-base text-slate-500 dark:text-slate-400">→</span>
              <a href={link.href} className="underline font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                {link.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 