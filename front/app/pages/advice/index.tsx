import type { NextPage } from "next";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import AdviceCell from "../../src/components/advice/AdviceCell";
import AdviceSearchPanel from "../../src/components/advice/AdviceSearchPanel";
import { useGetAdvices } from "../../src/api/AdviceAPI";

const AdvicePage: NextPage = () => {
  const { data: advices, isError, isLoading } = useGetAdvices();

  if (isError) {
    return <Text>エラーが発生しました。</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex align="center" flexDir="column">
      <Heading my={16}>みんなのアドバイス</Heading>
      <AdviceSearchPanel />
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
