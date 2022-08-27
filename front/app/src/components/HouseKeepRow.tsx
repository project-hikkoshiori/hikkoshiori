import {
  Checkbox,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HouseKeep } from "../utils/types";

type Props = {
  houseKeepData: HouseKeep;
};

const HouseKeepRow = ({ houseKeepData }: Props) => {
  const [isChecked, setIsChecked] = useState(true);
  const [value, setValue] = useState(houseKeepData.value.toString());
  const [title, setTitle] = useState(houseKeepData.title);

  const format = (val: string | number) => {
    if (typeof val == "string") {
      val = parseInt(val);
    }
    if (isNaN(val)) {
      val = 0;
    }
    return `¥` + Intl.NumberFormat("ja-JP").format(val);
  };

  return (
    <Flex align="center" gap={4}>
      <Checkbox
        isChecked={isChecked}
        colorScheme="brand"
        onChange={() => setIsChecked((prev) => !prev)}
      />
      {houseKeepData.isUserAdded ? (
        <Input
          width="200px"
          variant="flushed"
          isDisabled={!isChecked}
          focusBorderColor="brand.500"
          placeholder="項目名"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <Text width="200px" color={isChecked ? "inherit" : "gray.400"}>
          家賃
        </Text>
      )}
      <NumberInput
        width="300px"
        variant="flushed"
        focusBorderColor="brand.500"
        onChange={(valueString) => setValue(valueString)}
        value={value}
        min={0}
        format={format}
        step={1000}
        isDisabled={!isChecked}
      >
        <NumberInputField />
      </NumberInput>
    </Flex>
  );
};

export default HouseKeepRow;
