'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Calendar } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { format } from 'date-fns'

export function RecentTransactions() {
  const { transactions } = useAppStore()
  const recentTransactions = transactions.slice(0, 5)

  const getJoyColor = (score: number) => {
    if (score >= 4) return 'bg-gradient-to-r from-green-500 to-green-600'
    if (score >= 3) return 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    return 'bg-gradient-to-r from-gray-500 to-gray-600'
  }

  const getJoyEmoji = (score: number) => {
    if (score >= 4) return '😊'
    if (score >= 3) return '😐'
    return '😕'
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              💸
            </motion.div>
            <p>No transactions yet</p>
            <p className="text-sm">Add your first expense to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">
                      {transaction.description}
                    </h4>
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      style={{ backgroundColor: transaction.category.color + '20' }}
                    >
                      {transaction.category.name}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>{format(new Date(transaction.date), 'MMM dd')}</span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{transaction.joyScore}/5</span>
                      <span>{getJoyEmoji(transaction.joyScore)}</span>
                    </div>
                  </div>
                  {transaction.joyMoment && (
                    <p className="text-xs text-gray-500 mt-1 italic">
                      "{transaction.joyMoment}"
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    ${transaction.amount.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}