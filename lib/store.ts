import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Transaction {
  id: string
  amount: number
  description: string
  categoryId: string
  category: Category
  joyScore: number
  joyMoment?: string
  date: string
  createdAt: string
}

export interface SavingsGoal {
  id: string
  title: string
  description?: string
  targetAmount: number
  currentAmount: number
  targetDate?: string
  isCompleted: boolean
  createdAt: string
}

export interface Category {
  id: string
  name: string
  color: string
  isNecessity: boolean
}

interface AppState {
  // User state
  user: {
    id: string
    name: string
    email: string
  }
  
  // Loading states
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Transactions
  transactions: Transaction[]
  setTransactions: (transactions: Transaction[]) => void
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void
  
  // Savings Goals
  savingsGoals: SavingsGoal[]
  setSavingsGoals: (goals: SavingsGoal[]) => void
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'createdAt'>) => void
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void
  
  // Categories
  categories: Category[]
  setCategories: (categories: Category[]) => void
  
  // UI State
  showExpenseModal: boolean
  setShowExpenseModal: (show: boolean) => void
  showGoalModal: boolean
  setShowGoalModal: (show: boolean) => void
  showDevMode: boolean
  setShowDevMode: (show: boolean) => void
  
  // Actions
  loadMockData: () => void
  clearData: () => void
  generateInsights: () => string[]
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Food & Dining', color: '#FF6B6B', isNecessity: true },
  { id: '2', name: 'Transportation', color: '#4ECDC4', isNecessity: true },
  { id: '3', name: 'Utilities', color: '#45B7D1', isNecessity: true },
  { id: '4', name: 'Healthcare', color: '#96CEB4', isNecessity: true },
  { id: '5', name: 'Shopping', color: '#FECA57', isNecessity: false },
  { id: '6', name: 'Entertainment', color: '#FF9FF3', isNecessity: false },
  { id: '7', name: 'Travel', color: '#54A0FF', isNecessity: false },
  { id: '8', name: 'Hobbies', color: '#5F27CD', isNecessity: false },
  { id: '9', name: 'Gifts', color: '#FF3838', isNecessity: false },
  { id: '10', name: 'Education', color: '#00D2D3', isNecessity: false },
]

