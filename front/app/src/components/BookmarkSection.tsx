import { SettingsIcon, ViewIcon } from "@chakra-ui/icons";
import {
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
  const properties: Property[] = [
    {
      id: "",
      name: "",
    },
  ];
  return (
    <Stack>
      <Flex mt="100" ml="5" mr="5">
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
      <Flex>
        {properties.map((p: Property) => (
          <BookmarkWindow key={p.id} property={p} />
        ))}
      </Flex>
    </Stack>
  );
};
