import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { Property } from "../../utils/types";

type Props = {
  property: Property;
};

export const BookmarkWindow = ({ property }: Props) => {
  return (
    <Stack
      backgroundColor="white"
      p="2"
      border="1px"
      borderColor="brand.100"
      borderRadius="4px"
    >
      <Flex>
        <Spacer />
        <StarIcon color="yellow.300" />
      </Flex>
      <Flex>
        <Box backgroundColor="brand.300" boxSize="40" ml="5" mr="5">
          ここに画像が入ります
        </Box>
        <VStack align="left">
          <Text>￥{property.rent}</Text>
          <Text>{property.name}</Text>
          <Text>{property.fromStation}</Text>
        </VStack>
      </Flex>
      <Box>
        <Text align="end">データ取得日: {property.updatedAt}</Text>
      </Box>
    </Stack>
  );
};
