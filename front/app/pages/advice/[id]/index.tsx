import type { NextPage } from "next";
import DefaultErrorPage from "next/error";
import NextLink from "next/link";
import { Box, Center, Flex, Heading, Link, Text } from "@chakra-ui/react";

const AdviceDetailPage: NextPage = () => {
  //   if (isError) {
  //     return <DefaultErrorPage statusCode={404} />;
  //   }

  //   if (isLoading) {
  //     return <Text>Loading...</Text>;
  //   }

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
