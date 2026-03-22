'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PortfolioHistoryPoint, formatCurrency } from '@/lib/stock-data'

interface PerformanceChartProps {
  data: PortfolioHistoryPoint[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const firstValue = data[0]?.value || 0
  const lastValue = data[data.length - 1]?.value || 0
  const totalChange = lastValue - firstValue
  const totalChangePercent = ((totalChange / firstValue) * 100).toFixed(1)
  const isPositive = totalChange >= 0

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Portfolio Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">Last 6 months</p>
          </div>
          <Badge
            className={
              isPositive
                ? 'border-success/30 bg-success/10 text-success'
                : 'border-destructive/30 bg-destructive/10 text-destructive'
            }
          >
            <TrendingUp className="mr-1 h-3 w-3" />
            {isPositive ? '+' : ''}
            {totalChangePercent}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                tickFormatter={(value) =>
                  `₹${(value / 1000).toFixed(0)}K`
                }
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: 'var(--card-foreground)',
                }}
                labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                itemStyle={{ color: 'var(--foreground)' }}
                formatter={(value: number) => [formatCurrency(value), 'Value']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

