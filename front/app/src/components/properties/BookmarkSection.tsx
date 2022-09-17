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
      id: "4f66a848-3369-11ed-9208-0242ac160004",
      location: "千葉県柏市布施974-19",
      lat: 36.68156,
      lng: 139.767201,
      monthly_rent_price: 63000,
      monthly_maintenance_fee: 0,
      initial_cost: 0,
      distance_station_raw: "JR常磐線 北柏駅 徒歩23分\n",
      house_layout: "3LDK",
      exclusive_area: 71.21,
      age_of_building: 42,
      floor_num: 1,
      direction: "南",
      fetched_at: "2022-09-13T05:41:01.682674",
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
