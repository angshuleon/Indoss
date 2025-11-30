import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { CashflowPoint } from "../types/charts";
import { formatCurrency } from "../utils/formatCurrency"; // we’ll add this

interface Props {
  data: CashflowPoint[];
}

export function SavingsChart({ data }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-[#0A3F40]/10 shadow-md p-4 lg:p-5">
      <h3 className="text-sm font-semibold text-[#0A3F40] mb-1">
        Savings & cumulative payback
      </h3>
      <p className="text-[11px] text-[#232323]/60 mb-3">
        How your yearly savings and total cashflow evolve over time.
      </p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10 }}
              tickMargin={6}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              tickMargin={6}
            />
            <Tooltip
              formatter={(value: any, key) => {
                if (typeof value !== "number") return value;
                const label = key === "savings" ? "Savings" : "Cumulative";
                return [formatCurrency(value), label];
              }}
              labelFormatter={(year) => `Year ${year}`}
            />
            <Legend
              wrapperStyle={{ fontSize: 10 }}
              verticalAlign="top"
              height={20}
            />
            <Line
              type="monotone"
              dataKey="savings"
              name="Yearly savings"
              stroke="#F6921E"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="cumulative"
              name="Cumulative cashflow"
              stroke="#0A3F40"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