const mockTransactions: Omit<Transaction, 'id' | 'createdAt'>[] = [
  {
    amount: 15.50,
    description: 'Coffee with Sarah',
    categoryId: '1',
    category: defaultCategories[0],
    joyScore: 5,
    joyMoment: 'Caught up with my best friend after months! Her laugh made my whole day.',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    amount: 89.99,
    description: 'New running shoes',
    categoryId: '5',
    category: defaultCategories[4],
    joyScore: 4,
    joyMoment: 'Finally found the perfect pair! Can\'t wait for my morning runs.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    amount: 45.00,
    description: 'Grocery shopping',
    categoryId: '1',
    category: defaultCategories[0],
    joyScore: 2,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    amount: 25.00,
    description: 'Movie tickets',
    categoryId: '6',
    category: defaultCategories[5],
    joyScore: 4,
    joyMoment: 'Amazing film! The plot twist had me on the edge of my seat.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    amount: 12.99,
    description: 'Book: "Atomic Habits"',
    categoryId: '10',
    category: defaultCategories[9],
    joyScore: 5,
    joyMoment: 'This book is already changing how I think about daily routines!',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    amount: 67.50,
    description: 'Gas for car',
    categoryId: '2',
    category: defaultCategories[1],
    joyScore: 1,
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    amount: 35.00,
    description: 'Dinner at Italian place',
    categoryId: '1',
    category: defaultCategories[0],
    joyScore: 4,
    joyMoment: 'The pasta was incredible and the atmosphere was so cozy.',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const mockGoal: Omit<SavingsGoal, 'id' | 'createdAt'> = {
  title: 'Dream Vacation to Japan',
  description: 'Two weeks exploring Tokyo, Kyoto, and Mount Fuji',
  targetAmount: 3500,
  currentAmount: 1250,
  targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
  isCompleted: false,
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: {
        id: 'guest-user',
        name: 'Guest Explorer',
        email: 'guest@joyfulspender.com'
      },
      
      // Loading states
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      // Transactions
      transactions: [],
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ 
          transactions: [newTransaction, ...state.transactions] 
        }))
      },
      
      // Savings Goals
      savingsGoals: [],
      setSavingsGoals: (goals) => set({ savingsGoals: goals }),
      addSavingsGoal: (goal) => {
        const newGoal: SavingsGoal = {
          ...goal,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ 
          savingsGoals: [...state.savingsGoals, newGoal] 
        }))
      },
      updateSavingsGoal: (id, updates) =>
        set((state) => ({
          savingsGoals: state.savingsGoals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          )
        })),
      
      // Categories
      categories: defaultCategories,
      setCategories: (categories) => set({ categories }),
      
      // UI State
      showExpenseModal: false,
      setShowExpenseModal: (show) => set({ showExpenseModal: show }),
      showGoalModal: false,
      setShowGoalModal: (show) => set({ showGoalModal: show }),
      showDevMode: false,
      setShowDevMode: (show) => set({ showDevMode: show }),
      
      // Actions
      loadMockData: () => {
        const transactions = mockTransactions.map((t, index) => ({
          ...t,
          id: `mock-${index}`,
          createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
        }))
        
        const goal: SavingsGoal = {
          ...mockGoal,
          id: 'mock-goal-1',
          createdAt: new Date().toISOString(),
        }
        
        set({ 
          transactions,
          savingsGoals: [goal],
        })
      },
      
      clearData: () => {
        set({ 
          transactions: [],
          savingsGoals: [],
        })
      },
      
      generateInsights: () => {
        const { transactions } = get()
        const insights: string[] = []
        
        if (transactions.length === 0) {
          return ['Start logging expenses to see personalized insights!']
        }
        
        // Joy-based insights
        const highJoyTransactions = transactions.filter(t => t.joyScore >= 4)
        const avgHighJoyAmount = highJoyTransactions.length > 0 
          ? highJoyTransactions.reduce((sum, t) => sum + t.amount, 0) / highJoyTransactions.length
          : 0
        
        if (avgHighJoyAmount > 0 && avgHighJoyAmount < 30) {
          insights.push(`💡 Your happiest purchases average under $${Math.round(avgHighJoyAmount)}—joy doesn't need to be expensive!`)
        }
        
        // Weekend spending pattern
        const weekendTransactions = transactions.filter(t => {
          const day = new Date(t.date).getDay()
          return day === 0 || day === 6
        })
        const avgWeekendJoy = weekendTransactions.length > 0
          ? weekendTransactions.reduce((sum, t) => sum + t.joyScore, 0) / weekendTransactions.length
          : 0
        
        if (avgWeekendJoy > 3.5) {
          insights.push('🌟 Most joy logged on weekends—keep riding that wave!')
        }
        
        // Category insights
        const categoryJoy = transactions.reduce((acc, t) => {
          if (!acc[t.category.name]) {
            acc[t.category.name] = { total: 0, count: 0 }
          }
          acc[t.category.name].total += t.joyScore
          acc[t.category.name].count += 1
          return acc
        }, {} as Record<string, { total: number, count: number }>)
        
        const topJoyCategory = Object.entries(categoryJoy)
          .map(([name, data]) => ({ name, avg: data.total / data.count }))
          .sort((a, b) => b.avg - a.avg)[0]
        
        if (topJoyCategory && topJoyCategory.avg > 4) {
          insights.push(`✨ ${topJoyCategory.name} brings you the most joy—invest in what matters!`)
        }
        
        // Spending frequency
        const recentTransactions = transactions.filter(t => 
          new Date(t.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
        
        if (recentTransactions.length > 5) {
          const avgJoy = recentTransactions.reduce((sum, t) => sum + t.joyScore, 0) / recentTransactions.length
          if (avgJoy > 3.5) {
            insights.push('🎯 You\'re on a roll this week—mindful spending is paying off!')
          }
        }
        
        return insights.length > 0 ? insights : ['Keep logging expenses to unlock more insights!']
      },
    }),
    {
      name: 'joyful-spender-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        savingsGoals: state.savingsGoals,
        showDevMode: state.showDevMode,
      }),
    }
  )
)