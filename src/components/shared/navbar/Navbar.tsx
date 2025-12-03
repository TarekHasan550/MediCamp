// components/Navbar.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = session?.user;
  const isLoading = status === 'loading';

  const handleDashboard = () => {
    if (!user) return;

    const role = user?.role || 'user';

    if (role === 'organizer') {
      router.push('/dashboard/organizer');
    } else {
      router.push('/dashboard/participant');
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <Logo />
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground font-medium"
              >
                Home
              </Link>
              <Link
                href="/available-camps"
                className="text-muted-foreground hover:text-foreground font-medium"
              >
                Available Camps
              </Link>

              {/* Auth State */}
              {isLoading ? (
                <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage src={user.image || undefined} />
                      <AvatarFallback>
                        {user.name?.[0] || user.email?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleDashboard}
                      className="cursor-pointer"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href="/join-us"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'rounded-md'
                  )}
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t py-4 space-y-4">
              <Link
                href="/"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/available-camps"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Available Camps
              </Link>

              {isLoading ? (
                <div className="py-8">
                  <div className="h-4 bg-muted rounded animate-pulse w-32" />
                </div>
              ) : user ? (
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.image || undefined} />
                      <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDashboard}
                    className="w-full text-left py-2 px-3 rounded-md hover:bg-accent flex items-center gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-3 rounded-md hover:bg-accent text-destructive flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/join-us"
                  className="block text-center bg-primary text-primary-foreground py-3 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Us
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
