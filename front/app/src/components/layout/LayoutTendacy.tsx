import { Box, HStack, Progress, Spacer, Text, VStack } from "@chakra-ui/react";

type Props = {
  title: string;
  percent: number;
};
const LayoutTendacy = ({ title, percent }: Props) => (
  <VStack align="start" my={2}>
    <Box mb={8}>
      <Text fontSize="lg">{title}</Text>
      <Progress
        my={2}
        height="40px"
        width="450px"
        value={percent}
        colorScheme="brand"
      />
      <HStack width="450px">
        <Text fontSize="sm">重要でない</Text>
        <Spacer />
        <Text fontSize="sm">重要</Text>
      </HStack>
    </Box>
  </VStack>
);

export default LayoutTendacy;
