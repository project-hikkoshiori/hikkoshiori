import type { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/react";
import AdviceCell from "../../src/components/AdviceCell";

const Advice: NextPage = () => {
  const advices = [1, 2, 3, 4, 5, 6];
  return (
    <Flex align="center" flexDir="column">
      <Heading>みんなのアドバイス</Heading>
      <Flex wrap="wrap" justify="center">
        {advices.map((advice) => (
          <AdviceCell key={advice} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Advice;
