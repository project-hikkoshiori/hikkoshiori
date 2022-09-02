import type { NextPage } from "next";
import { Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import WeitingResult from "../../../src/components/submit-paper/WeitingResult";
import QuestionView from "../../../src/components/submit-paper/Question";
import { Question } from "../../../src/utils/types";

const PaperQuestion: NextPage = () => {
  const [isWaitingResult, setIsWeitingResult] = useState(false);
  const question: Question = {
    number: 1,
    max: 5,
    text: "なんかいい感じに質問ですか？",
  };
  return (
    <VStack my={4}>
      <Heading my={8}>提出書類フローチャート</Heading>
      {isWaitingResult ? (
        <WeitingResult />
      ) : (
        <QuestionView question={question} />
      )}
    </VStack>
  );
};

export default PaperQuestion;
