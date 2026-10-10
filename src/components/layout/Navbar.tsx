import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useViewMode } from '../../hooks/useViewMode';
import { useTheme } from '../../hooks/useTheme';
import { navSections, siteConfig } from '../../data/content';

export default function Navbar() {
  const progress = useScrollProgress();
  const { viewMode, toggleViewMode } = useViewMode();
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  const handleKeyNav = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const currentIndex = navSections.findIndex((s) => s.id === activeSection);
      if (e.key === 'ArrowRight' && currentIndex < navSections.length - 1) {
        e.preventDefault();
        document.getElementById(navSections[currentIndex + 1].id)?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        document.getElementById(navSections[currentIndex - 1].id)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [activeSection]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNav);
    return () => window.removeEventListener('keydown', handleKeyNav);
  }, [handleKeyNav]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />

      {/* Navigation */}
      <nav
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--color-bg-primary)]/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <button
              onClick={() => scrollTo('executive-summary')}
              className="flex items-center gap-2 group"
              aria-label="Scroll to top"
            >
              <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                {siteConfig.name}
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === section.id
                      ? 'text-[var(--color-accent)] bg-[var(--color-accent-light)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                  }`}
                >
                  {section.shortLabel}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Skim/Deep toggle */}
              <button
                onClick={toggleViewMode}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
                aria-label={`Switch to ${viewMode === 'skim' ? 'detailed' : 'summary'} view`}
              >
                <span className={viewMode === 'skim' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)]'}>
                  30s
                </span>
                <span className="text-[var(--color-border-strong)]">/</span>
                <span className={viewMode === 'deep' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)]'}>
                  5min
                </span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-[var(--color-bg-tertiary)] transition-colors"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-[var(--color-bg-tertiary)] transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {isMobileMenuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[var(--color-bg-primary)]/98 backdrop-blur-md border-b border-[var(--color-border)]"
            >
              <div className="px-4 py-3 space-y-1">
                {navSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`block w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'text-[var(--color-accent)] bg-[var(--color-accent-light)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
                {/* Mobile skim/deep toggle */}
                <div className="pt-2 border-t border-[var(--color-border)]">
                  <button
                    onClick={toggleViewMode}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-[var(--color-text-secondary)]"
                  >
                    {viewMode === 'skim' ? '📋 Switch to detailed view (5 min read)' : '⚡ Switch to summary view (30s skim)'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
