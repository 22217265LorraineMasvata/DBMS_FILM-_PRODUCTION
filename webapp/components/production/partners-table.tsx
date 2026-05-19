import type { PartnerRow } from "@/lib/db/production";

function formatMoney(value: string | null): string {
  if (!value) return "—";
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function PartnersTable({
  rows,
  label,
}: {
  rows: PartnerRow[];
  label: string;
}) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No {label.toLowerCase()} found in the <code>production</code> table.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs uppercase text-muted-foreground">
            <th className="py-2 pr-3 font-medium">{label}</th>
            <th className="py-2 pr-3 font-medium">Films</th>
            <th className="py-2 pr-3 font-medium">Active</th>
            <th className="py-2 pr-3 font-medium text-right">Total budget</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b last:border-b-0">
              <td className="py-3 pr-3 font-medium">{row.name}</td>
              <td className="py-3 pr-3">{row.total_films}</td>
              <td className="py-3 pr-3 text-muted-foreground">
                {row.active_films}
              </td>
              <td className="py-3 pr-3 text-right font-mono text-xs">
                {formatMoney(row.total_budget)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
