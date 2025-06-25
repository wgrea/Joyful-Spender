import { create } from 'zustand'
import { Transaction, SavingsGoal, Category } from '@prisma/client'

interface TransactionWithCategory extends Transaction {
  category: Category
}

interface AppState {
  // Loading states
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Transactions
  transactions: TransactionWithCategory[]
  setTransactions: (transactions: TransactionWithCategory[]) => void
  addTransaction: (transaction: TransactionWithCategory) => void
  
  // Savings Goals
  savingsGoals: SavingsGoal[]
  setSavingsGoals: (goals: SavingsGoal[]) => void
  addSavingsGoal: (goal: SavingsGoal) => void
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void
  
  // Categories
  categories: Category[]
  setCategories: (categories: Category[]) => void
  
  // UI State
  showExpenseModal: boolean
  setShowExpenseModal: (show: boolean) => void
  showGoalModal: boolean
  setShowGoalModal: (show: boolean) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // Loading states
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  // Transactions
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) => 
    set((state) => ({ 
      transactions: [transaction, ...state.transactions] 
    })),
  
  // Savings Goals
  savingsGoals: [],
  setSavingsGoals: (goals) => set({ savingsGoals: goals }),
  addSavingsGoal: (goal) => 
    set((state) => ({ 
      savingsGoals: [...state.savingsGoals, goal] 
    })),
  updateSavingsGoal: (id, updates) =>
    set((state) => ({
      savingsGoals: state.savingsGoals.map((goal) =>
        goal.id === id ? { ...goal, ...updates } : goal
      )
    })),
  
  // Categories
  categories: [],
  setCategories: (categories) => set({ categories }),
  
  // UI State
  showExpenseModal: false,
  setShowExpenseModal: (show) => set({ showExpenseModal: show }),
  showGoalModal: false,
  setShowGoalModal: (show) => set({ showGoalModal: show }),
}))