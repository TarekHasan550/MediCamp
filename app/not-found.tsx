// app/not-found.tsx
'use client';

import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/shared/navbar/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/available-camps"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Available Camps
              </Link>
              <Link
                href="/join-us"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated 404 Graphic */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              {/* Medical Cross */}
              <div className="w-32 h-32 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Stethoscope className="h-16 w-16 text-primary" />
              </div>

              {/* 404 Badge */}
              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -top-4 -right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-full text-lg font-bold shadow-lg"
              >
                404
              </motion.div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-md mx-auto">
              Oops! The medical camp you're looking for seems to have moved or
              doesn't exist.
            </p>

            <div className="bg-card border border-border rounded-xl p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-4">
                <Search className="h-5 w-5" />
                <span className="font-medium">Possible reasons:</span>
              </div>
              <ul className="text-left text-muted-foreground space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>The camp might have been completed or cancelled</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>The URL might be misspelled</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>The page might have been moved to a new location</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center gap-3"
            >
              <Home className="h-5 w-5" />
              Back to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="border border-input text-foreground px-8 py-4 rounded-lg hover:bg-muted transition-colors font-semibold flex items-center gap-3"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-muted-foreground mb-4">
              Quick links you might be looking for:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { href: '/available-camps', label: 'Available Camps' },
                { href: '/join-us', label: 'Join Us' },
                {
                  href: '/dashboard/participant',
                  label: 'Participant Dashboard',
                },
                { href: '/dashboard/organizer', label: 'Organizer Dashboard' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} MediCamp. Providing healthcare
            access to communities.
          </p>
        </div>
      </footer>
    </div>
  );
}
