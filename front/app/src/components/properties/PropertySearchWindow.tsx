import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSWRConfig } from "swr";
import {
  addBookmarkProperty,
  deleteBookmarkProperty,
  getBookmaerkedPropertiesPath,
} from "../../api/BookmarkedPropertyAPI";
import { Property } from "../../utils/types";

type Props = {
  property: Property;
};

export const PropertySearchWindow = ({ property }: Props) => {
  const { mutate } = useSWRConfig();

  const onClickBookmarkButton = () => {
    const isBookmarked = true;
    const user_id = "";
    if (isBookmarked) {
      deleteBookmarkProperty({ user_id, property }).then((res) => {
        if (!res.isError) mutate(getBookmaerkedPropertiesPath(user_id));
      });
    } else {
      addBookmarkProperty({ user_id, property }).then((res) => {
        if (!res.isError) mutate(getBookmaerkedPropertiesPath(user_id));
      });
    }
  };

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
        <IconButton
          aria-label="Search database"
          icon={<StarIcon color="yellow.300" />}
          variant="unstyled"
          onClick={onClickBookmarkButton}
        />
      </Flex>
      <Flex pt="2">
        <Box backgroundColor="brand.300" boxSize="40" ml="5" mr="5">
          ここに画像が入ります
        </Box>
        <VStack align="left">
          <Text>{property.house_layout}</Text>
          <Text>家賃：￥{property.monthly_rent_price}</Text>
          <Text>初期費用：￥{property.initial_cost}</Text>
          <Text>
            {property.location.replaceAll("n", "").replaceAll("\\", "")}
          </Text>
          <Text>
            {property.distance_station_raw
              .replaceAll("n", "")
              .replaceAll("\\", "")}
          </Text>
        </VStack>
      </Flex>
      <Box>
        <Text align="end">データ取得日: {property.fetched_at}</Text>
      </Box>
    </Stack>
  );
};
