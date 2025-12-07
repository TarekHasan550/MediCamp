import { getAvailableCamp } from '@/app/(app)/available-camps/_action';
import { useQuery } from '@tanstack/react-query';

interface campQuery {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
const useAvailableCamps = ({ search, sort, page, limit }: campQuery) => {
  return useQuery({
    queryKey: ['available-camps', { search, sort, page, limit }],
    queryFn: async () =>
      await getAvailableCamp({
        search,
        sort,
        page,
        limit,
      }),
    staleTime: 1000 * 60,
  });
};

export default useAvailableCamps;
