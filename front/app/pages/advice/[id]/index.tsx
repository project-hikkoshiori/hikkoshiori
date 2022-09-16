import type { NextPage } from "next";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import NextLink from "next/link";
import { Box, Center, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useGetAdvice } from "../../../src/api/AdviceAPI";

const queryToString = (x: string | string[] | undefined): string => {
  if (typeof x === "string") {
    return x;
  } else if (Array.isArray(x)) {
    return x[0];
  }
  return "";
};

const AdviceDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: advice, isError, isLoading } = useGetAdvice(queryToString(id));

  if (isError) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex align="center" flexDir="column">
      <Box width="70%" maxW="800px" mt={8}>
        <NextLink href="/advice" passHref>
          <Link>＜一覧に戻る</Link>
        </NextLink>
      </Box>
      <Center pos="relative" width="80%">
        <Heading my={16}>みんなのアドバイス</Heading>
      </Center>
    </Flex>
  );
};

export default AdviceDetailPage;
