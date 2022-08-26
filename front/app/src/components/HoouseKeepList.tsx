import { Box, VStack, Text } from "@chakra-ui/react";

const HouseKeepList = () => (
  <VStack align="end" p={2}>
    <Box width="700px" height="75vh">
      ここに家計簿
    </Box>
    <Text textAlign="right">合計 ¥400,000</Text>
  </VStack>
);

export default HouseKeepList;
