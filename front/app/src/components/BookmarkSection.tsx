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

export const BookmarkSection = () => {
  return (
    <Flex mt="100" ml="5" mr="5">
      <Spacer />
      <ButtonGroup gap="2">
        <Button leftIcon={<SettingsIcon />}>編集する</Button>
        <Button leftIcon={<ViewIcon />}>マップを表示</Button>
      </ButtonGroup>
    </Flex>
  );
};
