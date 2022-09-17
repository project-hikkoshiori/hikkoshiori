import useSWR from "swr";
import { Property } from "../utils/types";
import { fetcher } from "./APIUtils";

export const useGetFilteredProperties = (path: string) => {
  const { data, error, isValidating } = useSWR<Property[]>(path, fetcher);
  console.log(data, !data && !error, error, isValidating);

  return {
    data: data,
    isLoading: !data && !error,
    isError: !!error,
    error: error,
  };
};
