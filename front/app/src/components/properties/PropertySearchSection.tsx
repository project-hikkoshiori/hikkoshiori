import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Property } from "../../utils/types";
import { PropertyRentHist } from "./PropertyRentHist";
import { PropertySearchMap } from "./PropertySearchMap";
import { PropertySearchWindow } from "./PropertySearchWindow";

export const PropertySearchSection = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [rentRangeState, setRentRangeState] = useState<number[]>([0, 70000]);
  const toggleChecked = (value: string) => {
    if (checked.indexOf(value) == -1) {
      setChecked((prev) => [...prev, value]);
    } else {
      setChecked((prev) => prev.filter((v) => v != value));
    }
  };
  const handleSubmit = () => {
    // responseがpropertiesになる
    console.log(`checked: ${checked}, rent: ${rentRangeState}`);
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
    <Flex>
      <Box w="45%">
        <Stack alignContent="left">
          <Box
            backgroundColor="white"
            p="2"
            border="1px"
            borderColor="brand.100"
            borderRadius="4px"
          >
            <Text fontWeight="semibold">属性条件</Text>
            <CheckboxGroup colorScheme="brand">
              <Stack direction="row" p="2">
                <Checkbox
                  mx={4}
                  borderColor="brand.100"
                  onChange={() => toggleChecked("南向き")}
                >
                  南向き
                </Checkbox>
                <Checkbox
                  mx={4}
                  borderColor="brand.100"
                  onChange={() => toggleChecked("二階以上")}
                >
                  二階以上
                </Checkbox>
                <Checkbox
                  mx={4}
                  borderColor="brand.100"
                  onChange={() => toggleChecked("宅配ボックス")}
                >
                  宅配ボックス
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
          <Box
            backgroundColor="white"
            p="2"
            border="1px"
            borderColor="brand.100"
            borderRadius="4px"
          >
            <Text fontWeight="semibold">家賃条件</Text>
            <PropertyRentHist
              rentRangeState={rentRangeState}
              setRentRangeState={setRentRangeState}
            />
          </Box>
          <Button type="submit" colorScheme="brand" onClick={handleSubmit}>
            検索
          </Button>
        </Stack>
        <Text fontWeight="semibold" pt="5">
          検索結果
        </Text>
        <Box
          overflowY="auto"
          maxH="800"
          sx={{
            "::-webkit-scrollbar": {
              height: "10px",
            },
            "::-webkit-scrollbar-thumb": {
              borderRadius: "20px",
              backgroundColor: "brand.100",
            },
          }}
        >
          {properties.map((p: Property) => (
            <Box key={p.id} p="5">
              <PropertySearchWindow property={p} />
            </Box>
          ))}
        </Box>
      </Box>
      <Spacer />
      <Box w="50%">
        <PropertySearchMap properties={properties} />
      </Box>
    </Flex>
  );
};
