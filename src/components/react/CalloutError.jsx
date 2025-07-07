/**
 * @typedef {Object} LinkProps
 * @property {string} href - The URL for the link
 * @property {string} text - The text to display for the link
 */

/**
 * @param {Object} props
 * @param {string} props.title - The title of the callout
 * @param {React.ReactNode} props.children - The content of the callout
 * @param {LinkProps|null} [props.link=null] - Optional link object
 */
export default function CalloutError({ title, children, link = null, isIconVisible = true }) {
  return (
    <div className="border-l-4 p-6 rounded-lg my-8 relative bg-red-50 border-l-red-500 dark:bg-red-900/40 dark:border-l-red-400">
      <div className="flex items-start gap-4">
        {/* Error Icon */}
        {isIconVisible && (
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-red-500 dark:bg-red-400">
            <span className="text-sm font-bold text-white dark:text-red-900">✕</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 mt-0 text-red-800 dark:text-red-100">
            {title}
          </h3>
          
          <div className={`leading-relaxed text-red-700 dark:text-red-100 ${link ? 'mb-4' : ''}`}>
            {children}
          </div>

          {link && (
            <div className="flex items-center gap-2">
              <span className="text-base text-red-600 dark:text-red-200">→</span>
              <a href={link.href} className="underline font-medium text-red-600 dark:text-red-200 hover:text-red-800 dark:hover:text-red-100">
                {link.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 