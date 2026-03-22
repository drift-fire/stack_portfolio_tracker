'use client'

import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Stock,
  calculateStockMetrics,
  formatCurrency,
  formatNumber,
} from '@/lib/stock-data'

interface HoldingsTableProps {
  stocks: Stock[]
}

type SortDirection = 'asc' | 'desc' | null
type SortField = 'pnlAmount' | 'pnlPercent' | 'currentValue' | null

export function HoldingsTable({ stocks }: HoldingsTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sectorFilter, setSectorFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const filteredAndSortedStocks = useMemo(() => {
    let result = [...stocks]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (stock) =>
          stock.name.toLowerCase().includes(query) ||
          stock.ticker.toLowerCase().includes(query)
      )
    }

    // Apply sector filter
    if (sectorFilter !== 'all') {
      result = result.filter((stock) => stock.sector === sectorFilter)
    }

    // Apply sorting
    if (sortField && sortDirection) {
      result.sort((a, b) => {
        const metricsA = calculateStockMetrics(a)
        const metricsB = calculateStockMetrics(b)

        let valueA: number
        let valueB: number

        switch (sortField) {
          case 'pnlAmount':
            valueA = metricsA.pnlAmount
            valueB = metricsB.pnlAmount
            break
          case 'pnlPercent':
            valueA = metricsA.pnlPercent
            valueB = metricsB.pnlPercent
            break
          case 'currentValue':
            valueA = metricsA.currentValue
            valueB = metricsB.currentValue
            break
          default:
            return 0
        }

        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA
      })
    }

    return result
  }, [stocks, searchQuery, sectorFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortField(null)
        setSortDirection(null)
      }
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-3 w-3" />
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="ml-1 h-3 w-3" />
    }
    return <ArrowDown className="ml-1 h-3 w-3" />
  }

  const sectors = ['all', 'Technology', 'Finance', 'Healthcare', 'Energy']

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Holdings
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {filteredAndSortedStocks.length} Stocks
            </Badge>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-48 pl-8 text-sm"
              />
            </div>

            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="h-8 w-36 text-sm">
                <Filter className="mr-2 h-3 w-3" />
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector === 'all' ? 'All Sectors' : sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-muted-foreground">
                  Stock Name
                </TableHead>
                <TableHead className="text-muted-foreground">Ticker</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Qty
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Avg Buy Price
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Current Price
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-2 h-auto p-1 font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort('currentValue')}
                  >
                    Current Value
                    {getSortIcon('currentValue')}
                  </Button>
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-2 h-auto p-1 font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort('pnlAmount')}
                  >
                    P&L (₹)
                    {getSortIcon('pnlAmount')}
                  </Button>
                </TableHead>
                <TableHead className="pr-6 text-right text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-2 h-auto p-1 font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort('pnlPercent')}
                  >
                    P&L (%)
                    {getSortIcon('pnlPercent')}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedStocks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No stocks found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedStocks.map((stock) => {
                  const metrics = calculateStockMetrics(stock)
                  const isGain = metrics.pnlAmount >= 0

                  return (
                    <TableRow
                      key={stock.id}
                      className={cn(
                        'border-border transition-colors',
                        isGain ? 'hover:bg-success/5' : 'hover:bg-destructive/5'
                      )}
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold',
                              stock.sector === 'Technology'
                                ? 'bg-chart-1/15 text-chart-1'
                                : stock.sector === 'Finance'
                                ? 'bg-chart-2/15 text-chart-2'
                                : stock.sector === 'Healthcare'
                                ? 'bg-chart-3/15 text-chart-3'
                                : 'bg-chart-4/15 text-chart-4'
                            )}
                          >
                            {stock.ticker.slice(0, 2)}
                          </div>
                          <span className="font-medium text-card-foreground">
                            {stock.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-border font-mono text-xs"
                        >
                          {stock.ticker}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-card-foreground">
                        {stock.quantity}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(stock.avgBuyPrice)}
                      </TableCell>
                      <TableCell className="text-right text-card-foreground">
                        {formatCurrency(stock.currentPrice)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-card-foreground">
                        {formatCurrency(metrics.currentValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={cn(
                            'flex items-center justify-end gap-1 font-medium',
                            isGain ? 'text-success' : 'text-destructive'
                          )}
                        >
                          {isGain ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          {formatCurrency(Math.abs(metrics.pnlAmount))}
                        </div>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <Badge
                          className={cn(
                            'font-mono text-xs',
                            isGain
                              ? 'border-success/30 bg-success/10 text-success hover:bg-success/20'
                              : 'border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20'
                          )}
                        >
                          {isGain ? '+' : ''}
                          {formatNumber(metrics.pnlPercent)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
