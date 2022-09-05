import { VStack } from "@chakra-ui/react";
import LayoutTendacy from "./LayoutTendacy";

const LayoutTendacyList = () => (
  <VStack align="start" p={2} width="500px">
    <LayoutTendacy title="間取りの広さ" percent={20} />
    <LayoutTendacy title="南向き" percent={75} />
    <LayoutTendacy title="3点独立" percent={35} />
  </VStack>
);

export default LayoutTendacyList;
