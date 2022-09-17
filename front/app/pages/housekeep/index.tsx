import { Heading, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useGetHouseKeeps } from "../../src/api/HousekeepAPI";
import HouseKeepList from "../../src/components/houseKeep/HouseKeepList";

const HouseKeep: NextPage = () => {
  const { data, isLoading } = useGetHouseKeeps(
    "81f981b2-bdfa-4b98-b1a3-b4669f948a12"
  );

  if (isLoading || !data) {
    return <Text>読み込み中……</Text>;
  }

  return (
    <VStack>
      <Heading>家計簿試算</Heading>
      <HouseKeepList housekeeps={data!} />
    </VStack>
  );
};

export default HouseKeep;
