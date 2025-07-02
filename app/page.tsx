'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles, Heart, Target, TrendingUp } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { loadMockData, setShowDevMode } = useAppStore()

  useEffect(() => {
    // Check for dev mode flag
    const devMode = searchParams.get('dev') === 'true'
    if (devMode) {
      setShowDevMode(true)
      loadMockData()
      router.push('/dashboard')
    }
  }, [searchParams, loadMockData, setShowDevMode, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-green-500 rounded-full mb-8"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-green-500 bg-clip-text text-transparent">
              Joyful Spender
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Balance saving money with intentional, joyful spending that brings{' '}
            <span className="text-purple-600 font-semibold">true happiness</span>
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Track your expenses with a joy score, set meaningful savings goals, 
            and discover what purchases actually make you happy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white px-8 py-3 text-lg">
                <Link href="/dashboard">
                  Start Exploring
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg">
                <Link href="/dashboard?dev=true">
                  Try with Demo Data
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Joyful Spender?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Traditional budgeting feels restrictive. We help you spend mindfully while saving effectively.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Heart,
              title: "Joy Score System",
              description: "Rate each purchase from 1-5 on happiness. Discover what truly brings you joy.",
              color: "from-pink-500 to-pink-600",
              bgColor: "bg-pink-50"
            },
            {
              icon: Target,
              title: "Smart Savings Goals",
              description: "Set meaningful targets and track progress with visual milestones.",
              color: "from-green-500 to-green-600", 
              bgColor: "bg-green-50"
            },
            {
              icon: TrendingUp,
              title: "Mindful Insights",
              description: "See patterns in your spending and learn what purchases make you happiest.",
              color: "from-purple-500 to-purple-600",
              bgColor: "bg-purple-50"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -10 }}
              className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="bg-gradient-to-r from-purple-600 via-purple-500 to-green-500 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to spend joyfully?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            No signup required—start exploring your spending patterns right away.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold">
              <Link href="/dashboard">
                Start Your Journey
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}