'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useAppStore } from '@/lib/store'
import { Heart, Calendar, DollarSign, Tag, Sparkles, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

export function ExpenseModal() {
  const { 
    showExpenseModal, 
    setShowExpenseModal, 
    addTransaction, 
    categories,
  } = useAppStore()

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [joyScore, setJoyScore] = useState([3])
  const [joyMoment, setJoyMoment] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const selectedCategory = categories.find(c => c.id === categoryId)
      if (!selectedCategory) {
        toast.error('Please select a category')
        return
      }

      const transaction = {
        amount: parseFloat(amount),
        description,
        categoryId,
        category: selectedCategory,
        joyScore: joyScore[0],
        joyMoment: joyMoment || undefined,
        date: new Date(date).toISOString(),
      }

      addTransaction(transaction)
      
      // Show success animation
      setShowSuccess(true)
      
      // Success message based on joy score
      const joyMessages = {
        5: '🤩 Amazing! That sounds like pure joy!',
        4: '😊 Great choice! Happiness is worth it!',
        3: '😐 Fair enough, sometimes we need the basics.',
        2: '😕 Hope it was necessary at least.',
        1: '😞 Better luck with the next purchase!'
      }
      
      toast.success(joyMessages[joyScore[0] as keyof typeof joyMessages] || 'Expense added!')
      
      setTimeout(() => {
        resetForm()
        setShowExpenseModal(false)
        setShowSuccess(false)
      }, 1500)
    } catch (error) {
      console.error('Failed to create transaction:', error)
      toast.error('Failed to add expense')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setAmount('')
    setDescription('')
    setCategoryId('')
    setJoyScore([3])
    setJoyMoment('')
    setDate(format(new Date(), 'yyyy-MM-dd'))
  }

  const getJoyEmoji = (score: number) => {
    if (score >= 5) return '🤩'
    if (score >= 4) return '😊'
    if (score >= 3) return '😐'
    if (score >= 2) return '😕'
    return '😞'
  }

  const getJoyColor = (score: number) => {
    if (score >= 4) return 'from-green-500 to-green-600'
    if (score >= 3) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  return (
    <AnimatePresence>
      {showExpenseModal && (
        <Dialog open={showExpenseModal} onOpenChange={setShowExpenseModal}>
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
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold text-gray-900 mb-2"
                  >
                    Expense Added!
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 text-center"
                  >
                    Your mindful spending journey continues ✨
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
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                        className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center"
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </motion.div>
                      Add New Expense
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          Amount
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          required
                          className="text-lg font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What did you spend on?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-orange-600" />
                        Category
                      </Label>
                      <Select value={categoryId} onValueChange={setCategoryId} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: category.color }}
                                />
                                {category.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-600" />
                        Joy Score: {joyScore[0]}/5 {getJoyEmoji(joyScore[0])}
                      </Label>
                      <div className="px-3">
                        <Slider
                          value={joyScore}
                          onValueChange={setJoyScore}
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>😞 Not happy</span>
                          <span>🤩 Very happy</span>
                        </div>
                      </div>
                    </div>

                    {joyScore[0] >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="joyMoment" className="text-green-600">
                          ✨ What made this purchase {joyScore[0] >= 4 ? 'joyful' : 'worthwhile'}?
                        </Label>
                        <Textarea
                          id="joyMoment"
                          value={joyMoment}
                          onChange={(e) => setJoyMoment(e.target.value)}
                          placeholder={joyScore[0] >= 4 ? "Describe the happiness this brought you..." : "Why was this purchase necessary or meaningful?"}
                          className="resize-none"
                          rows={2}
                        />
                      </motion.div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowExpenseModal(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 bg-gradient-to-r ${getJoyColor(joyScore[0])} hover:opacity-90 text-white`}
                      >
                        {isLoading ? 'Adding...' : 'Add Expense'}
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