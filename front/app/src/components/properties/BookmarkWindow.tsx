import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { MdStar, MdStarOutline } from "react-icons/md";
import {
  deleteBookmarkProperty,
  addBookmarkProperty,
} from "../../api/BookmarkedPropertyAPI";
import { useGetUsers } from "../../api/UserAPI";
import { Property, PropertyWithBookMark } from "../../utils/types";
import iconSrc from "../../../public/icon.png";

type Props = {
  property: Property & Partial<Pick<PropertyWithBookMark, "is_bookmarked">>;
};

export const BookmarkWindow = ({ property }: Props) => {
  const toast = useToast();
  const { data: users } = useGetUsers();
  const { data: session } = useSession();
  const user = users?.filter((u) => u.name == session?.user?.name)[0];

  const [isBookMarked, setIsBookMarked] = useState(
    property.is_bookmarked ?? true
  );

  const onClickBookmarkButton = () => {
    if (!user) {
      toast({
        title: "ログインしていません",
        description: "ブックマーク機能を利用するにはログインしてください",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const user_id = user.id;
    if (isBookMarked) {
      deleteBookmarkProperty({ user_id, property }).then((res) => {
        if (!res.isError) setIsBookMarked(false);
      });
    } else {
      addBookmarkProperty({ user_id, property }).then((res) => {
        if (!res.isError) setIsBookMarked(true);
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
            isBookMarked ? (
              <MdStar color="gold" size="2em" />
            ) : (
              <MdStarOutline color="black" size="2em" />
            )
          }
          variant="unstyled"
          onClick={onClickBookmarkButton}
        />
      </Flex>
      <Flex>
        <Box px={2}>
          <Image
            src={property.image_src ?? iconSrc}
            alt={property.location + "の物件の間取り"}
            width="300px"
            height="300px"
            objectFit="contain"
          />
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
