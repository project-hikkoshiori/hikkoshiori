import type { NextPage } from "next";
import Image from "next/image";
import useSWR from "swr";
import { Fetcher } from "../src/utils/fetcher";
import topImageSrc from "../public/top.png";

const Home: NextPage = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_PATH}`, Fetcher);
  if (!data) {
    return <p>no data found...</p>;
  }
  return <Image src={topImageSrc} alt="ひっこしおり" />;
};

export default Home;
