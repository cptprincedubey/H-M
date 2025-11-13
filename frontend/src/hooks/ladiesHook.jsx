import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "../api/ProductApis";

export const fetchProductDataHook = (data) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["ladies products"],
    queryFn: () => getProductByCategory(data),
    staleTime: Infinity,
  });
};
