import type { NextPage } from "next";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import AdviceCell from "../../src/components/AdviceCell";
import { Advice } from "../../src/utils/types";

const Advice: NextPage = () => {
  const dummyAdvice: Advice = {
    id: "a",
    text: `吾輩は猫である。
名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。
この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと`,
    iconSrc: "",
  };
  const advices: Advice[] = [
    dummyAdvice,
    dummyAdvice,
    dummyAdvice,
    dummyAdvice,
    dummyAdvice,
  ];
  return (
    <Flex align="center" flexDir="column">
      <Heading mt={16}>みんなのアドバイス</Heading>
      <Box width="80%">
        <Text align="end">{advices.length}件</Text>
      </Box>
      <SimpleGrid columns={3}>
        {advices.map((advice) => (
          <AdviceCell key={advice.id} advice={advice} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Advice;
