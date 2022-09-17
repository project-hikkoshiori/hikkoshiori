import { useState } from "react";
import { Heading, IconButton, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import HouseKeepRow from "./HouseKeepRow";
import { HouseKeep, HouseKeepTable } from "../../utils/types";

type Props = {
  houseKeepTable: HouseKeepTable;
};

const HouseKeepSection = ({ houseKeepTable }: Props) => {
  const [houseKeepDatas, setHouseKeepDatas] = useState<HouseKeep[]>(
    houseKeepTable.data
  );

  const addHouseKeepData = () => {
    const newHouseKeepData: HouseKeep = {
      id: houseKeepDatas.length.toString(),
      name: "",
      value: 0,
      is_prepared: true,
      table_name: houseKeepTable.name,
      table_id: houseKeepTable.id,
    };
    setHouseKeepDatas((prev) => [...prev, newHouseKeepData]);
  };

  const deleteHouseKeepData = (id: string) => {
    setHouseKeepDatas((prev) => [...prev.filter((data) => data.id !== id)]);
  };

  return (
    <VStack align="left">
      <Heading as="h3" fontSize="md">
        {houseKeepTable.name}
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
