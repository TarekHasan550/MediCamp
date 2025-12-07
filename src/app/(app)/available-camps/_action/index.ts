'use server';

import { fetchAPI } from '@/lib/api-client';
import s3Client from '@/lib/s3Client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

interface CampQuery {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const getAvailableCamp = async ({
  search,
  sort,
  page = 1,
  limit = 6,
}: CampQuery) => {
  // Build query params properly
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (sort) params.append('sort', sort);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const res = await fetchAPI(`/camps/get-all-camps?${params.toString()}`);

  if (res.error) {
    throw new Error(res.error);
  }

  return res.data.data.camps;
};

