import { useMemo, useState } from "react";

import { Card, DonutChart, Legend, Title } from "@tremor/react";
import axios from "axios";
import { doc, type DocumentReference } from "firebase/firestore";
import { startCase } from "lodash";
import moment from "moment";
import { useSelector } from "react-redux";
import { useFirestoreDocData } from "reactfire";

import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import { db } from "~/lib/firebase";
import { Icons } from "~/lib/icons";
import { cn } from "~/lib/utils";
import { type RootState } from "~/redux/store";
import { type GroupedEnergyByTypeDocument } from "~/types";

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} mWh`;

export default function EnergyConsumedByType() {
  const { id: facilityId } = useSelector((state: RootState) => state.facility);

  const [updateLoading, setUpdateLoading] = useState(false);

  const group_energy_by_type_query = useMemo(() => {
    return doc(
      db,
      "facilities",
      facilityId,
      "insights",
      "group_energy_by_type",
    ) as DocumentReference<GroupedEnergyByTypeDocument>;
  }, [facilityId]);

  const { data: insightData, status } = useFirestoreDocData(
    group_energy_by_type_query,
    {
      initialData: null,
      suspense: true,
    },
  );

  if (status === "loading" || status === "error" || !insightData) {
    return <Skeleton className="max-w-md mx-auto h-400" />;
  }

  const handleRefresh = async () => {
    setUpdateLoading(true);
    await axios({
      method: "POST",
      url: "/api/insights/grouped_energy_by_type",
      data: {
        facilityId,
      },
    });
    setUpdateLoading(false);
  };

  const processedData = Object.entries(insightData?.data ?? {})
    .filter(([, value]) => value !== 0) // Filter out devices with zero data
    .map(([key, value]) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        name: startCase(key),
        energy_usage: value,
      };
    })
    //   Sort by name
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort by name

  return (
    <Card className="max-w-md mx-auto">
      <div className={"flex flex-row justify-between items-center"}>
        <div className={"flex flex-col gap-1"}>
          <Title>Energy Consumed By Type</Title>
          <p className={"text-muted-foreground text-xs"}>
            Last Updated:{" "}
            {moment(insightData?.last_updated?.toDate()).fromNow()}
          </p>
        </div>
        <Icons.spinner
          onClick={handleRefresh}
          className={cn(
            "cursor-pointer text-primary/50",
            updateLoading && "animate-spin text-primary",
          )}
        />
      </div>
      <Legend
        categories={processedData.map((data) => data.name)}
        className="mt-6"
      />
      <DonutChart
        data={processedData}
        category="energy_usage"
        index="name"
        valueFormatter={valueFormatter}
        className="mt-6"
      />
    </Card>
  );
}
