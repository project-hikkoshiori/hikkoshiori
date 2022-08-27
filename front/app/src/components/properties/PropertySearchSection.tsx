import { Box, Flex, Spacer } from "@chakra-ui/react";
import { PropertySearchMap } from "./PropertySearchMap";

export const PropertySearchSection = () => {
  return (
    <Flex>
      <Spacer />
      <Box w="50%">
        <PropertySearchMap />
      </Box>
    </Flex>
  );
};
