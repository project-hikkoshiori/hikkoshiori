import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import arrowSrc from "../../../public/Arrow.png";

const PaperResult: NextPage = () => {
  return (
    <VStack my={4}>
      <Heading my={8}>ざとさん専用 提出書類フローチャート</Heading>
      <HStack>
        <Image src={arrowSrc} alt="矢印" />
        <Box width="500px">ここに結果</Box>
      </HStack>
    </VStack>
  );
};

export default PaperResult;
