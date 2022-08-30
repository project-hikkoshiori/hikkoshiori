import type { NextPage } from "next";
import NextLink from "next/link";
import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

const SubmitPaper: NextPage = () => {
  return (
    <VStack my={4}>
      <Heading my={8}>提出書類フローチャート</Heading>
      <Text mb={40}>
        質問に答えるだけで、あなた専用の提出書類チャートが完成します
      </Text>
      <HStack>
        <NextLink href="submit-paper/result" passHref>
          <Button as="a" colorScheme="brand" height="64px" width="400px">
            前回の結果を見る
          </Button>
        </NextLink>
        <NextLink href="" passHref>
          <Button as="a" colorScheme="brand" height="64px" width="400px">
            スタート
          </Button>
        </NextLink>
      </HStack>
    </VStack>
  );
};

export default SubmitPaper;
