import React from "react";
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SideBarItemProps = { link: string; text: string };

const SideBarItem = ({ link, text }: SideBarItemProps) => (
  <NextLink href={link} passHref>
    <Text ml={1} as="b" cursor="pointer">
      {text}
    </Text>
  </NextLink>
);

const SideBarChildItem = ({ link, text }: SideBarItemProps) => (
  <NextLink href={link} passHref>
    <Text ml={3} cursor="pointer">
      {text}
    </Text>
  </NextLink>
);

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="brand.100">
        <DrawerCloseButton />
        <DrawerHeader>hikkoshiori</DrawerHeader>
        <DrawerBody>
          <VStack
            as="nav"
            align="start"
            divider={<StackDivider borderColor="gray.500" my={4} />}
          >
            <SideBarItem link="/" text="トップ" />
            <SideBarItem link="/" text="家計簿" />
            <SideBarItem link="/advice" text="知見共有" />
            <VStack align="start" shouldWrapChildren>
              <SideBarItem link="/" text="提出書類" />
              <SideBarChildItem link="/" text="診断する" />
              <SideBarChildItem link="/" text="前回の結果を見る" />
            </VStack>
            <VStack align="start" shouldWrapChildren>
              <SideBarItem link="/" text="レイアウト診断" />
              <SideBarChildItem link="/" text="診断する" />
              <SideBarChildItem link="/" text="前回の結果を見る" />
            </VStack>
            <VStack align="start" shouldWrapChildren>
              <SideBarItem link="/" text="物件探し" />
              <SideBarChildItem link="/" text="物件を探す" />
              <SideBarChildItem link="/" text="ブックマークを見る" />
            </VStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;