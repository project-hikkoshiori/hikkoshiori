import type { NextPage } from "next";
import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import AdviceCell from "../../src/components/AdviceCell";

const Advice: NextPage = () => {
  const advices = [1, 2, 3, 4, 5, 6];
  return (
    <Flex align="center" flexDir="column">
      <Heading>みんなのアドバイス</Heading>
      <SimpleGrid columns={3}>
        {advices.map((advice) => (
          <AdviceCell key={advice} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Advice;
