import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";

const HouseKeep: NextPage = () => {
  return (
    <VStack>
      <Heading>家計簿試算</Heading>
      <HStack>
        <VStack>
          <Box>ここに家計簿</Box>
          <Text>合計 ¥400,000</Text>
        </VStack>
        <VStack>
          <Button width="210px" colorScheme="brand">
            保存する
          </Button>
          <Button width="210px" colorScheme="brand">
            最初に戻す
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default HouseKeep;
