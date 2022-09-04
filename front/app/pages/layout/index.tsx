import type { NextPage } from "next";
import NextLink from "next/link";
import {
  Button,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

const Layout: NextPage = () => {
  return (
    <VStack my={4} height="calc(100vh - 61px - 32px)">
      <Heading my={8}>レイアウト タイプ診断</Heading>
      <Text mb={40}>
        2択問題に答えて、自分に合ったレイアウトを探してみましょう
      </Text>
      <Spacer />
      <HStack>
        <NextLink href="layout/result" passHref>
          <Button as="a" colorScheme="brand" height="64px" width="400px">
            前回の結果を見る
          </Button>
        </NextLink>
        <NextLink href="layout/question" passHref>
          <Button as="a" colorScheme="brand" height="64px" width="400px">
            スタート
          </Button>
        </NextLink>
      </HStack>
      <Spacer />
    </VStack>
  );
};

export default Layout;
