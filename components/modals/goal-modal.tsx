'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAppStore } from '@/lib/store'
import { Target, DollarSign, Calendar, CheckCircle } from 'lucide-react'
import { format, addMonths } from 'date-fns'
import { toast } from 'sonner'

export function GoalModal() {
  const { showGoalModal, setShowGoalModal, addSavingsGoal } = useAppStore()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [targetDate, setTargetDate] = useState(
    format(addMonths(new Date(), 6), 'yyyy-MM-dd')
  )
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const goal = {
        title,
        description: description || undefined,
        targetAmount: parseFloat(targetAmount),
        currentAmount: 0,
        targetDate,
        isCompleted: false,
      }

      addSavingsGoal(goal)
      
      // Show success animation
      setShowSuccess(true)
      toast.success('🎯 New savings goal created! Time to start saving!')
      
      setTimeout(() => {
        resetForm()
        setShowGoalModal(false)
        setShowSuccess(false)
      }, 1500)
    } catch (error) {
      console.error('Failed to create goal:', error)
      toast.error('Failed to create goal')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setTargetAmount('')
    setTargetDate(format(addMonths(new Date(), 6), 'yyyy-MM-dd'))
  }

  return (
    <AnimatePresence>
      {showGoalModal && (
        <Dialog open={showGoalModal} onOpenChange={setShowGoalModal}>
          <DialogContent className="sm:max-w-md">
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 0.8 }}
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4"
                  >
                    <Target className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold text-gray-900 mb-2"
                  >
                    Goal Created!
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 text-center"
                  >
                    Your savings journey begins now! 🚀
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                        className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center"
                      >
                        <Target className="w-4 h-4 text-white" />
                      </motion.div>
                      Create Savings Goal
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Goal Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Dream Vacation, New Laptop"
                        required
                        className="text-lg font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What makes this goal special to you?"
                        className="resize-none"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="targetAmount" className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          Target Amount
                        </Label>
                        <Input
                          id="targetAmount"
                          type="number"
                          step="0.01"
                          value={targetAmount}
                          onChange={(e) => setTargetAmount(e.target.value)}
                          placeholder="0.00"
                          required
                          className="text-lg font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="targetDate" className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          Target Date
                        </Label>
                        <Input
                          id="targetDate"
                          type="date"
                          value={targetDate}
                          onChange={(e) => setTargetDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-100">
                      <p className="text-sm text-gray-600 mb-2">
                        💡 <strong>Tip:</strong> Break your goal into smaller milestones to stay motivated!
                      </p>
                      <p className="text-xs text-gray-500">
                        You can always update your goal as you make progress.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowGoalModal(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                      >
                        {isLoading ? 'Creating...' : 'Create Goal'}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}