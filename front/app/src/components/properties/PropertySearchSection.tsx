import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Select,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import usePropertyWithBookmark from "../../hook/usePropertyWithBookmark";
import { PropertyWithBookMark } from "../../utils/types";
import { PropertySearchMap } from "./PropertySearchMap";
import { PropertySearchWindow } from "./PropertySearchWindow";

export const PropertySearchSection = () => {
  const [direction, setDirection] = useState("");
  const [leastTwoFloor, setLeastTwoFloor] = useState(false);
  const [initialCostZero, setInitialCostZero] = useState(false);
  const [url, setUrl] = useState("/property/filter");
  const handleSubmit = () => {
    // responseがpropertiesになる
    console.log("test");
    const query = [];
    if (direction != "") {
      query.push(`direction=${direction}`);
    }
    if (leastTwoFloor) {
      query.push("least_two_floor=true");
    }
    if (initialCostZero) {
      query.push("initial_cost_zero=true");
    }
    const queryPath = query.join("&");
    setUrl("/property/filter" + (queryPath.length != 0 ? "?" + queryPath : ""));
  };
  // mock
  const { data: properties, isError } = usePropertyWithBookmark({
    filterUrl: url,
    user_id: "cf247d02-36df-11ed-b17a-0242ac1f0004",
  });
  if (isError || !properties) {
    return <Text>エラーが発生しました。</Text>;
  }
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
            方角
            <Select onChange={(e) => setDirection(e.target.value)}>
              <option value="all">指定なし</option>
              <option value="north">北</option>
              <option value="south">南</option>
              <option value="east">東</option>
              <option value="west">西</option>
              <option value="northeast">北東</option>
              <option value="northwest">北西</option>
              <option value="southeast">南東</option>
              <option value="southwest">南西</option>
            </Select>
            <CheckboxGroup colorScheme="brand">
              <Stack direction="row" p="2">
                <Checkbox
                  mx={4}
                  borderColor="brand.100"
                  onChange={() => setLeastTwoFloor(!leastTwoFloor)}
                >
                  二階以上
                </Checkbox>
                <Checkbox
                  mx={4}
                  borderColor="brand.100"
                  onChange={() => setInitialCostZero(!initialCostZero)}
                >
                  初期費用ゼロ
                </Checkbox>
              </Stack>
            </CheckboxGroup>
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
          {properties.map((p: PropertyWithBookMark) => (
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
