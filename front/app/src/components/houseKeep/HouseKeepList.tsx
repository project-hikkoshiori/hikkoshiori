import { VStack, Text } from "@chakra-ui/react";
import { HouseKeepTable } from "../../utils/types";
import HouseKeepSection from "./HouseKeepSection";

type Props = {
  housekeeps: HouseKeepTable[];
};

const HouseKeepList = ({ housekeeps }: Props) => (
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
      {housekeeps.map((housekeep) => (
        <HouseKeepSection houseKeepTable={housekeep} key={housekeep.id} />
      ))}
    </VStack>
    <Text textAlign="right" height="50px">
      合計 ¥400,000
    </Text>
  </VStack>
);

export default HouseKeepList;
