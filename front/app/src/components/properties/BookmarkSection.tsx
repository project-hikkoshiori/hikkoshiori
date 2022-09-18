import { SettingsIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Flex,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useGetUsers } from "../../api/UserAPI";
import { useGetBookmarkedProperties } from "../../api/BookmarkedPropertyAPI";
import { BookmarkedProperty } from "../../utils/types";
import { BookmarkWindow } from "./BookmarkWindow";
import { PropertySearchMap } from "./PropertySearchMap";

export const BookmarkSection = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: users, isError, isLoading } = useGetUsers();
  const user = users?.filter((u) => u.name == session?.user?.name)[0];
  const { data: bookmarkedProperties, isError: isErrorProperty } =
    useGetBookmarkedProperties(user?.id ?? "");
  const [mapMode, setMapMode] = useState(false);
  const toggleMapMode = () => {
    setMapMode(!mapMode);
  };
  if (!user) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          ログインしていません
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          この機能をご覧になるには、
          <Text as="u" cursor="pointer" onClick={() => signIn("google")}>
            ログイン
          </Text>
          してください
        </AlertDescription>
      </Alert>
    );
  }
  if (isError || isErrorProperty || !bookmarkedProperties) {
    return <Text>エラーが発生しました。</Text>;
  }
  if (
    !isLoading &&
    users?.filter((u) => u.name == session?.user?.name).length == 0
  ) {
    router.push("/users/register");
  }
  return (
    <Stack p="5">
      <Flex mt="50" mb="5">
        <Spacer />
        <ButtonGroup gap="2">
          <Button colorScheme="brand" leftIcon={<SettingsIcon />}>
            編集する
          </Button>
          {mapMode ? (
            <Button
              colorScheme="brand"
              onClick={toggleMapMode}
              leftIcon={<ViewIcon />}
            >
              リストを表示
            </Button>
          ) : (
            <Button
              colorScheme="brand"
              onClick={toggleMapMode}
              leftIcon={<ViewIcon />}
            >
              マップを表示
            </Button>
          )}
        </ButtonGroup>
      </Flex>
      {mapMode ? (
        <PropertySearchMap properties={bookmarkedProperties} />
      ) : (
        <SimpleGrid columns={3} spacing={10}>
          {bookmarkedProperties.map((p: BookmarkedProperty) => (
            <BookmarkWindow key={p.id} property={p} />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
};
