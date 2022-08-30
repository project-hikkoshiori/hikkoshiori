import NextLink from "next/link";
import { Button, Heading, HStack, VStack } from "@chakra-ui/react";
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
      <NextLink href="" passHref>
        <Button as="a" colorScheme="brand" height="64px">
          フローチャートを再生成する
        </Button>
      </NextLink>
    </VStack>
  );
};

export default PaperResult;
