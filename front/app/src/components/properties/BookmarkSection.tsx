import { SettingsIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  SimpleGrid,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Property } from "../../utils/types";
import { BookmarkWindow } from "./BookmarkWindow";
import { PropertySearchMap } from "./PropertySearchMap";

export const BookmarkSection = () => {
  const [mapMode, setMapMode] = useState(false);
  const toggleMapMode = () => {
    setMapMode(!mapMode);
  };
  // mock
  const properties: Property[] = [
    {
      id: "0571ce59-54be-a49e-58fb-15d828eb7b92",
      name: "テストデータ１",
      updatedAt: "2022/09/11",
      fromStation: "hoge駅から徒歩5分",
      rent: 40000,
      address: "hoge市",
      lat: 35.68156,
      lng: 139.767201,
    },
    {
      id: "c572cba2-a0d7-27cf-9429-79e96f594557",
      name: "テストデータ２",
      updatedAt: "2022/09/11",
      fromStation: "hoge駅から徒歩5分",
      rent: 40000,
      address: "hoge市",
      lat: 35.78156,
      lng: 139.767201,
    },
    {
      id: "d2f8c50f-bb5f-24d2-b2e3-dde9c24fa872",
      name: "テストデータ３",
      updatedAt: "2022/09/11",
      fromStation: "hoge駅から徒歩4分",
      rent: 40000,
      address: "hoge市",
      lat: 35.88156,
      lng: 139.767201,
    },
    {
      id: "17388364-758b-feb3-b157-4279eb5d0c6e",
      name: "テストデータ４",
      updatedAt: "2022/09/11",
      fromStation: "hoge駅から徒歩3分",
      rent: 40000,
      address: "hoge市",
      lat: 35.98156,
      lng: 139.767201,
    },
  ];
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
        <PropertySearchMap properties={properties} />
      ) : (
        <SimpleGrid columns={3} spacing={10}>
          {properties.map((p: Property) => (
            <BookmarkWindow key={p.id} property={p} />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
};