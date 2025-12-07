'use server';
import { auth } from '@/auth';
import { fetchAPI } from '@/lib/api-client';
export const getProfile = async () => {
  const session = await auth();
  const { data, error } = await fetchAPI('/users/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  return {
    data,
    error,
  };
};
