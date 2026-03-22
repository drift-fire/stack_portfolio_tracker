'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownRight, Plus, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WatchlistStock, formatCurrency } from '@/lib/stock-data'

interface WatchlistPanelProps {
  stocks: WatchlistStock[]
}

export function WatchlistPanel({ stocks }: WatchlistPanelProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Watchlist
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
            <Plus className="h-3 w-3" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {stocks.map((stock) => {
          const isPositive = stock.change >= 0

          return (
            <div
              key={stock.id}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-card-foreground">
                    {stock.ticker}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[10px] px-1.5 py-0',
                      isPositive
                        ? 'border-success/30 text-success'
                        : 'border-destructive/30 text-destructive'
                    )}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="mr-0.5 h-2.5 w-2.5" />
                    ) : (
                      <ArrowDownRight className="mr-0.5 h-2.5 w-2.5" />
                    )}
                    {Math.abs(stock.changePercent).toFixed(2)}%
                  </Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {stock.name}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-card-foreground">
                  {formatCurrency(stock.price)}
                </p>
                <p
                  className={cn(
                    'text-xs',
                    isPositive ? 'text-success' : 'text-destructive'
                  )}
                >
                  {isPositive ? '+' : ''}
                  {formatCurrency(stock.change)}
                </p>
              </div>
            </div>
          )
        })}

        <Button variant="outline" className="w-full text-sm" size="sm">
          View All Watchlist
        </Button>
      </CardContent>
    </Card>
  )
}
