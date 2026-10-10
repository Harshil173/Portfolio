import { useState } from 'react';
import { pricingDefaults } from '../../data/content';
import { formatINR } from '../../utils/formatters';

export default function PricingPlayground() {
  const [minutes, setMinutes] = useState(pricingDefaults.callMinutesPerMonth);
  const [costPerMin, setCostPerMin] = useState(pricingDefaults.costPerMinute);

  const monthlyCost = minutes * costPerMin;
  const markup = pricingDefaults.markupMultiplier;
  const suggestedPrice = monthlyCost * markup;
  const margin = ((suggestedPrice - monthlyCost) / suggestedPrice) * 100;
  const pricePerMin = suggestedPrice / minutes;

  return (
    <div className="interactive-module">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold text-sm text-[var(--color-text-primary)]">AI Call Pricing Playground</h4>
        <span className="illustrative-label">Illustrative model</span>
      </div>
      <p className="text-xs text-[var(--color-text-tertiary)] mb-5">
        Based on per-minute cost analysis for client proposals
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-tertiary)] mb-1">Calls/month (min)</label>
            <input
              type="number"
              className="input-field"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(1, Number(e.target.value)))}
              min="1"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-tertiary)] mb-1">Cost/min (₹)</label>
            <input
              type="number"
              className="input-field"
              value={costPerMin}
              onChange={(e) => setCostPerMin(Math.max(0.1, Number(e.target.value)))}
              min="0.1"
              step="0.5"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--color-border)] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--color-text-tertiary)]">Monthly cost</span>
            <span className="font-mono text-sm font-medium">{formatINR(Math.round(monthlyCost))}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--color-text-tertiary)]">Suggested price ({markup}× markup)</span>
            <span className="font-mono text-sm font-bold text-[var(--color-accent)]">{formatINR(Math.round(suggestedPrice))}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--color-text-tertiary)]">Margin</span>
            <span className="font-mono text-sm font-medium text-[var(--color-success)]">{margin.toFixed(0)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--color-text-tertiary)]">Price per minute</span>
            <span className="font-mono text-sm font-medium">₹{pricePerMin.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
