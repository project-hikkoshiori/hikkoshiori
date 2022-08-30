import NextLink from "next/link";
import { ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Circle,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdWorkOutline, MdOutlineListAlt } from "react-icons/md";
import ExternalLink from "../ExternalLink";

const PaperResultSection = () => {
  return (
    <VStack align="left">
      <HStack>
        <Circle size={10} bg="brand.100">
          1
        </Circle>
        <Heading as="h3" fontSize="md">
          区役所
        </Heading>
      </HStack>
      <VStack align="left" pl={12}>
        <HStack align="left">
          <Icon as={MdWorkOutline} />
          <Heading as="h4" fontSize="md">
            持ち物
          </Heading>
        </HStack>
        <Text pl={7}>印鑑</Text>
        <HStack align="left" pt={2}>
          <Icon as={MdOutlineListAlt} />
          <Heading as="h4" fontSize="md">
            やること
          </Heading>
        </HStack>
        <ExternalLink href="" text="転出届" />
        <ExternalLink
          href=""
          text="国民健康保険の資格喪失届国民健康保険の資格喪失届"
        />
      </VStack>
    </VStack>
  );
};

export default PaperResultSection;
