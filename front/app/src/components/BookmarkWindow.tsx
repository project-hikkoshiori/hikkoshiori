import { StarIcon } from "@chakra-ui/icons";
import { Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { Property } from "../utils/types";

type Props = {
  property: Property;
};

export const BookmarkWindow = ({ property }: Props) => {
  return (
    <Stack backgroundColor="pink.50" w="30%" mb="20">
      <Flex>
        <Spacer />
        <StarIcon color="yellow.300" />
      </Flex>
      <Flex>
        <Spacer />
        <Text>{property.updatedAt}</Text>
      </Flex>
    </Stack>
  );
};
