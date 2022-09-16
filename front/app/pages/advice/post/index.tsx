import { ChangeEvent, useState } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { postAdvices } from "../../../src/api/AdviceAPI";

const AdvicePage: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const post = async () => {
    // 入力のバリデーション
    // NOTE: Buttonをdisabledにしているので、基本的にここには来ないはず
    if (value == "") {
      toast({
        title: "入力がありません",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    const content = { content: value, icon_src: "" };
    const { isError } = await postAdvices(content);

    if (!isError) {
      router.push("/advice");
      toast({
        title: "投稿が完了しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" flexDir="column" gap={4}>
      <Box width="70%" maxW="800px" mt={8}>
        <NextLink href="/advice" passHref>
          <Link>＜一覧に戻る</Link>
        </NextLink>
      </Box>
      <Heading my={16}>アドバイスを投稿する</Heading>
      <Textarea
        width="70%"
        maxW="800px"
        minH="300px"
        value={value}
        focusBorderColor="brand.500"
        placeholder="ここにテキストを入力してください"
        onChange={handleInputChange}
      />
      <Button
        isDisabled={value == ""}
        onClick={post}
        colorScheme="brand"
        size="lg"
      >
        投稿する
      </Button>
    </Flex>
  );
};

export default AdvicePage;
