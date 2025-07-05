export default function ReactInfoCallout({ title, children, link }) {
  return (
    <div className="border-l-4 p-6 rounded-lg my-8 relative bg-secondary border-l-accent">
      <div className="flex items-start gap-4">
        {/* Info Icon */}
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-accent">
          <span className="text-sm font-bold text-text">i</span>
          
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 mt-0 text-text">
            {title}
          </h3>
          
          <div className={`leading-relaxed text-text-secondary ${link ? 'mb-4' : ''}`}>
            {children}
          </div>

          {link && (
            <div className="flex items-center gap-2">
              <span className="text-base text-accent">→</span>
              <a href={link.href} className="underline font-medium text-accent">
                {link.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 