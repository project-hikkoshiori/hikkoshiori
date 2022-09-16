import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import DefaultErrorPage from "next/error";
import NextLink from "next/link";
import {
  Box,
  Center,
  Circle,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
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
      <HStack align="top">
        <Circle size="60px" bg="brand.100" overflow="hidden" mr={2}>
          <Image
            src={advice!.iconSrc}
            alt="user icon"
            height="60px"
            width="60px"
          />
        </Circle>
        <VStack align="left" flex="auto">
          <HStack align="top" height="60px" alignItems="center">
            <Text fontSize="lg">〇〇さんからのアドバイス</Text>
            <Text color="gray">男性・学生</Text>
          </HStack>
          <Text width="700px">{advice!.content}</Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default AdviceDetailPage;
