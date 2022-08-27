import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Property } from "../../utils/types";
import { PropertySearchMap } from "./PropertySearchMap";

export const PropertySearchSection = () => {
  // mock
  const properties: Property[] = [
    {
      id: "0571ce59-54be-a49e-58fb-15d828eb7b92",
      name: "テストデータ１",
      updatedAt: "2022/09/11",
      fromStation: "hoge駅から徒歩5分",
      rent: 40000,
      address: "東京都千代田区丸の内１丁目",
    },
    {
      id: "c572cba2-a0d7-27cf-9429-79e96f594557",
      name: "テストデータ２",
      updatedAt: "2022/09/11",
      fromStation: "hoge駅から徒歩5分",
      rent: 40000,
      address: "東京都千代田区丸の内１丁目",
    },
    {
      id: "d2f8c50f-bb5f-24d2-b2e3-dde9c24fa872",
      name: "テストデータ３",
      updatedAt: "2022/09/11",
      fromStation: "hoge駅から徒歩4分",
      rent: 40000,
      address: "東京都千代田区丸の内１丁目",
    },
    {
      id: "17388364-758b-feb3-b157-4279eb5d0c6e",
      name: "テストデータ４",
      updatedAt: "2022/09/11",
      fromStation: "hoge駅から徒歩3分",
      rent: 40000,
      address: "東京都千代田区丸の内１丁目",
    },
  ];
  return (
    <Flex>
      ここに検索フィルターとかが入る
      <Spacer />
      <Box w="50%">
        <PropertySearchMap properties={properties} />
      </Box>
    </Flex>
  );
};
