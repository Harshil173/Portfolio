import { useState } from 'react';
import { jiosaathDefaults, jiosaathPilotPhases } from '../../data/content';
import { formatINR, formatNumber } from '../../utils/formatters';
import { useViewMode } from '../../hooks/useViewMode';

export default function JioSaath() {
  const [targetMarket, setTargetMarket] = useState(jiosaathDefaults.targetMarketHouseholds);
  const [monthlyArpu, setMonthlyArpu] = useState(jiosaathDefaults.monthlyArpu);
  const [penetration, setPenetration] = useState(jiosaathDefaults.penetrationPercent);
  const { isDeep } = useViewMode();

  const addressableHouseholds = Math.round(targetMarket * (penetration / 100));
  const annualRevenue = addressableHouseholds * monthlyArpu * 12;
  const revenueCr = annualRevenue / 10000000;
  const margin = jiosaathDefaults.marginPercent;
  const annualProfit = annualRevenue * (margin / 100);
  const profitCr = annualProfit / 10000000;

  return (
    <div className="space-y-6">
      {/* Market Sizing Calculator */}
      <div className="interactive-module">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-[var(--color-text-primary)]">Market Sizing Calculator</h4>
          <span className="illustrative-label">Interactive model</span>
        </div>
        <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
          Adjust assumptions to see how the revenue opportunity changes
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                Target Market (affluent elderly HHs)
              </label>
              <input
                type="text"
                className="input-field"
                value={formatNumber(targetMarket)}
                onChange={(e) => {
                  const num = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
                  if (!isNaN(num)) setTargetMarket(num);
                }}
                aria-label="Target market households"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                Monthly ARPU
              </label>
              <input
                type="text"
                className="input-field"
                value={`₹${monthlyArpu.toLocaleString('en-IN')}`}
                onChange={(e) => {
                  const num = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
                  if (!isNaN(num)) setMonthlyArpu(num);
                }}
                aria-label="Monthly ARPU in rupees"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Market Penetration: <span className="font-mono text-[var(--color-accent)] font-semibold">{penetration}%</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={penetration}
                onChange={(e) => setPenetration(Number(e.target.value))}
                className="w-full"
                aria-label="Market penetration percentage"
              />
              <div className="flex justify-between text-xs text-[var(--color-text-tertiary)] mt-1">
                <span>0.1%</span>
                <span>5%</span>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="space-y-4">
            <div className="p-5 rounded-lg bg-[var(--color-bg-tertiary)]">
              <p className="label mb-1">Annual Revenue Opportunity</p>
              <p className="font-mono text-4xl font-bold text-[var(--color-accent)]">
                ₹{revenueCr.toFixed(0)} Cr
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                {formatNumber(addressableHouseholds)} households × {formatINR(monthlyArpu)}/mo × 12
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <p className="label mb-1">Margin</p>
                <p className="font-mono text-2xl font-bold text-[var(--color-success)]">~{margin}%</p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <p className="label mb-1">Annual Profit</p>
                <p className="font-mono text-2xl font-bold text-[var(--color-success)]">
                  ₹{profitCr.toFixed(0)} Cr
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pilot Design */}
      {isDeep && (
        <div className="interactive-module">
          <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">1,000-Household Pilot Design</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {jiosaathPilotPhases.map((phase) => (
              <div key={phase.phase} className="relative p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold flex items-center justify-center">
                    {phase.phase}
                  </span>
                  <span className="font-semibold text-sm text-[var(--color-text-primary)]">{phase.title}</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{phase.description}</p>
                <p className="text-[10px] font-mono text-[var(--color-text-tertiary)] mt-2">{phase.duration}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
