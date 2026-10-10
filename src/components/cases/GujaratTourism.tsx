import { useState, useMemo } from 'react';
import { tourismInvestments, type TourismInvestment } from '../../data/content';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const categories = ['All', ...Array.from(new Set(tourismInvestments.map((t) => t.category)))];
const regions = ['All', ...Array.from(new Set(tourismInvestments.map((t) => t.region)))];

export default function GujaratTourism() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  const filtered = useMemo(() => {
    return tourismInvestments
      .filter((t) => categoryFilter === 'All' || t.category === categoryFilter)
      .filter((t) => regionFilter === 'All' || t.region === regionFilter)
      .sort((a, b) => b.priorityScore - a.priorityScore);
  }, [categoryFilter, regionFilter]);

  const totalInvestment = filtered.reduce((sum, t) => sum + t.investmentCr, 0);

  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((t) => {
      map.set(t.category, (map.get(t.category) || 0) + t.investmentCr);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [filtered]);

  const colors = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-3)', 'var(--color-chart-4)', 'var(--color-chart-5)'];

  const statusColors: Record<string, string> = {
    'Approved': 'var(--color-success)',
    'In Progress': 'var(--color-chart-1)',
    'Proposed': 'var(--color-text-tertiary)',
  };

  return (
    <div className="interactive-module">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold text-[var(--color-text-primary)]">Investment Priority Dashboard</h4>
        <span className="illustrative-label">Illustrative data</span>
      </div>
      <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
        Filter by category and region to explore the ₹6,500 Cr portfolio
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-tertiary)] mb-1">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field !w-auto !py-1.5 !px-3 text-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-tertiary)] mb-1">Region</label>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="input-field !w-auto !py-1.5 !px-3 text-sm"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <div className="p-2 px-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <span className="text-xs text-[var(--color-text-tertiary)]">Total: </span>
            <span className="font-mono font-bold text-[var(--color-accent)]">₹{totalInvestment.toLocaleString('en-IN')} Cr</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar chart by category */}
        <div>
          <p className="label mb-3">Investment by Category (₹ Cr)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData} layout="vertical" margin={{ left: 10, right: 10 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} tickLine={false} axisLine={false} width={90} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {categoryData.map((_entry, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ranked list */}
        <div>
          <p className="label mb-3">Priority Ranking</p>
          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {filtered.map((item, i) => (
              <InvestmentRow key={item.id} item={item} rank={i + 1} statusColors={statusColors} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestmentRow({
  item,
  rank,
  statusColors,
}: {
  item: TourismInvestment;
  rank: number;
  statusColors: Record<string, string>;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors">
      <span className="font-mono text-xs text-[var(--color-text-tertiary)] mt-0.5 w-5 text-right shrink-0">
        {rank}.
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{item.project}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-[var(--color-text-tertiary)]">{item.region}</span>
          <span className="text-[var(--color-border)]">·</span>
          <span className="font-mono text-xs font-medium text-[var(--color-accent)]">₹{item.investmentCr} Cr</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="font-mono text-sm font-bold text-[var(--color-chart-1)]">{item.priorityScore}</span>
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ color: statusColors[item.status], backgroundColor: `${statusColors[item.status]}15` }}>
          {item.status}
        </span>
      </div>
    </div>
  );
}
