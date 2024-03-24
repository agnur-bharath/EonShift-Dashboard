"use client";

import { Text } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const HistoricalData = () => {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Historical data"}
        subTitle={"Gives the information about the working model."}
      />
      <Separator />
      <Text>Sample</Text>
    </PageContainer>
  );
};

export default HistoricalData;
