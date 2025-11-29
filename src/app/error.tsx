// app/error.tsx (for Next.js 13+ error handling)
'use client';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-card border border-border rounded-xl p-8">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Something went wrong!
          </h1>

          <p className="text-muted-foreground mb-6">
            We encountered an unexpected error. This might be temporary, so
            please try again.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="bg-muted p-4 rounded-lg mb-6 text-left">
              <summary className="cursor-pointer font-medium text-foreground">
                Error Details
              </summary>
              <pre className="mt-2 text-sm text-muted-foreground overflow-auto">
                {error.message}
              </pre>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>

            <Link
              href="/"
              className="flex-1 border border-input text-foreground py-3 rounded-lg hover:bg-muted transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </div>

          {/* Support Contact */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Need help?{' '}
              <Link
                href="mailto:support@medicamp.com"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
