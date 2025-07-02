'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Calendar, Sparkles } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { format } from 'date-fns'

export function RecentTransactions() {
  const { transactions } = useAppStore()
  const recentTransactions = transactions.slice(0, 8)

  const getJoyAnimation = (score: number) => {
    if (score >= 5) {
      return {
        initial: { scale: 0.8, opacity: 0 },
        animate: { 
          scale: [0.8, 1.1, 1], 
          opacity: 1,
          boxShadow: [
            '0 0 0 0 rgba(168, 85, 247, 0)',
            '0 0 0 10px rgba(168, 85, 247, 0.3)',
            '0 0 0 0 rgba(168, 85, 247, 0)'
          ]
        },
        transition: { duration: 0.6, ease: "easeOut" }
      }
    } else if (score >= 3) {
      return {
        initial: { y: 10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }
    } else {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 0.7 },
        transition: { duration: 0.8, ease: "easeOut" }
      }
    }
  }

  const getJoyEmoji = (score: number) => {
    if (score >= 5) return '🤩'
    if (score >= 4) return '😊'
    if (score >= 3) return '😐'
    if (score >= 2) return '😕'
    return '😞'
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
          <div className="space-y-3">
            <AnimatePresence>
              {recentTransactions.map((transaction, index) => {
                const joyAnimation = getJoyAnimation(transaction.joyScore)
                
                return (
                  <motion.div
                    key={transaction.id}
                    {...joyAnimation}
                    layout
                    className={`relative p-4 rounded-lg border transition-all duration-300 ${
                      transaction.joyScore >= 4 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-md' 
                        : transaction.joyScore >= 3
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 hover:shadow-sm'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {transaction.joyScore >= 5 && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                      >
                        <Sparkles className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
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
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-1">
                          <span>{format(new Date(transaction.date), 'MMM dd')}</span>
                          <div className="flex items-center gap-1">
                            <Heart className={`w-3 h-3 ${transaction.joyScore >= 4 ? 'text-red-500' : 'text-gray-400'}`} />
                            <span>{transaction.joyScore}/5</span>
                            <motion.span
                              animate={transaction.joyScore >= 4 ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              {getJoyEmoji(transaction.joyScore)}
                            </motion.span>
                          </div>
                        </div>
                        {transaction.joyMoment && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-xs text-gray-600 mt-2 italic bg-white/50 p-2 rounded border-l-2 border-green-300"
                          >
                            💭 "{transaction.joyMoment}"
                          </motion.p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-gray-900">
                          ${transaction.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  )
}