// components/Navbar.tsx
'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutDashboard, LogOut, Menu, Settings, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';

// Mock user data - replace with actual authentication
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'participant', // or 'organizer'
  avatar: '/images/user-avatar.jpg',
};

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        // Replace with actual auth check
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUser(mockUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    setUser(null);
    setIsDropdownOpen(false);
    // Add actual logout logic here
  };

  const handleDashboardClick = () => {
    if (user?.role === 'participant') {
      router.push('/dashboard/participant');
    } else if (user?.role === 'organizer') {
      router.push('/dashboard/organizer');
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-background shadow-xs border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <Logo />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary/90 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/available-camps"
                className="text-muted-foreground hover:text-primary/90 transition-colors font-medium"
              >
                Available Camps
              </Link>

              {/* Conditional rendering based on authentication */}
              {loading ? (
                // Loading skeleton
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
              ) : user ? (
                // User is logged in - show profile dropdown
                <div className="flex items-center space-x-4">
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-3 focus:outline-none"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-transparent hover:border-primary transition-colors"
                      />
                      <span className="text-muted-foreground font-medium hidden lg:block">
                        {user.name}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg py-2 z-50"
                        >
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-border">
                            <p className="text-sm font-semibold text-foreground">
                              {user.name}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {user.email}
                            </p>
                            <p className="text-xs text-primary font-medium capitalize mt-1">
                              {user.role}
                            </p>
                          </div>

                          {/* Dropdown Items */}
                          <div className="py-2">
                            <button
                              onClick={handleDashboardClick}
                              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                            >
                              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                              <span>Dashboard</span>
                            </button>

                            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                              <Settings className="h-4 w-4 text-muted-foreground" />
                              <span>Settings</span>
                            </button>

                            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>Profile</span>
                            </button>
                          </div>

                          {/* Logout */}
                          <div className="border-t border-border pt-2">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-destructive hover:bg-accent transition-colors"
                            >
                              <LogOut className="h-4 w-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                // User is not logged in - show Join Us button
                <Link
                  href="/join-us"
                  className={cn(
                    buttonVariants({
                      variant: 'outline',
                      className: 'rounded-xs',
                    })
                  )}
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-border py-4"
              >
                <div className="space-y-4">
                  <Link
                    href="/"
                    className="block text-muted-foreground hover:text-primary/90 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/available-camps"
                    className="block text-muted-foreground hover:text-primary/90 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Available Camps
                  </Link>

                  {/* Mobile Authentication Section */}
                  {loading ? (
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-muted rounded animate-pulse"></div>
                      <div className="w-24 h-4 bg-muted rounded animate-pulse"></div>
                    </div>
                  ) : user ? (
                    <div className="space-y-3 pt-4 border-t border-border">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-foreground">
                            {user.name}
                          </p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {user.role}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleDashboardClick}
                        className="w-full flex items-center space-x-3 text-foreground hover:bg-accent transition-colors p-2 rounded-lg"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 text-destructive hover:bg-accent transition-colors p-2 rounded-lg"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/join-us"
                      className="block bg-primary text-primary-foreground text-center py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join Us
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Backdrop for dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDropdownOpen(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
