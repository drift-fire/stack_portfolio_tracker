'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { SummaryBar } from '@/components/dashboard/summary-bar'
import { HoldingsTable } from '@/components/dashboard/holdings-table'
import { SectorChart } from '@/components/dashboard/sector-chart'
import { PerformanceChart } from '@/components/dashboard/performance-chart'
import { WatchlistPanel } from '@/components/dashboard/watchlist-panel'
import {
  stocks,
  getPortfolioSummary,
  getSectorAllocation,
  portfolioHistory,
  watchlistStocks,
} from '@/lib/stock-data'
import { RefreshCw, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const summary = getPortfolioSummary(stocks)
  const sectorData = getSectorAllocation(stocks)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 transition-all duration-300 peer-[[data-collapsed=true]]:ml-16">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Portfolio Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your investments in real-time
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Mar 22, 2026</span>
            </Button>
            <Button size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Summary Cards */}
          <SummaryBar
            totalInvested={summary.totalInvested}
            currentValue={summary.totalCurrentValue}
            totalGainLoss={summary.totalGainLoss}
            totalGainLossPercent={summary.totalGainLossPercent}
            dayChange={summary.totalDayChange}
            dayChangePercent={summary.totalDayChangePercent}
          />

          {/* Charts Row */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PerformanceChart data={portfolioHistory} />
            <SectorChart data={sectorData} />
          </div>

          {/* Holdings and Watchlist Row */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-4">
            {/* Holdings Table - Takes 3 columns */}
            <div className="xl:col-span-3">
              <HoldingsTable stocks={stocks} />
            </div>

            {/* Watchlist Panel - Takes 1 column */}
            <div>
              <WatchlistPanel stocks={watchlistStocks} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
