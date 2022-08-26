import { Heading, VStack } from "@chakra-ui/react";
import HouseKeepRow from "./HouseKeepRow";

const HouseKeepSection = () => (
  <VStack align="left">
    <Heading as="h3" fontSize="md">
      不動産系
    </Heading>
    <HouseKeepRow />
    <HouseKeepRow />
    <HouseKeepRow />
  </VStack>
);

export default HouseKeepSection;
