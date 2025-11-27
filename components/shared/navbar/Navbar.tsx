import React from 'react'
import Logo from './Logo';

export default function Navbar() {
  return (
    <div className='sticky top-0 z-50'>
      <nav className="bg-background shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Name */}
            <Logo />

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-muted-foreground hover:text-primary/90 transition"
              >
                Home
              </a>
              <a
                href="/available-camps"
                className="text-muted-foreground hover:text-primary/90 transition"
              >
                Available Camps
              </a>
              <a
                href='/join-us'
                className="bg-primary/90 text-background px-6 py-2 rounded-lg hover:bg-primary transition">
                Join Us
              </a>
              {/* User profile picture would go here when logged in */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
