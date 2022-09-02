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
    <Flex>
      <Box w="45%">
        <Stack alignContent="left">
          <Text fontWeight="semibold">属性条件</Text>
          <CheckboxGroup colorScheme="brand">
            <Stack direction="row" p="2">
              <Checkbox
                mx={4}
                borderColor="white"
                onChange={() => toggleChecked("南向き")}
              >
                南向き
              </Checkbox>
              <Checkbox
                mx={4}
                borderColor="white"
                onChange={() => toggleChecked("二階以上")}
              >
                二階以上
              </Checkbox>
              <Checkbox
                mx={4}
                borderColor="white"
                onChange={() => toggleChecked("宅配ボックス")}
              >
                宅配ボックス
              </Checkbox>
            </Stack>
          </CheckboxGroup>
          <Box pb="5">
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
        <Box overflowY="auto" maxH="800">
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
