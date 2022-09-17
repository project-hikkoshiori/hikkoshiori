import { useState } from "react";
import { Heading, IconButton, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import HouseKeepRow from "./HouseKeepRow";
import { HouseKeep, HouseKeepTable } from "../../utils/types";
import { postHouseKeep } from "../../api/HousekeepAPI";

type Props = {
  houseKeepTable: HouseKeepTable;
  onUpdate: (newSum: number) => void;
};

const HouseKeepSection = ({ houseKeepTable, onUpdate }: Props) => {
  const [houseKeepDatas, setHouseKeepDatas] = useState<HouseKeep[]>(
    houseKeepTable.data
  );

  const updateHouseKeepData = (newData: HouseKeep) => {
    const newDatas = [
      ...houseKeepDatas.map((data) => (data.id == newData.id ? newData : data)),
    ];
    setHouseKeepDatas(newDatas);
    onUpdate(newDatas.reduce((prev, curr) => prev + curr.value, 0));
  };

  const addHouseKeepData = () => {
    const newHouseKeepData: HouseKeep = {
      id: houseKeepDatas.length.toString(),
      name: "",
      value: 0,
      is_prepared: false,
      table_name: houseKeepTable.name,
      table_id: houseKeepTable.id,
    };
    postHouseKeep({
      ...newHouseKeepData,
      user_id: "81f981b2-bdfa-4b98-b1a3-b4669f948a12",
    }).then((res) => {
      if (!res.isError)
        setHouseKeepDatas((prev) => [...prev, newHouseKeepData]);
    });
  };

  const deleteHouseKeepData = (id: string) => {
    const newDatas = [...houseKeepDatas.filter((data) => data.id !== id)];
    setHouseKeepDatas(newDatas);
    onUpdate(newDatas.reduce((prev, curr) => prev + curr.value, 0));
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
          onUpdate={updateHouseKeepData}
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
