'use client'

import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  PieChart,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ThemeToggle } from './theme-toggle'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Briefcase, label: 'Portfolio', active: false },
  { icon: TrendingUp, label: 'Markets', active: false },
  { icon: PieChart, label: 'Analytics', active: false },
]

const bottomItems = [
  { icon: Bell, label: 'Notifications', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <TrendingUp className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">StockFolio</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <TrendingUp className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-md hover:bg-sidebar-accent"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        <p
          className={cn(
            'mb-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50',
            collapsed && 'sr-only'
          )}
        >
          Menu
        </p>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              item.active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              collapsed && 'justify-center px-2'
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-3">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              collapsed && 'justify-center px-2'
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}

        {/* Theme Toggle */}
        <div className={cn('mt-3 pt-3 border-t border-sidebar-border', collapsed && 'pt-1 mt-1')}>
          <ThemeToggle collapsed={collapsed} />
        </div>

        {/* User section */}
        <div
          className={cn(
            'mt-4 flex items-center gap-3 rounded-lg border border-sidebar-border p-3',
            collapsed && 'justify-center p-2'
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium">
            RK
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">Rahul Kumar</p>
              <p className="truncate text-xs text-sidebar-foreground/50">
                Premium Account
              </p>
            </div>
          )}
          {!collapsed && (
            <button className="rounded p-1 hover:bg-sidebar-accent">
              <LogOut className="h-4 w-4 text-sidebar-foreground/50" />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
