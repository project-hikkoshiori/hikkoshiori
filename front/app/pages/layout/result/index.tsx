import NextLink from "next/link";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import LayoutTendacyList from "../../../src/components/layout/LayoutTendacyList";

const LayoutResult: NextPage = () => {
  return (
    <VStack my={4}>
      <Heading my={8}>レイアウト タイプ診断</Heading>
      <Text>ざとさんにおすすめのレイアウトはこちら</Text>
      <HStack align="center" gap={4}>
        <Box bg="gray.300" width="360px" height="480px">
          選ばれたレイアウト
        </Box>
        <VStack>
          <LayoutTendacyList />
          <NextLink href="/properties" passHref>
            <Button as="a" colorScheme="brand" height="64px">
              この条件で家を探す
            </Button>
          </NextLink>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default LayoutResult;
