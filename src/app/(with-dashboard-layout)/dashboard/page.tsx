"use client";

import { Grid } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

import BarChartComponent from "~/app/(with-dashboard-layout)/dashboard/components/cost-and-energy-consumption-graph";
import DonutChart1 from "~/app/(with-dashboard-layout)/dashboard/components/devices-on-and-off";
import EnergyConsumedByType from "~/app/(with-dashboard-layout)/dashboard/components/energy-consumed-by-type";
import MostEnergyConsumingDevices from "~/app/(with-dashboard-layout)/dashboard/components/most-energy-consuming-devices";
import TotalFacilityConsumption from "~/app/(with-dashboard-layout)/dashboard/components/total-facility-consumption";
import TotalEnergyConsumptionChart from "~/app/(with-dashboard-layout)/dashboard/components/total-facility-energy-chart";

export default function HomePage() {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Dashboard"}
        subTitle={"Contains all the summary of the facility and consumption"}
      />
      <Separator />
      <TotalFacilityConsumption />
      <Grid numItemsMd={2} numItemsLg={3} className="gap-4 w-full">
        <MostEnergyConsumingDevices />
        <EnergyConsumedByType />
        <DonutChart1 />
        {/*<MostEnergyConsumingDevices />*/}
      </Grid>
      <div className={"flex flex-row gap-3 w-full justify-start"}>
        <BarChartComponent />
        <TotalEnergyConsumptionChart />
      </div>
    </PageContainer>
  );
}
