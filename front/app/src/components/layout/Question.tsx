import { Box, HStack, Progress, Spacer, Text, VStack } from "@chakra-ui/react";
import { LayoutQuestion } from "../../utils/types";
import LayoutImage from "./LayoutImage";

type Props = {
  question: LayoutQuestion;
  onClick: () => void;
};

const QuestionView = ({ question, onClick }: Props) => (
  <VStack height="calc(100% - 40px)">
    <Text my={2}>Q{question.number}</Text>
    <HStack gap={20}>
      <LayoutImage src={question.imageSrc[0]} onClick={onClick} />
      <LayoutImage src={question.imageSrc[1]} onClick={onClick} />
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
