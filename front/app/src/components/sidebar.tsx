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

type SideBarItemProps = { link: string; text: string; onClick: () => void };

const SideBarItem = ({ link, text, onClick }: SideBarItemProps) => (
  <NextLink href={link} passHref>
    <Text ml={1} as="b" cursor="pointer" onClick={onClick}>
      {text}
    </Text>
  </NextLink>
);

const SideBarChildItem = ({ link, text, onClick }: SideBarItemProps) => (
  <NextLink href={link} passHref>
    <Text ml={3} cursor="pointer" onClick={onClick}>
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
            <SideBarItem onClick={onClose} link="/" text="トップ" />
            <SideBarItem onClick={onClose} link="/housekeep" text="家計簿" />
            <SideBarItem onClick={onClose} link="/advice" text="知見共有" />
            <VStack align="start" shouldWrapChildren>
              <SideBarItem
                onClick={onClose}
                link="/submit-paper"
                text="提出書類"
              />
              <SideBarChildItem
                onClick={onClose}
                link="/submit-paper"
                text="診断する"
              />
              <SideBarChildItem
                onClick={onClose}
                link="/submit-paper/result"
                text="前回の結果を見る"
              />
            </VStack>
            <VStack align="start" shouldWrapChildren>
              <SideBarItem
                onClick={onClose}
                link="/layout"
                text="レイアウト診断"
              />
              <SideBarChildItem
                onClick={onClose}
                link="/layout"
                text="診断する"
              />
              <SideBarChildItem
                onClick={onClose}
                link="/layout/result"
                text="前回の結果を見る"
              />
            </VStack>
            <VStack align="start" shouldWrapChildren>
              <SideBarItem
                onClick={onClose}
                link="/properties"
                text="物件探し"
              />
              <SideBarChildItem
                onClick={onClose}
                link="/properties"
                text="物件を探す"
              />
              <SideBarChildItem
                onClick={onClose}
                link="/properties?bookmark=true"
                text="ブックマークを見る"
              />
            </VStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;
