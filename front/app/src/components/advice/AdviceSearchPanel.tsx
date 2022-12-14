import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

type Props = {
  setUrl: (arg: string) => void;
};

const AdviceSearchPanel = ({ setUrl }: Props) => {
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
    const query = [];
    // gender
    if (checked.includes("女性")) {
      query.push("gender=WOMAN");
    } else if (checked.includes("男性")) {
      query.push("gender=MAN");
    }
    // user_type
    if (checked.includes("学生")) {
      query.push("user_type=STUDENT");
    } else if (checked.includes("新社会人")) {
      query.push("user_type=NEW_WORKER");
    }
    // work_pattern
    if (checked.includes("在宅ワーク")) {
      query.push("user_type=REMOTE");
    }
    // free word
    if (freeWord != "") {
      query.push(`free_word=${freeWord}`);
    }
    const queryPath = query.join("&");
    setUrl("/advices/filter" + (queryPath.length != 0 ? "?" + queryPath : ""));
  };

  return (
    <Box bg="brand.100" width="80%" borderRadius="5px" p={4}>
      検索
      <form onSubmit={handleSubmit}>
        <Box mt={4} ml={4}>
          <FormControl as="fieldset">
            <FormLabel as="legend">ユーザーの属性</FormLabel>
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
          </FormControl>
        </Box>
        <Box mt={4} ml={4}>
          <FormControl>
            <FormLabel>フリーワード</FormLabel>
            <Input
              width="30%"
              ml={4}
              variant="flushed"
              focusBorderColor="brand.500"
              borderColor="white"
              placeholder="入力してください"
              onChange={(event) => setFreeWord(event.currentTarget.value)}
            />
          </FormControl>
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
