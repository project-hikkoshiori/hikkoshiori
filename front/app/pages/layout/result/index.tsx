import NextLink from "next/link";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";

const LayoutResult: NextPage = () => {
  return (
    <VStack my={4}>
      <Heading my={8}>レイアウト タイプ診断</Heading>
      <Text>ざとさんにおすすめのレイアウトはこちら</Text>
      <HStack align="start">
        <Box bg="gray.300" width="240px" height="320px">
          選ばれたレイアウト
        </Box>
        <NextLink href="/properties" passHref>
          <Button as="a" colorScheme="brand" height="64px">
            この条件で家を探す
          </Button>
        </NextLink>
      </HStack>
    </VStack>
  );
};

export default LayoutResult;
