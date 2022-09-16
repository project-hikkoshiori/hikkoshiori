import useSWR from "swr";
import { Advice } from "../utils/types";
import { fetcher, post } from "./APIUtils";

type postAdviceProps = {
  content: string;
  icon_src: string;
};

type postAdviceResult = {
  data: Advice;
  isError: boolean;
};

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

export const postAdvices = async ({
  content,
  icon_src,
}: postAdviceProps): Promise<postAdviceResult> => {
  const { status, data } = await post("/advices", {
    user_id: self.crypto.randomUUID(),
    content,
    icon_src: icon_src,
  });

  return {
    data: data,
    isError: status != 200,
  };
};
