import { MinusIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  Flex,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { HouseKeep } from "../../utils/types";

type Props = {
  houseKeepData: HouseKeep;
  onDelete: (id: string) => void;
  onUpdate: (newData: HouseKeep) => void;
};

const HouseKeepRow = ({ houseKeepData, onDelete, onUpdate }: Props) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isOnHover, setIsOnHover] = useState(true);
  const [data, setData] = useState(houseKeepData);

  useEffect(() => onUpdate(data), [data, onUpdate]);

  const format = (val: string | number) => {
    if (typeof val == "string") {
      val = parseInt(val);
    }
    if (isNaN(val)) {
      val = 0;
    }

    const price = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    });
    return price.format(val);
  };

  return (
    <Flex
      align="center"
      gap={4}
      onMouseOver={() => {
        setIsOnHover(true);
      }}
      onMouseLeave={() => setIsOnHover(false)}
    >
      <Checkbox
        isChecked={isChecked}
        colorScheme="brand"
        onChange={() => setIsChecked((prev) => !prev)}
      />
      {houseKeepData.is_prepared ? (
        <Text width="200px" color={isChecked ? "inherit" : "gray.400"}>
          {houseKeepData.name}
        </Text>
      ) : (
        <Input
          width="200px"
          variant="flushed"
          isDisabled={!isChecked}
          focusBorderColor="brand.500"
          placeholder="項目名"
          value={data.name}
          onChange={(e) => {
            setData((prev) => {
              return {
                ...prev,
                name: e.target.value,
              };
            });
          }}
        />
      )}
      <NumberInput
        width="300px"
        variant="flushed"
        focusBorderColor="brand.500"
        onChange={(valueString) => {
          setData((prev) => {
            return {
              ...prev,
              value: parseInt(valueString),
            };
          });
        }}
        value={data.value}
        min={0}
        format={format}
        step={1000}
        isDisabled={!isChecked}
      >
        <NumberInputField />
      </NumberInput>
      <IconButton
        aria-label="delete"
        variant="outline"
        size="xs"
        colorScheme="red"
        isRound={true}
        isDisabled={!isOnHover}
        icon={<MinusIcon />}
        onClick={() => onDelete(houseKeepData.id)}
      />
    </Flex>
  );
};

export default HouseKeepRow;
