// app/dashboard/layout.tsx
'use client';

import { redirect, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Mock user data - replace with actual auth check
        const mockUser = {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'organizer', // or 'organizer'
        };

        setUser(mockUser);
        setLoading(false);

        // Only redirect if we're at /dashboard and have user
        if (mockUser && pathname === '/dashboard') {
          if (mockUser.role === 'participant') {
            redirect('/dashboard/participant');
          } else if (mockUser.role === 'organizer') {
            redirect('/dashboard/organizer');
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        redirect('/join-us');
      }
    };

    checkAuth();
  }, [pathname]); // Add pathname to dependencies

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) {
    redirect('/join-us');
    return null;
  }

  // Don't render anything if we're at /dashboard (redirect will happen)
  if (pathname === '/dashboard') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Redirecting...</div>
      </div>
    );
  }

  return <>{children}</>;
}
