'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { SavingsGoals } from '@/components/dashboard/savings-goals'
import { InsightsEngine } from '@/components/dashboard/insights-engine'
import { DevModeToggle } from '@/components/dashboard/dev-mode-toggle'
import { ExpenseModal } from '@/components/modals/expense-modal'
import { GoalModal } from '@/components/modals/goal-modal'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const { 
    user,
    loadMockData, 
    setShowDevMode,
    showDevMode,
    setIsLoading,
    isLoading
  } = useAppStore()

  useEffect(() => {
    // Check for dev mode flag
    const devMode = searchParams.get('dev') === 'true'
    if (devMode && !showDevMode) {
      setShowDevMode(true)
      loadMockData()
    }
  }, [searchParams, loadMockData, setShowDevMode, showDevMode])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-green-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <DashboardHeader userName={user.name} />
        
        <StatsCards />

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RecentTransactions />
          </div>
          <div>
            <SavingsGoals />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <InsightsEngine />
          <DevModeToggle />
        </div>
      </div>

      <ExpenseModal />
      <GoalModal />
    </div>
  )
}