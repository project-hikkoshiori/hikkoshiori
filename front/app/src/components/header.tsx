import {
  Center,
  Flex,
  IconButton,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Image from "next/image";
import iconSrc from "../../public/icon.png";
import logoSrc from "../../public/logo.png";
import SideBar from "./sidebar";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = true;
  return (
    <Flex
      as="header"
      width="100%"
      height={61}
      backgroundColor="brand.100"
      alignItems="center"
      gap={2}
      px={2}
    >
      <IconButton
        aria-label="Menu"
        icon={<HamburgerIcon />}
        variant="outline"
        border="none"
        colorScheme="brand"
        color="black"
        onClick={onOpen}
      />
      <SideBar isOpen={isOpen} onClose={onClose} />
      <Center>
        <Image
          src={iconSrc}
          alt="hikkoshiori"
          height={40}
          width={40}
          style={{ cursor: "pointer" }}
          objectFit="contain"
        />
      </Center>
      <NextLink href="/" passHref>
        <Image
          src={logoSrc}
          alt="logo"
          height={34}
          width={234}
          style={{ cursor: "pointer" }}
        />
      </NextLink>
      <Spacer />
      {isLoggedIn ? (
        <NextLink href="/mypage" passHref>
          <Text cursor="pointer">ようこそ、ざとさん</Text>
        </NextLink>
      ) : (
        <NextLink href="/login" passHref>
          <Text cursor="pointer">ログイン</Text>
        </NextLink>
      )}
    </Flex>
  );
};

export default Header;
