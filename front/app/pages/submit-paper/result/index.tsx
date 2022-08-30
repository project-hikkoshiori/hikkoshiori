import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import arrowSrc from "../../../public/Arrow.png";
import PaperResultList from "../../../src/components/submit-paper/PaperResultList";

const PaperResult: NextPage = () => {
  return (
    <VStack my={4}>
      <Heading my={8}>ざとさん専用 提出書類フローチャート</Heading>
      <HStack align="start">
        <Image src={arrowSrc} alt="矢印" />
        <PaperResultList />
      </HStack>
    </VStack>
  );
};

export default PaperResult;
