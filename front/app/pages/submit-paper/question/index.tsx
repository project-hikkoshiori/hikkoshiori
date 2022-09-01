import type { NextPage } from "next";
import {
  Button,
  Heading,
  HStack,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import WeitingResult from "../../../src/components/submit-paper/WeitingResult";

const PaperQuestion: NextPage = () => {
  const [isWaitingResult, setIsWeitingResult] = useState(false);
  return (
    <VStack my={4}>
      <Heading my={8}>提出書類フローチャート</Heading>
      {isWaitingResult ? (
        <WeitingResult />
      ) : (
        <>
          <Text mb={40}>Q1. なんかいい感じに質問してください？</Text>
          <HStack>
            <Button colorScheme="brand" height="64px" width="400px">
              いいえ
            </Button>
            <Button colorScheme="brand" height="64px" width="400px">
              はい
            </Button>
          </HStack>
          <Progress
            height="20px"
            width="500px"
            value={20}
            colorScheme="brand"
          />
        </>
      )}
    </VStack>
  );
};

export default PaperQuestion;
