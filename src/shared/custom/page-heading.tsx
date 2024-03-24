"use client";

import { memo } from "react";

import { Text } from "@tremor/react";

const PageHeading = memo(
  ({
    mainTitle,
    subTitle,
    updatedBy,
  }: {
    mainTitle: string;
    subTitle?: string;
    updatedBy?: string;
  }) => {
    return (
      <div>
        <h3 className="text-xl font-bold tracking-tight duration-150 lg:text-2xl">
          {mainTitle}
        </h3>
        {subTitle && (
          <h5 className="text-sm text-muted-foreground duration-150 lg:text-base">
            {subTitle}
          </h5>
        )}
        {updatedBy && <Text>{updatedBy}</Text>}
      </div>
    );
  },
);
PageHeading.displayName = "PageHeader";
export default PageHeading;
