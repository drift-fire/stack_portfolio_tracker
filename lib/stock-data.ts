export interface Stock {
  id: string
  name: string
  ticker: string
  quantity: number
  avgBuyPrice: number
  currentPrice: number
  sector: 'Technology' | 'Finance' | 'Healthcare' | 'Energy'
  dayChange: number
}

export const stocks: Stock[] = [
  {
    id: '1',
    name: 'Tata Consultancy Services',
    ticker: 'TCS',
    quantity: 25,
    avgBuyPrice: 3450,
    currentPrice: 3892,
    sector: 'Technology',
    dayChange: 1.24,
  },
  {
    id: '2',
    name: 'Infosys Limited',
    ticker: 'INFY',
    quantity: 50,
    avgBuyPrice: 1420,
    currentPrice: 1585,
    sector: 'Technology',
    dayChange: -0.58,
  },
  {
    id: '3',
    name: 'Reliance Industries',
    ticker: 'RELIANCE',
    quantity: 30,
    avgBuyPrice: 2580,
    currentPrice: 2435,
    sector: 'Energy',
    dayChange: -1.12,
  },
  {
    id: '4',
    name: 'HDFC Bank',
    ticker: 'HDFCBANK',
    quantity: 40,
    avgBuyPrice: 1580,
    currentPrice: 1725,
    sector: 'Finance',
    dayChange: 0.85,
  },
  {
    id: '5',
    name: 'ICICI Bank',
    ticker: 'ICICIBANK',
    quantity: 60,
    avgBuyPrice: 920,
    currentPrice: 1085,
    sector: 'Finance',
    dayChange: 0.42,
  },
  {
    id: '6',
    name: 'Sun Pharmaceutical',
    ticker: 'SUNPHARMA',
    quantity: 35,
    avgBuyPrice: 1150,
    currentPrice: 1320,
    sector: 'Healthcare',
    dayChange: 1.67,
  },
  {
    id: '7',
    name: 'Dr. Reddy\'s Labs',
    ticker: 'DRREDDY',
    quantity: 15,
    avgBuyPrice: 5200,
    currentPrice: 5450,
    sector: 'Healthcare',
    dayChange: 0.92,
  },
  {
    id: '8',
    name: 'Oil & Natural Gas Corp',
    ticker: 'ONGC',
    quantity: 100,
    avgBuyPrice: 195,
    currentPrice: 218,
    sector: 'Energy',
    dayChange: -0.35,
  },
]

export function calculateStockMetrics(stock: Stock) {
  const currentValue = stock.quantity * stock.currentPrice
  const investedValue = stock.quantity * stock.avgBuyPrice
  const pnlAmount = currentValue - investedValue
  const pnlPercent = ((currentValue - investedValue) / investedValue) * 100
  const dayChangeAmount = (stock.currentPrice * stock.dayChange) / 100

  return {
    currentValue,
    investedValue,
    pnlAmount,
    pnlPercent,
    dayChangeAmount,
  }
}

export function getPortfolioSummary(stockList: Stock[]) {
  let totalInvested = 0
  let totalCurrentValue = 0
  let totalDayChange = 0

  stockList.forEach((stock) => {
    const metrics = calculateStockMetrics(stock)
    totalInvested += metrics.investedValue
    totalCurrentValue += metrics.currentValue
    totalDayChange +=
      stock.quantity * ((stock.currentPrice * stock.dayChange) / 100)
  })

  const totalGainLoss = totalCurrentValue - totalInvested
  const totalGainLossPercent = (totalGainLoss / totalInvested) * 100

  return {
    totalInvested,
    totalCurrentValue,
    totalGainLoss,
    totalGainLossPercent,
    totalDayChange,
    totalDayChangePercent: (totalDayChange / totalCurrentValue) * 100,
  }
}

export function getSectorAllocation(stockList: Stock[]) {
  const sectorMap: Record<string, number> = {}

  stockList.forEach((stock) => {
    const metrics = calculateStockMetrics(stock)
    sectorMap[stock.sector] = (sectorMap[stock.sector] || 0) + metrics.currentValue
  })

  const totalValue = Object.values(sectorMap).reduce((a, b) => a + b, 0)

  return Object.entries(sectorMap).map(([sector, value]) => ({
    name: sector,
    value,
    percentage: ((value / totalValue) * 100).toFixed(1),
  }))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals)
}

export interface PortfolioHistoryPoint {
  date: string
  value: number
}

export const portfolioHistory: PortfolioHistoryPoint[] = [
  { date: 'Oct 2025', value: 520000 },
  { date: 'Nov 2025', value: 545000 },
  { date: 'Dec 2025', value: 562000 },
  { date: 'Jan 2026', value: 548000 },
  { date: 'Feb 2026', value: 589000 },
  { date: 'Mar 2026', value: 612405 },
]

export interface WatchlistStock {
  id: string
  ticker: string
  name: string
  price: number
  change: number
  changePercent: number
}

export const watchlistStocks: WatchlistStock[] = [
  { id: 'w1', ticker: 'WIPRO', name: 'Wipro Limited', price: 485, change: 5.20, changePercent: 1.08 },
  { id: 'w2', ticker: 'TATASTEEL', name: 'Tata Steel', price: 148, change: -2.35, changePercent: -1.56 },
  { id: 'w3', ticker: 'LT', name: 'Larsen & Toubro', price: 3580, change: 28.50, changePercent: 0.80 },
  { id: 'w4', ticker: 'MARUTI', name: 'Maruti Suzuki', price: 12450, change: -85.00, changePercent: -0.68 },
  { id: 'w5', ticker: 'BAJFINANCE', name: 'Bajaj Finance', price: 7280, change: 125.00, changePercent: 1.75 },
]
