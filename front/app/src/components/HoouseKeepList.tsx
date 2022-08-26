import { VStack, Text } from "@chakra-ui/react";
import HouseKeepSection from "./HouseKeepSection";

const HouseKeepList = () => (
  <VStack align="end" p={2}>
    <VStack width="700px" height="75vh" gap={4} align="left">
      <HouseKeepSection />
      <HouseKeepSection />
      <HouseKeepSection />
    </VStack>
    <Text textAlign="right">合計 ¥400,000</Text>
  </VStack>
);

export default HouseKeepList;
