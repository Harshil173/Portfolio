import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../layout/Section';
import { roles } from '../../data/content';
import { useViewMode } from '../../hooks/useViewMode';
import PricingPlayground from './PricingPlayground';
import RoiEstimator from './RoiEstimator';

export default function ExperienceSection() {
  const [expandedRole, setExpandedRole] = useState<string | null>(roles[0].id);
  const { isDeep } = useViewMode();

  return (
    <Section id="experience">
      <p className="label mb-3">Operator Experience</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
        Three roles, one thread: making operations smarter with data and AI
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-10 max-w-2xl">
        Each role is framed as what the business needed, what I did, and the result delivered.
      </p>

      {/* Timeline */}
      <div className="space-y-4 mb-12">
        {roles.map((role) => {
          const isExpanded = expandedRole === role.id;
          return (
            <div key={role.id} className="card cursor-pointer group" onClick={() => setExpandedRole(isExpanded ? null : role.id)}>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {role.title}
                    </h3>
                    <span className="text-[var(--color-text-tertiary)]">·</span>
                    <span className="text-sm text-[var(--color-text-secondary)]">{role.company}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-tertiary)] mt-0.5 font-mono">{role.period}</p>
                </div>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-tertiary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 shrink-0"
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* Need */}
                        <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-chart-1)] mb-2">What the business needed</p>
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{role.businessNeed}</p>
                        </div>

                        {/* Did */}
                        <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-2">What I did</p>
                          <ul className="text-sm text-[var(--color-text-secondary)] space-y-1.5">
                            {role.whatIDid.map((item, i) => (
                              <li key={i} className="leading-relaxed flex gap-2">
                                <span className="text-[var(--color-accent)] shrink-0 mt-1">›</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Result */}
                        <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-success)] mb-2">Result</p>
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{role.result}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Interactive modules */}
      {isDeep && (
        <div className="grid md:grid-cols-2 gap-6">
          <PricingPlayground />
          <RoiEstimator />
        </div>
      )}
    </Section>
  );
}
