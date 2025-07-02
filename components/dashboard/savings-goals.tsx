'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Target, Plus, Trophy, Star } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { format } from 'date-fns'

export function SavingsGoals() {
  const { savingsGoals, setShowGoalModal } = useAppStore()

  const getMilestoneMessage = (progress: number) => {
    if (progress >= 100) return { message: "🎉 Goal achieved! Amazing work!", icon: Trophy, color: "text-yellow-500" }
    if (progress >= 75) return { message: "🔥 Almost there! You've got this!", icon: Star, color: "text-orange-500" }
    if (progress >= 50) return { message: "💪 Halfway there! Keep it up!", icon: Target, color: "text-blue-500" }
    if (progress >= 25) return { message: "🌱 Great start! Building momentum!", icon: Plus, color: "text-green-500" }
    return null
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Savings Goals
          </CardTitle>
          <Button
            onClick={() => setShowGoalModal(true)}
            size="sm"
            variant="outline"
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {savingsGoals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              🎯
            </motion.div>
            <p>No savings goals yet</p>
            <p className="text-sm">Create your first goal to start saving!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savingsGoals.map((goal, index) => {
              const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
              const milestone = getMilestoneMessage(progress)
              
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                    <motion.span 
                      className="text-sm font-medium text-green-600"
                      animate={progress >= 100 ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, repeat: progress >= 100 ? Infinity : 0 }}
                    >
                      {progress.toFixed(0)}%
                    </motion.span>
                  </div>
                  
                  <div className="mb-3">
                    <Progress 
                      value={progress} 
                      className="h-3"
                    />
                  </div>
                  
                  {milestone && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`flex items-center gap-2 mb-2 text-sm ${milestone.color}`}
                    >
                      <milestone.icon className="w-4 h-4" />
                      <span className="font-medium">{milestone.message}</span>
                    </motion.div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>
                      ${goal.currentAmount.toFixed(2)} of ${goal.targetAmount.toFixed(2)}
                    </span>
                    {goal.targetDate && (
                      <span>
                        Due {format(new Date(goal.targetDate), 'MMM yyyy')}
                      </span>
                    )}
                  </div>
                  
                  {goal.description && (
                    <p className="text-xs text-gray-500 mt-2 italic">
                      {goal.description}
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}