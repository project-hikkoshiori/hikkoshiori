import type { NextPage } from "next";
import useSWR from "swr";
import { Fetcher } from "../src/utils/fetcher";
import LoggedInTop from "../src/components/LoggedInTop";
import LoggedOutTop from "../src/components/LoggedOutTop";

const Home: NextPage = () => {
  const isLoggedIn = false;
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_PATH}`, Fetcher);
  if (!data) {
    return <p>no data found...</p>;
  }

  return isLoggedIn ? <LoggedInTop /> : <LoggedOutTop />;
};

export default Home;
