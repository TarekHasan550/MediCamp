// app/dashboard/participant/layout.tsx
'use client';

import Logo from '@/components/shared/navbar/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BarChart3,
  Calendar,
  CreditCard,
  LogOut,
  Menu,
  User,
  X,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const participantMenu = [
  {
    name: 'Analytics',
    href: '/dashboard/participant',
    icon: BarChart3,
  },
  {
    name: 'Profile',
    href: '/dashboard/participant/profile',
    icon: User,
  },
  {
    name: 'Registered Camps',
    href: '/dashboard/participant/registered-camps',
    icon: Calendar,
  },
  {
    name: 'Payment History',
    href: '/dashboard/participant/payment-history',
    icon: CreditCard,
  },
];

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="sticky top-0 flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Logo />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {participantMenu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent w-full transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
        <header className="bg-card border-b border-border lg:static">
          <div className="flex items-center justify-between p-4.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {session.data?.user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.data?.user.role === 'organizer'
                    ? 'Organizer'
                    : 'Participant'}
                </p>
              </div>
              <Avatar>
                <AvatarImage
                  src={session.data?.user.image || ''}
                  alt={session.data?.user.name || ''}
                />
                <AvatarFallback>
                  {session.data?.user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
