"use client";

import { Text } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const ReportsExport = () => {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Reports & Exports"}
        subTitle={
          "This page gives us the information about the Reports and Exports."
        }
      />
      <Separator />
      <Text>Sample</Text>
    </PageContainer>
  );
};

export default ReportsExport;
