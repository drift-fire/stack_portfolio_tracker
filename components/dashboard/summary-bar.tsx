'use client'

import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, IndianRupee, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatCurrency, formatNumber } from '@/lib/stock-data'

interface SummaryBarProps {
  totalInvested: number
  currentValue: number
  totalGainLoss: number
  totalGainLossPercent: number
  dayChange: number
  dayChangePercent: number
}

export function SummaryBar({
  totalInvested,
  currentValue,
  totalGainLoss,
  totalGainLossPercent,
  dayChange,
  dayChangePercent,
}: SummaryBarProps) {
  const isGain = totalGainLoss >= 0
  const isDayGain = dayChange >= 0

  const summaryCards = [
    {
      label: 'Total Invested',
      value: formatCurrency(totalInvested),
      icon: Wallet,
      change: null,
      changeLabel: null,
    },
    {
      label: 'Current Value',
      value: formatCurrency(currentValue),
      icon: IndianRupee,
      change: null,
      changeLabel: null,
    },
    {
      label: 'Total Gain/Loss',
      value: formatCurrency(Math.abs(totalGainLoss)),
      icon: TrendingUp,
      change: totalGainLossPercent,
      changeLabel: `${isGain ? '+' : '-'}${formatNumber(Math.abs(totalGainLossPercent))}%`,
      isPositive: isGain,
    },
    {
      label: "Day's Change",
      value: formatCurrency(Math.abs(dayChange)),
      icon: Clock,
      change: dayChangePercent,
      changeLabel: `${isDayGain ? '+' : '-'}${formatNumber(Math.abs(dayChangePercent))}%`,
      isPositive: isDayGain,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card) => (
        <Card
          key={card.label}
          className="relative overflow-hidden border-border bg-card p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {card.label}
              </p>
              <p className="mt-1 text-2xl font-semibold text-card-foreground">
                {card.value}
              </p>
              {card.change !== null && (
                <div
                  className={cn(
                    'mt-2 flex items-center gap-1 text-sm font-medium',
                    card.isPositive ? 'text-success' : 'text-destructive'
                  )}
                >
                  {card.isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span>{card.changeLabel}</span>
                </div>
              )}
            </div>
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg',
                card.change !== null
                  ? card.isPositive
                    ? 'bg-success/10 text-success'
                    : 'bg-destructive/10 text-destructive'
                  : 'bg-primary/10 text-primary'
              )}
            >
              <card.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
