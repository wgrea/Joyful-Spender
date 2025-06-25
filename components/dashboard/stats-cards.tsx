'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Heart, DollarSign, Target } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useMemo } from 'react'
import { format, startOfMonth, endOfMonth } from 'date-fns'

export function StatsCards() {
  const { transactions, savingsGoals } = useAppStore()

  const stats = useMemo(() => {
    const currentMonth = new Date()
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)

    const currentMonthTransactions = transactions.filter(
      (t) => new Date(t.date) >= monthStart && new Date(t.date) <= monthEnd
    )

    const totalSpent = currentMonthTransactions.reduce((sum, t) => sum + t.amount, 0)
    const joySpending = currentMonthTransactions
      .filter((t) => t.joyScore >= 4)
      .reduce((sum, t) => sum + t.amount, 0)
    const avgJoyScore = currentMonthTransactions.length > 0
      ? currentMonthTransactions.reduce((sum, t) => sum + t.joyScore, 0) / currentMonthTransactions.length
      : 0

    const totalGoalProgress = savingsGoals.reduce((sum, goal) => 
      sum + (goal.currentAmount / goal.targetAmount), 0
    ) / Math.max(savingsGoals.length, 1) * 100

    return {
      totalSpent,
      joySpending,
      avgJoyScore,
      totalGoalProgress,
    }
  }, [transactions, savingsGoals])

  const cards = [
    {
      title: 'This Month',
      value: `$${stats.totalSpent.toFixed(2)}`,
      subtitle: 'Total spent',
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Joy Spending',
      value: `$${stats.joySpending.toFixed(2)}`,
      subtitle: 'High joy purchases',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Joy Score',
      value: stats.avgJoyScore.toFixed(1),
      subtitle: 'Average happiness',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Goals Progress',
      value: `${stats.totalGoalProgress.toFixed(0)}%`,
      subtitle: 'Average completion',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {card.value}
                  </p>
                  <p className="text-xs text-gray-500">
                    {card.subtitle}
                  </p>
                </div>
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <card.icon className={`w-6 h-6 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}