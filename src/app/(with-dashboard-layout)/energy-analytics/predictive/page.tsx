"use client";

import { Text } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const PredictiveAnalysis = () => {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Predictive Analysis"}
        subTitle={
          "This page Predicts and analyses the data from the working model"
        }
      />
      <Separator />
      <Text>Sample</Text>
    </PageContainer>
  );
};

export default PredictiveAnalysis;
