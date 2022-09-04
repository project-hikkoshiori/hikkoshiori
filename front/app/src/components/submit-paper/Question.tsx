import {
  Box,
  Button,
  HStack,
  Progress,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PaperQuestion } from "../../utils/types";

type Props = {
  question: PaperQuestion;
  onClick: () => void;
};

const QuestionView = ({ question, onClick }: Props) => (
  <VStack height="calc(100% - 40px)">
    <Text my={32}>
      Q{question.number}. {question.content}
    </Text>
    <HStack>
      <Button colorScheme="brand" height="64px" width="400px" onClick={onClick}>
        いいえ
      </Button>
      <Button colorScheme="brand" height="64px" width="400px" onClick={onClick}>
        はい
      </Button>
    </HStack>
    <Spacer />
    <Box p={10}>
      <Progress
        height="20px"
        width="500px"
        value={question.number}
        max={question.maxQuestion}
        colorScheme="brand"
      />
      <HStack width="500px">
        <Text>0</Text>
        <Spacer />
        <Text>{question.maxQuestion}</Text>
      </HStack>
    </Box>
  </VStack>
);

export default QuestionView;
