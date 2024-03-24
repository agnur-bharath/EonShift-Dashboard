"use client";

import { Text } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const Insights = () => {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Insights"}
        subTitle={"This page gives the insights about the working model."}
      />
      <Separator />
      <Text>Sample</Text>
    </PageContainer>
  );
};

export default Insights;
