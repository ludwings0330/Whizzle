import React from "react";
import { ResponsiveLine } from "@nivo/line";
import styled from "styled-components";

const SDiv = styled.div`
  width: 990px;
  height: 240px;
`;

const SContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const WhiskyDetailGraph = () => {
  const data = [
    {
      id: "drunkenbear",
      data: [
        {
          x: "smoky",
          y: 20,
        },
        {
          x: "peaty",
          y: 10,
        },
        {
          x: "spicy",
          y: 40,
        },
        {
          x: "herbal",
          y: 30,
        },
        {
          x: "oily",
          y: 30,
        },
        {
          x: "bodied",
          y: 60,
        },
        {
          x: "rich",
          y: 60,
        },
        {
          x: "sweet",
          y: 60,
        },
        {
          x: "salty",
          y: 20,
        },
        {
          x: "vanilla",
          y: 70,
        },
        {
          x: "tart",
          y: 50,
        },
        {
          x: "fruity",
          y: 70,
        },
        {
          x: "floral",
          y: 50,
        },
      ],
    },
  ];
  return (
    <SContainer>
      <SDiv>
        <ResponsiveLine
          data={data}
          curve="natural"
          colors={"#F84F5A"}
          theme={{
            background: "#000000",
            textColor: "#ffffff",
            fontSize: "20px",
          }}
          margin={{ top: 30, right: 30, bottom: 40, left: 30 }}
          lineWidth={"5px"}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: 100,
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          s
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: "middle",
          }}
          pointSize={7}
          pointColor="#F2A660"
          pointBorderWidth={1}
          pointBorderColor="#F2A660"
          pointLabelYOffset={-12}
          useMesh={false}
          enableGridX={false}
          enableGridY={false}
        />
      </SDiv>
    </SContainer>
  );
};

export default WhiskyDetailGraph;
