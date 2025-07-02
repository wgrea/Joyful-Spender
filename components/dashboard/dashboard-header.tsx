'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Plus, Target } from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface DashboardHeaderProps {
  userName?: string
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const { setShowExpenseModal, setShowGoalModal } = useAppStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-600 via-purple-500 to-green-500 text-white p-6 rounded-xl mb-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome back{userName ? `, ${userName}` : ''}! ✨
          </h1>
          <p className="text-purple-100">
            Ready for another day of mindful spending?
          </p>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowExpenseModal(true)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowGoalModal(true)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30"
              size="sm"
              variant="outline"
            >
              <Target className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}