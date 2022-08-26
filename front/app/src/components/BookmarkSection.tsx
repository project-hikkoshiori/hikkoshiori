import { SettingsIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Spacer,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Property } from "../utils/types";
import { BookmarkWindow } from "./BookmarkWindow";

export const BookmarkSection = () => {
  // mock
  const properties: Property[] = [
    {
      id: "0571ce59-54be-a49e-58fb-15d828eb7b92",
      name: "テストデータ１",
      updatedAt: "2022/09/11",
    },
    {
      id: "c572cba2-a0d7-27cf-9429-79e96f594557",
      name: "テストデータ２",
      updatedAt: "2022/09/11",
    },
    {
      id: "d2f8c50f-bb5f-24d2-b2e3-dde9c24fa872",
      name: "テストデータ３",
      updatedAt: "2022/09/11",
    },
    {
      id: "17388364-758b-feb3-b157-4279eb5d0c6e",
      name: "テストデータ４",
      updatedAt: "2022/09/11",
    },
  ];
  return (
    <Stack>
      <Flex mt="100" ml="5" mr="5" mb="10">
        <Spacer />
        <ButtonGroup gap="2">
          <Button colorScheme="pink" leftIcon={<SettingsIcon />}>
            編集する
          </Button>
          <Button colorScheme="pink" leftIcon={<ViewIcon />}>
            マップを表示
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex flexWrap="wrap" gap="5%">
        {properties.map((p: Property) => (
          <BookmarkWindow key={p.id} property={p} />
        ))}
      </Flex>
    </Stack>
  );
};
