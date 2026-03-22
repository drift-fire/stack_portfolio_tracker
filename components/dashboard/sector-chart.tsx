'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { formatCurrency } from '@/lib/stock-data'

interface SectorData {
  name: string
  value: number
  percentage: string
}

interface SectorChartProps {
  data: SectorData[]
}

const SECTOR_COLORS: Record<string, string> = {
  Technology: 'oklch(0.55 0.15 250)',
  Finance: 'oklch(0.65 0.18 145)',
  Healthcare: 'oklch(0.70 0.15 45)',
  Energy: 'oklch(0.60 0.20 25)',
}

export function SectorChart({ data }: SectorChartProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Sector Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={SECTOR_COLORS[entry.name] || '#888'}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as SectorData
                    return (
                      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                        <p className="text-sm font-medium text-card-foreground">
                          {data.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(data.value)}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          {data.percentage}%
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                content={({ payload }) => (
                  <div className="mt-4 flex flex-wrap justify-center gap-4">
                    {payload?.map((entry) => (
                      <div key={entry.value} className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sector breakdown */}
        <div className="mt-4 space-y-3">
          {data.map((sector) => (
            <div key={sector.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: SECTOR_COLORS[sector.name] }}
                />
                <span className="text-sm text-card-foreground">{sector.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-card-foreground">
                  {sector.percentage}%
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  ({formatCurrency(sector.value)})
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
