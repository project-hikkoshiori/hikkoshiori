import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdStar, MdStarOutline } from "react-icons/md";
import { useSWRConfig } from "swr";
import {
  addBookmarkProperty,
  deleteBookmarkProperty,
  getBookmaerkedPropertiesPath,
} from "../../api/BookmarkedPropertyAPI";
import { PropertyWithBookMark } from "../../utils/types";

type Props = {
  property: PropertyWithBookMark;
};

export const PropertySearchWindow = ({ property }: Props) => {
  const { mutate } = useSWRConfig();

  const onClickBookmarkButton = () => {
    const user_id = "cf247d02-36df-11ed-b17a-0242ac1f0004";
    if (property.is_bookmarked) {
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
          icon={
            property.is_bookmarked ? (
              <MdStar color="gold" size="2em" />
            ) : (
              <MdStarOutline color="black" size="2em" />
            )
          }
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
