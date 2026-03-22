'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ collapsed = false }: { collapsed?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          'flex items-center rounded-lg p-1',
          collapsed ? 'justify-center' : 'bg-sidebar-accent/50'
        )}
      >
        <div className="h-8 w-8 animate-pulse rounded-md bg-sidebar-accent" />
      </div>
    )
  }

  if (collapsed) {
    // Simple cycle button when sidebar is collapsed
    const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
    const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

    return (
      <button
        onClick={() => setTheme(nextTheme)}
        className="flex w-full items-center justify-center rounded-lg px-2 py-2.5 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        title={`Theme: ${theme} — Click to switch`}
      >
        <Icon className="h-5 w-5 shrink-0" />
      </button>
    )
  }

  return (
    <div className="space-y-1.5">
      <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
        Theme
      </p>
      <div className="flex items-center rounded-lg bg-sidebar-accent/50 p-1">
        <button
          onClick={() => setTheme('light')}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200',
            theme === 'light'
              ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
              : 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
          )}
          title="Light mode"
        >
          <Sun className="h-3.5 w-3.5" />
          <span>Light</span>
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200',
            theme === 'dark'
              ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
              : 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
          )}
          title="Dark mode"
        >
          <Moon className="h-3.5 w-3.5" />
          <span>Dark</span>
        </button>
        <button
          onClick={() => setTheme('system')}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200',
            theme === 'system'
              ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
              : 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
          )}
          title="System theme"
        >
          <Monitor className="h-3.5 w-3.5" />
          <span>Auto</span>
        </button>
      </div>
    </div>
  )
}
