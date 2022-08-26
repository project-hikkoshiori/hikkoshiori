import { Box, Button, Checkbox, CheckboxGroup, Input } from "@chakra-ui/react";
import { FormEvent, useState } from "react";

const AdviceSearchPanel = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [freeWord, setFreeWord] = useState("");

  const toggleChecked = (value: string) => {
    if (checked.indexOf(value) == -1) {
      setChecked((prev) => [...prev, value]);
    } else {
      setChecked((prev) => prev.filter((v) => v != value));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: いい感じに処理
    console.log(`checked: ${checked}, freeword: ${freeWord}`);
  };

  return (
    <Box bg="brand.100" width="80%" borderRadius="5px" p={4}>
      検索
      <form onSubmit={handleSubmit}>
        <Box mt={4} ml={4}>
          ユーザーの属性
          <CheckboxGroup colorScheme="brand">
            <Checkbox
              mx={4}
              borderColor="white"
              onChange={() => toggleChecked("女性")}
            >
              女性
            </Checkbox>
            <Checkbox
              mx={4}
              borderColor="white"
              onChange={() => toggleChecked("男性")}
            >
              男性
            </Checkbox>
            <Checkbox
              mx={4}
              borderColor="white"
              onChange={() => toggleChecked("学生")}
            >
              学生
            </Checkbox>
            <Checkbox
              mx={4}
              borderColor="white"
              onChange={() => toggleChecked("新社会人")}
            >
              新社会人
            </Checkbox>
            <Checkbox
              mx={4}
              borderColor="white"
              onChange={() => toggleChecked("在宅ワーク")}
            >
              在宅ワーク
            </Checkbox>
          </CheckboxGroup>
        </Box>
        <Box mt={4} ml={4}>
          フリーワード　
          <Input
            width="30%"
            variant="flushed"
            focusBorderColor="brand.500"
            borderColor="white"
            placeholder="入力してください"
            onChange={(event) => setFreeWord(event.currentTarget.value)}
          />
        </Box>
        <Box my={4} ml="auto" textAlign="center">
          <Button colorScheme="brand" type="submit">
            検索する
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AdviceSearchPanel;
