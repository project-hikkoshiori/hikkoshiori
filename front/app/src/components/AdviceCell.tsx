import NextLink from "next/link";
import Image from "next/image";
import { Circle, HStack, VStack, Text, Spacer } from "@chakra-ui/react";

const AdviceCell = () => (
  <NextLink href="/" passHref>
    <HStack
      as="a"
      height="280px"
      width="360px"
      m={4}
      p={4}
      border="1px"
      borderColor="brand.100"
      borderRadius="4px"
      align="top"
      _hover={{
        boxShadow: "base",
        rounded: "md",
        bg: "gray.50",
        ".seemore-link": {
          textDecor: "underline",
        },
      }}
    >
      <Circle size="60px" bg="brand.100" overflow="hidden" mr={2}>
        <Image src="" alt="user icon" height="60px" width="60px" />
      </Circle>
      <VStack align="right">
        <Text noOfLines={8}>
          吾輩は猫である。
          名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。
          この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと
        </Text>
        <Spacer />
        <Text className="seemore-link" align="right">
          もっと見る{">"}
        </Text>
      </VStack>
    </HStack>
  </NextLink>
);

export default AdviceCell;
