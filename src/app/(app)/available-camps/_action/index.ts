'use server';

import { fetchAPI } from '@/lib/api-client';

interface campQuery {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const getAvailableCamp = async ({
  search,
  sort,
  page,
  limit,
}: campQuery) => {
  const res = await fetchAPI(
    `/camps/get-all-camps?search=${search}&sort=${sort}&page=${page}&limit=${limit}`
  );
  if (res.error) {
    throw new Error(res.error);
  }
  return res.data.data.camps;
};
