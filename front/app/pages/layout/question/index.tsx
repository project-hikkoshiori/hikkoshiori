import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import WeitingResult from "../../../src/components/layout/WeitingResult";
import QuestionView from "../../../src/components/layout/Question";
import { LayoutQuestion } from "../../../src/utils/types";

const LayoutQuestion: NextPage = () => {
  const router = useRouter();
  const [isWaitingResult, setIsWaitingResult] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions: LayoutQuestion[] = [
    {
      number: 1,
      maxQuestion: 3,
      imageSrc: ["", ""],
    },
    {
      number: 2,
      maxQuestion: 3,
      imageSrc: ["", ""],
    },
    {
      number: 3,
      maxQuestion: 3,
      imageSrc: ["", ""],
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
      setTimeout(() => router.push("/layout/result"), 1000);
    }
  };

  return (
    <VStack my={4} height="calc(100vh - 61px - 32px)">
      <Heading my={8}>レイアウト タイプ診断</Heading>
      {isWaitingResult ? (
        <WeitingResult />
      ) : (
        <QuestionView question={questions[questionIndex]} onClick={onClick} />
      )}
    </VStack>
  );
};

export default LayoutQuestion;
