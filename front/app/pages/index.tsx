import type { NextPage } from "next";
import useSWR from "swr";
import { Fetcher } from "../src/utils/fetcher";

const Home: NextPage = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_PATH}`, Fetcher);
  if (!data) {
    return <p>no data found...</p>;
  }
  return <p>data found!!!</p>;
};

export default Home;
