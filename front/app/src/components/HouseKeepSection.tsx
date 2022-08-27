import { Heading, IconButton, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import HouseKeepRow from "./HouseKeepRow";

const HouseKeepSection = () => (
  <VStack align="left">
    <Heading as="h3" fontSize="md">
      不動産系
    </Heading>
    <HouseKeepRow />
    <HouseKeepRow />
    <HouseKeepRow />
    <IconButton
      aria-label="add row"
      icon={<AddIcon />}
      variant="outline"
      colorScheme="brand"
      border="none"
    />
  </VStack>
);

export default HouseKeepSection;
