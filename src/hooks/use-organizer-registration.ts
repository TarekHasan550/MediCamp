// hooks/useOrganizerRegistrations.ts
import { fetchAPI } from '@/lib/api-client';
import { OrganizerRegistrationsResponse } from '@/types';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface Filters {
  search?: string;
  status?: 'all' | 'paid-confirmed' | 'paid-pending' | 'unpaid';
  page?: number;
  limit?: number;
}

export default function useOrganizerRegistrations({
  search = '',
  status = 'all',
  page = 1,
  limit = 10,
}: Filters = {}) {
  const queryKey = ['organizer-registrations', { search, status, page, limit }];
  const { data, status: sessionStatus } = useSession();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        status,
        ...(search && { search }),
      });

      const res = await fetchAPI<OrganizerRegistrationsResponse>(
        `/registrations/organizer/get-all-registrations?${params}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data?.user?.accessToken}`,
          },
        }
      );

      if (res.error) {
        throw new Error(res.error);
      }

      return res.data;
    },
    staleTime: 1000 * 30,
    retry: 1,
    enabled: !!data && sessionStatus === 'authenticated',
  });
}
