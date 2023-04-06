import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

//import component
import MyKeep from "./MyKeep";
import MyReivew from "./MyReivew";

const STabList = styled(TabList)`
  display: flex;
  justify-content: space-evenly;
  padding: 0;
  margin: 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
`;

const STab = styled(Tab)`
  flex: 1;
  text-align: center;
  cursor: pointer;
  padding-bottom: 15px;
  font-size: 18px;
  color: #363636;

  &[aria-selected="true"] {
    border-bottom: 1px solid #f84f5a;
    color: #f84f5a;
    font-weight: bold;
    // transition: all 0.2s ease-in-out;
  }

  // transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
  }
`;

const MypageTab = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTabIndex(index);
  };

  const { memberId } = props;

  return (
    <>
      <Tabs selectedIndex={activeTabIndex} onSelect={handleTabSelect} style={{ minWidth: "830px", maxWidth: "830px" }}>
        <STabList>
          <STab>킵한 위스키</STab>
          <STab>작성한 리뷰</STab>
        </STabList>
        <TabPanel>
          <MyKeep memberId={memberId} />
        </TabPanel>
        <TabPanel>
          <MyReivew memberId={memberId} />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default MypageTab;
