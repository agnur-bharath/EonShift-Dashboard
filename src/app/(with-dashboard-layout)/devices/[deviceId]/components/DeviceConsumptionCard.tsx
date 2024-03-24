import React, { useMemo } from "react";

import { AreaChart, Card, Metric, Title } from "@tremor/react";
import {
  collection,
  limit,
  orderBy,
  query,
  type Query,
} from "firebase/firestore";
import moment from "moment";
import { useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";

import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";
import { type DeviceDocument, type EnergyDocument } from "~/types";

const valueFormatter = (number: number) => `${number} mWh`;

export default function DeviceConsumptionCard({
  device,
}: {
  device: DeviceDocument;
}) {
  const { id: facilityId } = useSelector((state: RootState) => state.facility);
  const past12EnergyConsumptionsQuery = useMemo(
    () =>
      query(
        collection(
          db,
          "facilities",
          facilityId,
          "devices",
          device?.id,
          "energy_consumptions",
        ),
        orderBy("timestamp", "desc"),
        limit(12),
      ) as Query<EnergyDocument>,
    [facilityId],
  );

  const { data: past12EnergyConsumptions, status } = useFirestoreCollectionData(
    past12EnergyConsumptionsQuery,
    {
      initialData: [],
      idField: "id",
    },
  );

  if (status === "loading") {
    return <Skeleton className="h-80" />;
  }

  const formattedData = past12EnergyConsumptions
    .map((energyConsumption) => {
      return {
        timestamp: moment(energyConsumption?.timestamp.toDate()).format(
          "MMM DD HH:mm:ss",
        ),
        "Energy Consumption": energyConsumption.energy_consumption,
      };
    })
    .reverse();

  return (
    <Card
      key={device.id}
      decoration={"top"}
      decorationColor={device.status === "active" ? "green" : "red"}
    >
      <Title>Current Energy Consumption</Title>
      <Metric>{device?.energy_usage} mWh</Metric>
      <p className={"text-xs text-muted-foreground"}>
        Last Updated: {moment(device?.last_updated?.toDate()).fromNow()}
      </p>
      <AreaChart
        className="mt-4 h-80"
        data={formattedData}
        categories={["Energy Consumption"]}
        index="timestamp"
        colors={["blue", "fuchsia"]}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}
