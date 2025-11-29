// app/not-found.tsx (Optimized Version)
'use client';

import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Heart, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/shared/navbar/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <Link
              href="/"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {/* Medical Icons Animation */}
              <div className="relative h-64">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-10 left-1/4"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className="absolute top-20 right-1/4"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-500" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-10 w-10 text-blue-500" />
                  </div>
                </motion.div>
              </div>

              {/* 404 Text */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="text-9xl font-bold text-gray-300 mt-8"
              >
                404
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Medical Camp <span className="text-primary">Not Found</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                It seems the healthcare service or page you're looking for isn't
                available. Don't worry - we have plenty of other medical camps
                and resources for you.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Check our available medical camps</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Join as a participant or organizer</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Access your dashboard for registered camps</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/available-camps"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-center"
                >
                  Browse Medical Camps
                </Link>

                <Link
                  href="/join-us"
                  className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/5 transition-colors font-semibold text-center"
                >
                  Create Account
                </Link>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => window.history.back()}
                  className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-2 justify-center sm:justify-start"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go back to previous page
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
