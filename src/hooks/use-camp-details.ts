import { Camp } from '@/app/(app)/camp-details/[campID]/page';
import { fetchAPI } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function useCampDetails(id: string) {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: ['camp-details', id], // ✅ Simpler key
    queryFn: async (): Promise<Camp> => {
      const res = await fetchAPI(`/camps/get-camp/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });

      if (res.error) {
        throw new Error(res.error);
      }
      return res.data.data.camp;
    },
    enabled: !!id && status === 'authenticated', // ✅ Only fetch when authenticated and id exists
    retry: 1, // ✅ Don't retry too many times for auth errors
  });
}
