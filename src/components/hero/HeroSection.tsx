import { motion } from 'framer-motion';
import Section from '../layout/Section';
import KpiStrip from './KpiStrip';
import { siteConfig } from '../../data/content';
import { useViewMode } from '../../hooks/useViewMode';

export default function HeroSection() {
  const { isDeep } = useViewMode();

  return (
    <Section id="executive-summary" className="!pt-28 md:!pt-36">
      {/* Eyebrow */}
      <motion.div
        className="flex items-center flex-wrap gap-3 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="label m-0">Executive Summary</p>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-transparent">
          {siteConfig.credentialChip}
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[var(--color-text-primary)] max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {siteConfig.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-6 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {siteConfig.subtitle}
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="mt-8 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <a href={siteConfig.cvUrl} className="btn-primary" download>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>
        <a href={`mailto:${siteConfig.email}?subject=Let's talk`} className="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Book a Conversation
        </a>
      </motion.div>

      {/* KPI Strip */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <KpiStrip />
      </motion.div>

      {/* Extended summary for deep mode */}
      {isDeep && (
        <motion.div
          className="mt-12 pt-8 border-t border-[var(--color-border)]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="label mb-3">The Engagement</p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
            This site is structured as a consulting engagement. Each section presents findings in the way 
            a consulting team would: answer first, then evidence. Navigate through case files that demonstrate 
            structured problem-solving, explore interactive models that show how I think about data, and review 
            the operational experience behind each insight. Use the{' '}
            <span className="font-semibold text-[var(--color-text-primary)]">30s / 5min toggle</span> to control 
            the depth of detail, or{' '}
            <span className="font-semibold text-[var(--color-text-primary)]">← → arrow keys</span> to navigate 
            between sections.
          </p>
        </motion.div>
      )}
    </Section>
  );
}
