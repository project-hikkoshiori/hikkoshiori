import type { NextPage } from "next";
import Image from "next/image";
import useSWR from "swr";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Fetcher } from "../src/utils/fetcher";
import TopPageButton from "../src/components/TopPageButton";
import topImageSrc from "../public/top.png";

const Home: NextPage = () => {
  const isLoggedIn = false;
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_PATH}`, Fetcher);
  if (!data) {
    return <p>no data found...</p>;
  }
  return isLoggedIn ? (
    <Box>
      <Image src={topImageSrc} alt="ひっこしおり" />
      <VStack gap={5} my={5}>
        <Box width="60%">
          <Text
            fontSize="2xl"
            pos="absolute"
            zIndex="docked"
            transform="rotate(-9deg) translateX(-0.5em) translateY(-0.2em)"
            pointerEvents="none"
          >
            あなたにおすすめ!
          </Text>
          <TopPageButton link="/properties" text="物件を見る" width="100%" />
        </Box>
        <HStack gap={10} width="80%" justifyContent="center">
          <TopPageButton link="/" text="家計簿試算" width="20%" />
          <TopPageButton link="/" text="レイアウト診断" width="20%" />
          <TopPageButton link="/" text="提出書類" width="20%" />
          <TopPageButton link="/" text="みんなのアドバイス" width="20%" />
        </HStack>
      </VStack>
    </Box>
  ) : (
    <Box>
      <Image src={topImageSrc} alt="ひっこしおり" />
      <HStack gap={10} justifyContent="center">
        <Flex width="40%" height="200px" flexDirection="column">
          <Heading size="md" my={2}>
            全ての機能を使う
          </Heading>
          <Center
            borderX="2px"
            borderBottom="2px"
            borderColor="brand.200"
            borderStyle="dashed"
            flex="auto"
          >
            <TopPageButton link="/login" text="ログイン" minW="35%" />
          </Center>
        </Flex>
        <Flex width="40%" height="200px" flexDirection="column">
          <Heading size="md" my={2}>
            お試しで使う
          </Heading>
          <Flex
            borderX="2px"
            borderBottom="2px"
            borderColor="brand.200"
            borderStyle="dashed"
            align="center"
            justify="space-around"
            wrap="wrap"
            flex="auto"
          >
            <TopPageButton link="/" text="レイアウト診断" minW="35%" m={2} />
            <TopPageButton
              link="/"
              text="みんなのアドバイス"
              minW="35%"
              m={2}
            />
            <TopPageButton link="/" text="提出書類" minW="35%" m={2} />
          </Flex>
        </Flex>
      </HStack>
    </Box>
  );
};

export default Home;
