import { useState } from 'react';
import Section from '../layout/Section';
import { siteConfig } from '../../data/content';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', problem: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Let's talk — ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Harshil,\n\n${formData.problem}\n\nBest,\n${formData.name}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="next-steps">
      <div className="max-w-2xl mx-auto text-center">
        <p className="label mb-3">Next Steps</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          Start a conversation
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-10">
          Whether it's a consulting opportunity, a project collaboration, or just a conversation about 
          data-driven problem-solving - I'd love to hear from you.
        </p>

        {/* Contact links */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="Send email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="LinkedIn profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="GitHub profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        {/* Short form */}
        <form onSubmit={handleSubmit} className="card text-left max-w-lg mx-auto">
          <p className="text-sm font-medium text-[var(--color-text-primary)] mb-4">
            What problem are you trying to solve?
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-tertiary)] mb-1" htmlFor="contact-name">
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                className="input-field"
                placeholder="Jane Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-tertiary)] mb-1" htmlFor="contact-problem">
                Brief description
              </label>
              <textarea
                id="contact-problem"
                className="input-field !h-24 resize-none"
                placeholder="We're looking for someone to help with..."
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Send via Email
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-12 text-xs text-[var(--color-text-tertiary)]">
          © {new Date().getFullYear()} Harshil Patadia · Built as a consulting engagement
        </p>
      </div>
    </Section>
  );
}
