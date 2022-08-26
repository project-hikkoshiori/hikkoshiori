import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
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
        <Box backgroundColor="pink.300" w="40" h="40" ml="5" mr="5">
          ここに画像が入ります
        </Box>
        <VStack>
          <Text>￥{property.rent}</Text>
          <Text>{property.name}</Text>
          <Text>{property.fromStation}</Text>
        </VStack>
      </Flex>
      <Flex>
        <Spacer />
        <Text>データ取得日: {property.updatedAt}</Text>
      </Flex>
    </Stack>
  );
};
