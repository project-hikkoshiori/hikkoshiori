import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import WeitingResult from "../../../src/components/submit-paper/WeitingResult";
import QuestionView from "../../../src/components/submit-paper/Question";
import { PaperQuestion } from "../../../src/utils/types";

const PaperQuestion: NextPage = () => {
  const router = useRouter();
  const [isWaitingResult, setIsWaitingResult] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions: PaperQuestion[] = [
    {
      number: 1,
      maxQuestion: 3,
      content: "なんかいい感じに質問ですか？",
    },
    {
      number: 2,
      maxQuestion: 3,
      content: "次の質問に進みます",
    },
    {
      number: 3,
      maxQuestion: 3,
      content: "これで最後です！",
    },
  ];

  const onClick = () => {
    if (questionIndex < questions.length - 1) {
      // TODO: はいかいいえを記録する
      setQuestionIndex((prev) => prev + 1);
    } else {
      // TODO: 結果をサーバーに送る？
      setIsWaitingResult(true);
      // TODO: データが返ってきたら遷移
      setTimeout(() => router.push("/submit-paper/result"), 1000);
    }
  };

  return (
    <VStack my={4} height="calc(100vh - 61px - 32px)">
      <Heading my={8}>提出書類フローチャート</Heading>
      {isWaitingResult ? (
        <WeitingResult />
      ) : (
        <QuestionView question={questions[questionIndex]} onClick={onClick} />
      )}
    </VStack>
  );
};

export default PaperQuestion;
