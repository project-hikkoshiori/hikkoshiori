import useSWR from "swr";
import { BookmarkedProperty } from "../utils/types";
import { fetcher } from "./APIUtils";

export const useGetBookmarkedProperties = (user_id: string) => {
  const { data, error, isValidating } = useSWR<BookmarkedProperty[]>(
    `/property/get?user_id=${user_id}`,
    fetcher
  );
  console.log(data, !data && !error, error, isValidating);

  return {
    data: data,
    isLoading: !data && !error,
    isError: !!error,
    error: error,
  };
};
