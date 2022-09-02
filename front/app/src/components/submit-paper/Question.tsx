import { Button, HStack, Progress, Text, VStack } from "@chakra-ui/react";
import { Question } from "../../utils/types";

type Props = {
  question: Question;
  onClick: () => void;
};

const QuestionView = ({ question, onClick }: Props) => (
  <VStack>
    <Text mb={40}>
      Q{question.number}. {question.text}
    </Text>
    <HStack>
      <Button colorScheme="brand" height="64px" width="400px" onClick={onClick}>
        いいえ
      </Button>
      <Button colorScheme="brand" height="64px" width="400px" onClick={onClick}>
        はい
      </Button>
    </HStack>
    <Progress
      height="20px"
      width="500px"
      value={question.number}
      max={question.max}
      colorScheme="brand"
    />
  </VStack>
);

export default QuestionView;
