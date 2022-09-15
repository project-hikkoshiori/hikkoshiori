import useSWR from "swr";
import { Advice } from "../utils/types";
import { fetcher } from "./APIUtils";

export const useGetAdvices = () => {
  const { data, error, isValidating } = useSWR<Advice[]>("/advices", fetcher);

  console.log(data, !data && !error, error, isValidating);

  return {
    data: data,
    isLoading: !data && !error,
    isError: !!error,
    error: error,
  };
};
