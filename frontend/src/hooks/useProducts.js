import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "../services/productService";

export function useProducts(page = 1, limit = 8, queryKeyPrefix = "products") {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [queryKeyPrefix, page, limit],
    queryFn: () => get(page, limit),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  const totalPages = query?.data?.data?.data?.pagination?.totalPages || 1;
  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [queryKeyPrefix, page + 1, limit],
      queryFn: () => get(page + 1, limit),
    });
  }

  const products = query?.data?.data?.data?.products || [];
  const pagination = query?.data?.data?.data?.pagination || {};

  return {
    ...query,
    products,
    pagination,
  };
}
