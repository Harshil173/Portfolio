import { motion } from 'framer-motion';
import Section from '../layout/Section';
import React from 'react';
import { education, achievements } from '../../data/content';

const iconMap: Record<string, React.ReactNode> = {
  trophy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  certificate: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="14" rx="2" /><path d="M3 7h18" /><path d="M7 3v4" /><path d="M17 3v4" />
      <path d="M10 13h4" /><path d="M12 17v4" /><path d="M8 21h8" />
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  rocket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CredentialsSection() {
  return (
    <Section id="credentials">
      <p className="label mb-3">Credentials & Recognition</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-10">
        Academic foundation and competitive track record
      </h2>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Education */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-4">Education</h3>
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {education.map((edu, i) => (
              <motion.div key={i} variants={itemVariants} className="card">
                <h4 className="font-semibold text-[var(--color-text-primary)]">{edu.degree}</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{edu.institution}</p>
                {edu.campus && <p className="text-xs text-[var(--color-text-tertiary)]">{edu.campus}</p>}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs font-mono text-[var(--color-text-tertiary)]">{edu.period}</span>
                  {edu.grade && (
                    <>
                      <span className="text-[var(--color-border)]">·</span>
                      <span className="text-xs font-mono font-medium text-[var(--color-accent)]">{edu.grade}</span>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-4">Achievements</h3>
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {achievements.map((ach, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-start gap-3 card">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center shrink-0">
                  {iconMap[ach.icon]}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--color-text-primary)]">{ach.title}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{ach.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
