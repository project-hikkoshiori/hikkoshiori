import type { NextPage } from "next";
import Image from "next/image";
import useSWR from "swr";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Fetcher } from "../src/utils/fetcher";
import TopPageButton from "../src/components/TopPageButton";
import topImageSrc from "../public/top.png";

const Home: NextPage = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_PATH}`, Fetcher);
  if (!data) {
    return <p>no data found...</p>;
  }
  return (
    <Box>
      <Image src={topImageSrc} alt="ひっこしおり" />
      <VStack gap={5} my={5}>
        <TopPageButton link="/properties" text="物件を見る" width="60%" />
        <HStack gap={10} width="80%" justifyContent="center">
          <TopPageButton link="/" text="家計簿試算" width="20%" />
          <TopPageButton link="/" text="レイアウト診断" width="20%" />
          <TopPageButton link="/" text="提出書類" width="20%" />
          <TopPageButton link="/" text="みんなのアドバイス" width="20%" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Home;
