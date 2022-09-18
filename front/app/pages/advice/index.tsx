import type { NextPage } from "next";
import NextLink from "next/link";
import {
  Button,
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import AdviceCell from "../../src/components/advice/AdviceCell";
import AdviceSearchPanel from "../../src/components/advice/AdviceSearchPanel";
import { useGetAdvices } from "../../src/api/AdviceAPI";
import { useState } from "react";

const AdvicePage: NextPage = () => {
  const [url, setUrl] = useState("/advices/filter");
  const { data: advices, isError, isLoading } = useGetAdvices(url);

  if (isError) {
    return <Text>エラーが発生しました。</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex align="center" flexDir="column">
      <Center pos="relative" width="80%">
        <NextLink href="/advice/post" passHref>
          <Button
            as="a"
            colorScheme="brand"
            pos="absolute"
            zIndex="docked"
            transform="translateY(-50%)"
            top="50%"
            right="0"
          >
            アドバイスを投稿する
          </Button>
        </NextLink>
        <Heading my={16}>みんなのアドバイス</Heading>
      </Center>
      <AdviceSearchPanel setUrl={setUrl} />
      <Box width="80%">
        <Text align="end">{advices!.length}件</Text>
      </Box>
      <SimpleGrid columns={3}>
        {advices!.map((advice) => (
          <AdviceCell key={advice.user_id} advice={advice} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default AdvicePage;
