import { Button, VStack, Text, HStack, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { HouseKeepTable } from "../../utils/types";
import HouseKeepSection from "./HouseKeepSection";

type Props = {
  housekeeps: HouseKeepTable[];
};

const HouseKeepList = ({ housekeeps }: Props) => {
  const [sectionSums, setSectionSums] = useState(
    housekeeps.map((housekeep) =>
      housekeep.data.reduce((prev, curr) => prev + curr.value, 0)
    )
  );

  const setSectionSum = (updateIndex: number) => (newSum: number) => {
    setSectionSums((prev) =>
      prev.map((value, index) => (index == updateIndex ? newSum : value))
    );
  };

  const price = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  });

  return (
    <VStack align="end" p={2}>
      <VStack
        maxW="700px"
        minW="500px"
        height="calc(100vh - 186px)"
        gap={4}
        align="left"
        overflow="auto"
        background="linear-gradient(white 0%, white 100%) 0 0/100% 8px,linear-gradient(white 0%, white 100%) bottom/100% 8px,radial-gradient(ellipse 50% 8px at top, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0) 100%) 0 0/100% 8px,radial-gradient(ellipse 50% 8px  at bottom , rgba(0,0,0,0.2) 0%, rgba(255,255,255,0) 100%) bottom/100% 8px"
        backgroundRepeat="no-repeat"
        backgroundAttachment="local, local, scroll, scroll"
      >
        {housekeeps.map((housekeep, index) => (
          <HouseKeepSection
            houseKeepTable={housekeep}
            onUpdate={setSectionSum(index)}
            key={housekeep.id}
          />
        ))}
      </VStack>
      <HStack width="700px">
        <Button width="210px" colorScheme="brand">
          最初に戻す
        </Button>
        <Spacer />
        <Text textAlign="right" height="50px">
          合計 {price.format(sectionSums.reduce((prev, curr) => prev + curr))}
        </Text>
      </HStack>
    </VStack>
  );
};

export default HouseKeepList;
