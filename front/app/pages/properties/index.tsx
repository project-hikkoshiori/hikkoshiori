import type { NextPage } from "next";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { BookmarkSection } from "../../src/components/properties/BookmarkSection";
import { PropertySearchSection } from "../../src/components/properties/PropertySearchSection";

const Index: NextPage = () => {
  return (
    <Tabs isFitted mt="50" ml="10" mr="10">
      <TabList>
        <Tab _selected={{ color: "white", bg: "brand.100" }}>物件を探す</Tab>
        <Tab _selected={{ color: "white", bg: "brand.100" }}>
          ブックマークを見る
        </Tab>
      </TabList>
      <TabPanels backgroundColor="brand.50">
        <TabPanel>
          <PropertySearchSection />
        </TabPanel>
        <TabPanel>
          <BookmarkSection />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Index;
