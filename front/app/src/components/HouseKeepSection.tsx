import { useState } from "react";
import { Heading, IconButton, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import HouseKeepRow from "./HouseKeepRow";
import { HouseKeep } from "../utils/types";

const HouseKeepSection = () => {
  const [houseKeepDatas, setHouseKeepDatas] = useState<HouseKeep[]>([]);

  const addHouseKeepData = () => {
    const newHouseKeepData: HouseKeep = {
      id: houseKeepDatas.length.toString(),
      title: "",
      value: 0,
      isUserAdded: true,
    };
    setHouseKeepDatas((prev) => [...prev, newHouseKeepData]);
  };

  const deleteHouseKeepData = (id: string) => {
    setHouseKeepDatas((prev) => [...prev.filter((data) => data.id !== id)]);
  };

  return (
    <VStack align="left">
      <Heading as="h3" fontSize="md">
        不動産系
      </Heading>
      {houseKeepDatas.map((houseKeepData) => (
        <HouseKeepRow
          key={houseKeepData.id}
          houseKeepData={houseKeepData}
          onDelete={deleteHouseKeepData}
        />
      ))}
      <IconButton
        aria-label="add row"
        icon={<AddIcon />}
        variant="outline"
        colorScheme="brand"
        border="none"
        onClick={() => addHouseKeepData()}
      />
    </VStack>
  );
};

export default HouseKeepSection;
