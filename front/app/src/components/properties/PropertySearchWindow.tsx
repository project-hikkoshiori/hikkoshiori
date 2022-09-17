import { Box, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { Property } from "../../utils/types";

type Props = {
  property: Property;
};

export const PropertySearchWindow = ({ property }: Props) => {
  return (
    <Stack
      backgroundColor="white"
      p="2"
      border="1px"
      borderColor="brand.100"
      borderRadius="4px"
    >
      <Flex pt="2">
        <Box backgroundColor="brand.300" boxSize="40" ml="5" mr="5">
          ここに画像が入ります
        </Box>
        <VStack align="left">
          <Text>{property.house_layout}</Text>
          <Text>家賃：￥{property.monthly_rent_price}</Text>
          <Text>初期費用：￥{property.initial_cost}</Text>
          <Text>{property.location}</Text>
          <Text>{property.distance_station_raw}</Text>
        </VStack>
      </Flex>
      <Box>
        <Text align="end">データ取得日: {property.fetched_at}</Text>
      </Box>
    </Stack>
  );
};
