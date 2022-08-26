import { Box, Button, Checkbox, CheckboxGroup, Input } from "@chakra-ui/react";

const AdviceSearchPanel = () => (
  <Box bg="brand.100" width="80%" borderRadius="5px" p={4}>
    検索
    <Box mt={4} ml={4}>
      ユーザーの属性
      <CheckboxGroup colorScheme="brand">
        <Checkbox mx={4} borderColor="white">
          女性
        </Checkbox>
        <Checkbox mx={4} borderColor="white">
          男性
        </Checkbox>
        <Checkbox mx={4} borderColor="white">
          学生
        </Checkbox>
        <Checkbox mx={4} borderColor="white">
          新社会人
        </Checkbox>
        <Checkbox mx={4} borderColor="white">
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
      />
    </Box>
    <Box my={4} ml="auto" textAlign="center">
      <Button colorScheme="brand">検索する</Button>
    </Box>
  </Box>
);

export default AdviceSearchPanel;
