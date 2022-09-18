import Image from "next/image";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import TopPageButton from "./TopPageButton";
import topImageSrc from "../../../public/top.png";
import { useSession } from "next-auth/react";
import { useGetUserByName } from "../../api/UserAPI";
import { useRouter } from "next/router";

const LoggedInTop = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    data: user,
    isError,
    isLoading,
  } = useGetUserByName(session?.user?.name ?? "");
  if (isError) {
    return <Text>エラーが発生しました。</Text>;
  }
  if (!isLoading && !user) {
    router.push("/users/register");
  }
  return (
    <Box>
      <Image src={topImageSrc} alt="ひっこしおり" />
      <VStack gap={5} my={5}>
        <Box width="60%">
          <Text
            fontSize="2xl"
            pos="absolute"
            zIndex="docked"
            transform="rotate(-9deg) translateX(-0.5em) translateY(-0.2em)"
            pointerEvents="none"
          >
            あなたにおすすめ!
          </Text>
          <TopPageButton link="/properties" text="物件を見る" width="100%" />
        </Box>
        <HStack gap={10} width="80%" justifyContent="center">
          <TopPageButton link="/housekeep" text="家計簿試算" width="20%" />
          <TopPageButton link="/layout" text="レイアウト診断" width="20%" />
          <TopPageButton link="/submit-paper" text="提出書類" width="20%" />
          <TopPageButton link="/advice" text="みんなのアドバイス" width="20%" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default LoggedInTop;
