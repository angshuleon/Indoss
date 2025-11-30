import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CashflowPoint } from "../types/charts";

interface Props {
  data: CashflowPoint[];
}

export function GenerationChart({ data }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-[#0A3F40]/10 shadow-md p-4 lg:p-5">
      <h3 className="text-sm font-semibold text-[#0A3F40] mb-1">
        Annual generation projection
      </h3>
      <p className="text-[11px] text-[#232323]/60 mb-3">
        Includes PV degradation over your analysis horizon.
      </p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10 }}
              tickMargin={6}
              label={{
                value: "Year",
                position: "insideBottomRight",
                offset: -4,
                fontSize: 11,
              }}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              tickMargin={6}
              label={{
                value: "kWh / year",
                angle: -90,
                position: "insideLeft",
                offset: 8,
                fontSize: 11,
              }}
            />
            <Tooltip
              formatter={(value: any) =>
                typeof value === "number" ? value.toFixed(0) + " kWh" : value
              }
              labelFormatter={(year) => `Year ${year}`}
            />
            <Line
              type="monotone"
              dataKey="gen"
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
