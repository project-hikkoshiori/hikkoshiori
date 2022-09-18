import useSWR from "swr";
import { UserForm, User } from "../utils/types";
import { fetcher, post } from "./APIUtils";

type postUserResult = {
  data: User;
  isError: boolean;
};

export const useGetUserByName = (name: string) => {
  const { data, error, isValidating } = useSWR<User>(
    `/users/me?name=${name}`,
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

export const postUser = async (form: UserForm): Promise<postUserResult> => {
  const { status, data } = await post("/users", form);
  return {
    data: data,
    isError: status != 200,
  };
};
