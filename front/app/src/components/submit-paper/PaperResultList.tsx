import { VStack } from "@chakra-ui/react";
import PaperResultSection from "./PaperResultSection";

const PaperResultList = () => (
  <VStack align="start" p={2} width="500px">
    <PaperResultSection />
    <PaperResultSection />
    <PaperResultSection />
  </VStack>
);

export default PaperResultList;
