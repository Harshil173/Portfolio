import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../layout/Section';
import { caseFiles } from '../../data/content';
import { useViewMode } from '../../hooks/useViewMode';
import React, { lazy, Suspense } from 'react';

const TazzoBikes = lazy(() => import('./TazzoBikes'));
const JioSaath = lazy(() => import('./JioSaath'));
const AiSaasSegmentation = lazy(() => import('./AiSaasSegmentation'));
const GujaratTourism = lazy(() => import('./GujaratTourism'));

const interactiveComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  'tazzo-bikes': TazzoBikes,
  'jiosaath': JioSaath,
  'ai-saas': AiSaasSegmentation,
  'gujarat-tourism': GujaratTourism,
};

export default function CaseFilesSection() {
  const [activeCase, setActiveCase] = useState(caseFiles[0].id);
  const { isDeep } = useViewMode();
  const currentCase = caseFiles.find((c) => c.id === activeCase)!;
  const InteractiveComponent = interactiveComponents[activeCase];

  return (
    <Section id="case-files">
      {/* Section header */}
      <p className="label mb-3">Case Files</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
        Four problems, four structured solutions
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl">
        Each case follows the Situation → Complication → Resolution → Impact framework. 
        Interact with the models to see the thinking behind the recommendations.
      </p>

      {/* Case tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {caseFiles.map((cf) => (
          <button
            key={cf.id}
            onClick={() => setActiveCase(cf.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeCase === cf.id
                ? 'bg-[var(--color-accent)] text-white shadow-sm'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {cf.title}
          </button>
        ))}
      </div>

      {/* Active case content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {/* Case header */}
          <div className="card mb-6">
            <p className="label mb-2">{currentCase.context}</p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
              {currentCase.headline}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentCase.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* SCRI breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-chart-1)] mb-1.5">Situation</p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{currentCase.situation}</p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-chart-2)] mb-1.5">Complication</p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{currentCase.complication}</p>
              </div>
              {isDeep && (
                <>
                  <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-chart-3)] mb-1.5">Resolution</p>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{currentCase.resolution}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-1.5">Impact</p>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{currentCase.impact}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Interactive module */}
          <Suspense
            fallback={
              <div className="interactive-module flex items-center justify-center h-48">
                <div className="text-[var(--color-text-tertiary)] text-sm">Loading interactive module…</div>
              </div>
            }
          >
            <InteractiveComponent />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
