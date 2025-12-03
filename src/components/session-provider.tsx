'use client';
import { SessionProvider as NextSessionProvider } from 'next-auth/react';

export default function SessionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NextSessionProvider>{children}</NextSessionProvider>;
}
