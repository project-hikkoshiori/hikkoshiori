import useSWR from "swr";
import { BookmarkedProperty, Property } from "../utils/types";
import { del, fetcher, post } from "./APIUtils";

type addBookmarkProps = {
  user_id: string;
  property: Property;
};

export const getBookmaerkedPropertiesPath = (user_id: string) =>
  `/property/get?user_id=${user_id}`;

export const useGetBookmarkedProperties = (user_id: string) => {
  const { data, error, isValidating } = useSWR<BookmarkedProperty[]>(
    getBookmaerkedPropertiesPath(user_id),
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

export const addBookmarkProperty = async ({
  user_id,
  property,
}: addBookmarkProps) => {
  const { status, data } = await post(`/bookmark/add`, {
    user_id: user_id,
    property_id: property.id,
  });

  return {
    data: data,
    isError: status != 200,
  };
};

export const deleteBookmarkProperty = async ({
  user_id,
  property,
}: addBookmarkProps) => {
  const { status, data } = await del(`/bookmark/delete`, {
    user_id: user_id,
    property_id: property.id,
  });

  return {
    data: data,
    isError: status != 200,
  };
};
