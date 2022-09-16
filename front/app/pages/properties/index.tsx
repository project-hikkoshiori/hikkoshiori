import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { BookmarkSection } from "../../src/components/properties/BookmarkSection";
import { PropertySearchSection } from "../../src/components/properties/PropertySearchSection";

const Index: NextPage = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (router.isReady) {
      setTabIndex(router.query.bookmark == "true" ? 1 : 0);
    }
  }, [router]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs
      isFitted
      mt="50"
      ml="10"
      mr="10"
      index={tabIndex}
      onChange={handleTabsChange}
    >
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
