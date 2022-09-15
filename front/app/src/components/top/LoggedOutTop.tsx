import Image from "next/image";
import { Box, Button, Center, Flex, Heading, HStack } from "@chakra-ui/react";
import TopPageButton from "./TopPageButton";
import topImageSrc from "../../../public/top.png";
import { signIn } from "next-auth/react";

const LoggedOutTop = () => (
  <Box>
    <Image src={topImageSrc} alt="ひっこしおり" />
    <HStack gap={10} justifyContent="center">
      <Flex width="40%" height="200px" flexDirection="column">
        <Heading size="md" my={2}>
          全ての機能を使う
        </Heading>
        <Center
          borderX="2px"
          borderBottom="2px"
          borderColor="brand.200"
          borderStyle="dashed"
          flex="auto"
        >
          <Button onClick={() => signIn("google")} minW="35%">
            ログイン
          </Button>
        </Center>
      </Flex>
      <Flex width="40%" height="200px" flexDirection="column">
        <Heading size="md" my={2}>
          お試しで使う
        </Heading>
        <Flex
          borderX="2px"
          borderBottom="2px"
          borderColor="brand.200"
          borderStyle="dashed"
          align="center"
          justify="space-around"
          wrap="wrap"
          flex="auto"
        >
          <TopPageButton link="/" text="レイアウト診断" minW="35%" m={2} />
          <TopPageButton link="/" text="みんなのアドバイス" minW="35%" m={2} />
          <TopPageButton link="/" text="提出書類" minW="35%" m={2} />
        </Flex>
      </Flex>
    </HStack>
  </Box>
);

export default LoggedOutTop;
