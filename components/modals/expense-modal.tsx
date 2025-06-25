'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useAppStore } from '@/lib/store'
import { Heart, Calendar, DollarSign, Tag, Sparkles } from 'lucide-react'
import { format } from 'date-fns'

export function ExpenseModal() {
  const { 
    showExpenseModal, 
    setShowExpenseModal, 
    addTransaction, 
    categories,
    setCategories,
  } = useAppStore()

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [joyScore, setJoyScore] = useState([3])
  const [joyMoment, setJoyMoment] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories()
    }
  }, [categories.length])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          description,
          categoryId,
          joyScore: joyScore[0],
          joyMoment: joyMoment || undefined,
          date,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        addTransaction(data.transaction)
        resetForm()
        setShowExpenseModal(false)
      }
    } catch (error) {
      console.error('Failed to create transaction:', error)
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

              {joyScore[0] >= 4 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <Label htmlFor="joyMoment" className="text-green-600">
                    ✨ What made this purchase joyful?
                  </Label>
                  <Textarea
                    id="joyMoment"
                    value={joyMoment}
                    onChange={(e) => setJoyMoment(e.target.value)}
                    placeholder="Describe the happiness this brought you..."
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
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}