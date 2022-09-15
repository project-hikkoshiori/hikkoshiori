import NextLink from "next/link";
import Image from "next/image";
import { Circle, Flex, VStack, Text, Spacer } from "@chakra-ui/react";
import { Advice } from "../../utils/types";

type Props = {
  advice: Advice;
};

const AdviceCell = ({ advice }: Props) => (
  <NextLink href={`/advice/${advice.user_id}`} passHref>
    <Flex
      as="a"
      height="280px"
      width="360px"
      m={4}
      p={4}
      border="1px"
      borderColor="brand.100"
      borderRadius="4px"
      align="top"
      _hover={{
        boxShadow: "base",
        rounded: "md",
        bg: "gray.50",
        ".seemore-link": {
          textDecor: "underline",
        },
      }}
    >
      <Circle size="60px" bg="brand.100" overflow="hidden" mr={2}>
        <Image
          src={advice.iconSrc}
          alt="user icon"
          height="60px"
          width="60px"
        />
      </Circle>
      <VStack align="right" flex="auto">
        <Text noOfLines={8}>{advice.content}</Text>
        <Spacer />
        <Text className="seemore-link" align="right">
          もっと見る{">"}
        </Text>
      </VStack>
    </Flex>
  </NextLink>
);

export default AdviceCell;
