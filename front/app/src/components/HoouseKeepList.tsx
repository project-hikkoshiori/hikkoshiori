import { VStack, Text } from "@chakra-ui/react";
import HouseKeepSection from "./HouseKeepSection";

const HouseKeepList = () => (
  <VStack align="end" p={2}>
    <VStack
      maxW="700px"
      height="calc(100vh - 186px)"
      gap={4}
      align="left"
      overflow="auto"
    >
      <HouseKeepSection />
      <HouseKeepSection />
      <HouseKeepSection />
    </VStack>
    <Text textAlign="right" height="50px">
      合計 ¥400,000
    </Text>
  </VStack>
);

export default HouseKeepList;
