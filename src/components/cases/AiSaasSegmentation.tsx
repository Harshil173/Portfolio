import { useState } from 'react';
import { industryClusterData, type IndustryCluster } from '../../data/content';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts';

const quadrantColors: Record<string, string> = {
  target: 'var(--color-chart-2)',
  optimise: 'var(--color-chart-1)',
  evangelise: 'var(--color-chart-3)',
  educate: 'var(--color-chart-4)',
};

const quadrantLabels: Record<string, string> = {
  target: '★ Primary Target',
  optimise: 'Optimise',
  evangelise: 'Evangelise',
  educate: 'Educate',
};

export default function AiSaasSegmentation() {
  const [selectedCluster, setSelectedCluster] = useState<IndustryCluster | null>(null);

  return (
    <div className="space-y-6">
      <div className="interactive-module">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-[var(--color-text-primary)]">Industry Segmentation Map</h4>
          <span className="illustrative-label">Illustrative visualisation</span>
        </div>
        <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
          Click an industry bubble to see go-to-market recommendations. Segments with high AI adoption but weak cost governance are the primary targets.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="aiAdoption"
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }}
                  tickLine={false}
                >
                  <Label value="AI Adoption Score →" offset={-20} position="insideBottom" style={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                </XAxis>
                <YAxis
                  type="number"
                  dataKey="costGovernance"
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }}
                  tickLine={false}
                >
                  <Label value="Cost Governance →" angle={-90} position="insideLeft" style={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} offset={-5} />
                </YAxis>
                <ReferenceLine x={50} stroke="var(--color-border-strong)" strokeDasharray="6 4" />
                <ReferenceLine y={50} stroke="var(--color-border-strong)" strokeDasharray="6 4" />
                <Scatter
                  data={industryClusterData}
                  cursor="pointer"
                  onClick={(data: any) => setSelectedCluster(data)}
                >
                  {industryClusterData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={quadrantColors[entry.quadrant]}
                      r={Math.sqrt(entry.size) * 2}
                      fillOpacity={selectedCluster?.id === entry.id ? 1 : 0.7}
                      stroke={selectedCluster?.id === entry.id ? 'var(--color-text-primary)' : 'none'}
                      strokeWidth={2}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              {Object.entries(quadrantLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs text-[var(--color-text-tertiary)]">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: quadrantColors[key] }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="space-y-3">
            {selectedCluster ? (
              <div className="p-5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: quadrantColors[selectedCluster.quadrant] }} />
                  <h5 className="font-semibold text-[var(--color-text-primary)]">{selectedCluster.industry}</h5>
                </div>
                <p className="text-xs font-medium text-[var(--color-text-tertiary)] mb-3 uppercase tracking-wider">
                  {quadrantLabels[selectedCluster.quadrant]}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center p-2 rounded bg-[var(--color-bg-secondary)]">
                    <p className="font-mono text-lg font-bold text-[var(--color-chart-1)]">{selectedCluster.aiAdoption}</p>
                    <p className="text-[10px] text-[var(--color-text-tertiary)]">AI Adoption</p>
                  </div>
                  <div className="text-center p-2 rounded bg-[var(--color-bg-secondary)]">
                    <p className="font-mono text-lg font-bold text-[var(--color-chart-3)]">{selectedCluster.costGovernance}</p>
                    <p className="text-[10px] text-[var(--color-text-tertiary)]">Cost Gov.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-accent)] mb-0.5">Pricing</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{selectedCluster.recommendation.pricing}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-chart-1)] mb-0.5">Spend Visibility</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{selectedCluster.recommendation.spendVisibility}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-success)] mb-0.5">ROI Angle</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{selectedCluster.recommendation.roi}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-lg bg-[var(--color-bg-tertiary)] border border-dashed border-[var(--color-border)] flex flex-col items-center justify-center h-full min-h-[200px]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p className="text-sm text-[var(--color-text-tertiary)] mt-2 text-center">
                  Click an industry bubble to see go-to-market recommendations
                </p>
              </div>
            )}

            {/* Industry list */}
            <div className="space-y-1.5 max-h-[280px] overflow-y-auto">
              {industryClusterData.map((cluster) => (
                <button
                  key={cluster.id}
                  onClick={() => setSelectedCluster(cluster)}
                  className={`w-full text-left px-3 py-2 rounded text-xs flex items-center justify-between transition-colors ${
                    selectedCluster?.id === cluster.id
                      ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]'
                      : 'hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: quadrantColors[cluster.quadrant] }} />
                    {cluster.industry}
                  </span>
                  <span className="font-mono text-[10px]">{cluster.aiAdoption}/{cluster.costGovernance}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
