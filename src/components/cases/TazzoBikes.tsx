import { useState } from 'react';
import {
  tazzoStrategicOptions,
  tazzoScoringLabels,
  porterForces,
  tazzoPhases,
} from '../../data/content';
import { formatRatio } from '../../utils/formatters';
import { useViewMode } from '../../hooks/useViewMode';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

export default function TazzoBikes() {
  const [peerSourcedPercent, setPeerSourcedPercent] = useState(20);
  const { isDeep } = useViewMode();

  // Cost ratio formula: linear interpolation from 3.0 at 0% to 1.6 at 100%
  const costRatio = 3.0 - (peerSourcedPercent / 100) * 1.4;
  const targetMet = costRatio < 2.0;

  const radarData = porterForces.map((f) => ({
    force: f.force,
    intensity: f.intensity,
    fullMark: 5,
  }));

  return (
    <div className="space-y-6">
      {/* Cost-to-Revenue Ratio Simulator */}
      <div className="interactive-module">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-[var(--color-text-primary)]">Cost-to-Revenue Ratio Simulator</h4>
          <span className="illustrative-label">Interactive model</span>
        </div>
        <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
          Adjust the fleet-sourcing mix to see how the cost ratio changes
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Slider */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Peer-sourced fleet: <span className="font-mono text-[var(--color-accent)] font-semibold">{peerSourcedPercent}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={peerSourcedPercent}
              onChange={(e) => setPeerSourcedPercent(Number(e.target.value))}
              className="w-full"
              aria-label="Peer-sourced fleet percentage"
            />
            <div className="flex justify-between text-xs text-[var(--color-text-tertiary)] mt-1">
              <span>0% (fully owned)</span>
              <span>100% (fully peer-sourced)</span>
            </div>

            {/* Visual bar showing the mix */}
            <div className="mt-4 h-8 rounded-md overflow-hidden flex">
              <div
                className="bg-[var(--color-chart-1)] transition-all duration-300 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${100 - peerSourcedPercent}%` }}
              >
                {100 - peerSourcedPercent > 15 && `Owned ${100 - peerSourcedPercent}%`}
              </div>
              <div
                className="bg-[var(--color-accent)] transition-all duration-300 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${peerSourcedPercent}%` }}
              >
                {peerSourcedPercent > 15 && `Peer ${peerSourcedPercent}%`}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-[var(--color-bg-tertiary)]">
            <p className="label mb-2">Cost-to-Revenue Ratio</p>
            <p className={`font-mono text-5xl font-bold ${targetMet ? 'text-[var(--color-success)]' : 'text-[var(--color-accent)]'}`}>
              {formatRatio(costRatio)}
            </p>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-2">
              Target: <span className="font-mono font-medium">&lt;2.00×</span>
            </p>
            {targetMet && (
              <p className="mt-2 text-sm font-medium text-[var(--color-success)]">
                ✓ Target achieved
              </p>
            )}
          </div>
        </div>
      </div>

      {isDeep && (
        <>
          {/* Scored Option Matrix */}
          <div className="interactive-module">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">Scored Option Matrix</h4>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-3 pr-4 text-[var(--color-text-tertiary)] font-medium text-xs uppercase tracking-wider">Criteria</th>
                    {tazzoStrategicOptions.map((opt) => (
                      <th key={opt.name} className="text-center py-3 px-3 font-medium text-xs uppercase tracking-wider" style={{ color: opt.color }}>
                        {opt.name}
                        {opt.recommended && <span className="block text-[var(--color-accent)] text-[10px] mt-0.5">★ Recommended</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(tazzoScoringLabels).map((key) => (
                    <tr key={key} className="border-b border-[var(--color-border)]/50">
                      <td className="py-2.5 pr-4 text-[var(--color-text-secondary)]">{tazzoScoringLabels[key]}</td>
                      {tazzoStrategicOptions.map((opt) => {
                        const score = opt.scores[key as keyof typeof opt.scores];
                        return (
                          <td key={opt.name} className="text-center py-2.5 px-3">
                            <div className="flex items-center justify-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="w-3 h-3 rounded-full transition-colors"
                                  style={{
                                    backgroundColor: i < score ? opt.color : 'var(--color-bg-tertiary)',
                                    opacity: i < score ? 1 : 0.4,
                                  }}
                                />
                              ))}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="font-semibold">
                    <td className="py-3 pr-4 text-[var(--color-text-primary)]">Total</td>
                    {tazzoStrategicOptions.map((opt) => {
                      const total = Object.values(opt.scores).reduce((a, b) => a + b, 0);
                      return (
                        <td key={opt.name} className="text-center py-3 px-3 font-mono" style={{ color: opt.color }}>
                          {total}/25
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Porter's Five Forces + Roadmap */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Porter's Radar */}
            <div className="interactive-module">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">Porter's Five Forces</h4>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="force" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} axisLine={false} />
                  <Radar
                    name="Intensity"
                    dataKey="intensity"
                    stroke="var(--color-accent)"
                    fill="var(--color-accent)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Phased Roadmap */}
            <div className="interactive-module">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">Phased Roadmap</h4>
              <div className="space-y-4">
                {tazzoPhases.map((phase, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: phase.color }}
                      >
                        {i + 1}
                      </div>
                      {i < tazzoPhases.length - 1 && (
                        <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: phase.color, opacity: 0.3 }} />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-semibold text-sm text-[var(--color-text-primary)]">{phase.title}</p>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
