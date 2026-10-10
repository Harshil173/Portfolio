import { useState } from 'react';
import { roiDefaults } from '../../data/content';
import { formatINR } from '../../utils/formatters';

export default function RoiEstimator() {
  const [processes, setProcesses] = useState(roiDefaults.manualProcesses);
  const [hoursPerProcess, setHoursPerProcess] = useState(roiDefaults.hoursPerWeekPerProcess);
  const [hourlyRate, setHourlyRate] = useState(roiDefaults.hourlyRate);

  const totalHoursPerWeek = processes * hoursPerProcess;
  const weeklySavings = totalHoursPerWeek * hourlyRate;
  const annualSavings = weeklySavings * 52;

  return (
    <div className="interactive-module">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold text-sm text-[var(--color-text-primary)]">Automation ROI Estimator</h4>
        <span className="illustrative-label">Illustrative model</span>
      </div>
      <p className="text-xs text-[var(--color-text-tertiary)] mb-5">
        Anchored to actual result: 10+ processes, ~15 hrs/week saved
      </p>

      <div className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-tertiary)] mb-1">Manual processes</label>
            <input
              type="number"
              className="input-field"
              value={processes}
              onChange={(e) => setProcesses(Math.max(1, Number(e.target.value)))}
              min="1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-tertiary)] mb-1">Hrs/wk each</label>
              <input
                type="number"
                className="input-field"
                value={hoursPerProcess}
                onChange={(e) => setHoursPerProcess(Math.max(0.1, Number(e.target.value)))}
                min="0.1"
                step="0.5"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-tertiary)] mb-1">₹/hour</label>
              <input
                type="number"
                className="input-field"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(1, Number(e.target.value)))}
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--color-border)] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--color-text-tertiary)]">Hours saved per week</span>
            <span className="font-mono text-sm font-bold text-[var(--color-accent)]">{totalHoursPerWeek.toFixed(1)} hrs</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--color-text-tertiary)]">Weekly savings</span>
            <span className="font-mono text-sm font-medium">{formatINR(Math.round(weeklySavings))}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--color-text-tertiary)]">Annual savings</span>
            <span className="font-mono text-lg font-bold text-[var(--color-success)]">{formatINR(Math.round(annualSavings))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
