import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../layout/Section';
import { skillGroups, caseFiles, roles } from '../../data/content';

// Build a map of IDs to display names
const nameMap: Record<string, string> = {};
caseFiles.forEach((cf) => { nameMap[cf.id] = cf.title; });
roles.forEach((r) => { nameMap[r.id] = `${r.title} @ ${r.company}`; });

export default function ToolkitSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState(skillGroups[0].category);

  const currentGroup = skillGroups.find((g) => g.category === activeGroup)!;
  const activeSkillData = currentGroup.skills.find((s) => s.name === activeSkill);

  return (
    <Section id="toolkit">
      <p className="label mb-3">Toolkit</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
        Skills mapped to where they created value
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl">
        Click a skill to see where it was applied across case files and roles.
      </p>

      {/* Group tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skillGroups.map((group) => (
          <button
            key={group.category}
            onClick={() => { setActiveGroup(group.category); setActiveSkill(null); }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeGroup === group.category
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
            }`}
          >
            {group.category}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {currentGroup.skills.map((skill) => (
          <button
            key={skill.name}
            onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
            className={`text-left p-4 rounded-lg border transition-all ${
              activeSkill === skill.name
                ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)] shadow-sm'
                : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-strong)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium text-sm ${
                activeSkill === skill.name ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'
              }`}>
                {skill.name}
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)] font-mono">
                {skill.usedIn.length}×
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Where used panel */}
      <AnimatePresence>
        {activeSkillData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="card">
              <p className="label mb-2">
                Where "{activeSkillData.name}" was applied
              </p>
              <div className="flex flex-wrap gap-2">
                {activeSkillData.usedIn.map((id) => (
                  <a
                    key={id}
                    href={`#${id === roles.find((r) => r.id === id)?.id ? 'experience' : 'case-files'}`}
                    className="tag-accent tag"
                  >
                    {nameMap[id] || id}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
