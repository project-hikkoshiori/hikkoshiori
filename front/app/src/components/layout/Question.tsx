import {
  Box,
  Button,
  HStack,
  Progress,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LayoutQuestion } from "../../utils/types";

type Props = {
  question: LayoutQuestion;
  onClick: () => void;
};

const QuestionView = ({ question, onClick }: Props) => (
  <VStack height="calc(100% - 40px)">
    <Text my={2}>Q{question.number}</Text>
    <HStack gap={20}>
      <Box
        as="button"
        bg="gray.500"
        height="320px"
        width="240px"
        onClick={onClick}
      >
        画像1
      </Box>
      <Box
        as="button"
        bg="gray.500"
        height="320px"
        width="240px"
        onClick={onClick}
      >
        画像2
      </Box>
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
