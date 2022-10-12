import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";
type Props = {};

const RevenueStat = (props: Props) => {
  return (
    <div className="p-4">
      <Text className="font-bold text-2xl">Revenue</Text>
      <Spacer h={6} />
      <StatGroup>
        <Stat className="p-4 border-r">
          <StatLabel>Daily</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat className="p-4">
          <StatLabel>Monthly</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </div>
  );
};

export default RevenueStat;
