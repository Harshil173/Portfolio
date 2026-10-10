import { kpis } from '../../data/content';
import { useCountUp } from '../../hooks/useCountUp';

function KpiCard({ value, suffix, prefix, label }: { value: number; suffix: string; prefix?: string; label: string }) {
  const { value: animatedValue, ref } = useCountUp(value, 2000);

  return (
    <div className="flex flex-col items-center text-center px-4 py-3" ref={ref as React.RefObject<HTMLDivElement>}>
      <span className="kpi-value">
        {prefix || ''}{animatedValue.toLocaleString('en-IN')}{suffix}
      </span>
      <span className="kpi-label">{label}</span>
    </div>
  );
}

export default function KpiStrip() {
  return (
    <div className="card !p-0 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[var(--color-border)]">
        {kpis.map((kpi, i) => (
          <KpiCard key={i} {...kpi} />
        ))}
      </div>
    </div>
  );
}
