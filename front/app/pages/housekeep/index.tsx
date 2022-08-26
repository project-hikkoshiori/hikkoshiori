import { Button, Heading, HStack, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import HouseKeepList from "../../src/components/HoouseKeepList";

const HouseKeep: NextPage = () => {
  return (
    <VStack>
      <Heading>家計簿試算</Heading>
      <HStack align="top">
        <HouseKeepList />
        <VStack borderLeft="1px" borderColor="gray.300" p={2}>
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
