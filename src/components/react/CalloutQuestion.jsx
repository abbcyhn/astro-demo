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
export default function CalloutQuestion({ title, children, link = null, isIconVisible = true }) {
  return (
    <div className="border-l-4 p-6 rounded-lg my-8 relative bg-blue-50 border-l-blue-500 dark:bg-blue-900/40 dark:border-l-blue-400">
      <div className="flex items-start gap-4">
        {/* Question Icon */}
        {isIconVisible && (
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-blue-500 dark:bg-blue-400">
            <span className="text-sm">❔</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 mt-0 text-blue-800 dark:text-blue-100">
            {title}
          </h3>
          
          <div className={`leading-relaxed text-blue-700 dark:text-blue-100 ${link ? 'mb-4' : ''}`}>
            {children}
          </div>

          {link && (
            <div className="flex items-center gap-2">
              <span className="text-base text-blue-600 dark:text-blue-200">→</span>
              <a href={link.href} className="underline font-medium text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-100">
                {link.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 