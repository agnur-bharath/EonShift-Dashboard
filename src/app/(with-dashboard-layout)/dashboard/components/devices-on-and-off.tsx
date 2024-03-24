import { useMemo } from "react";

import { Card, DonutChart, Flex, Text, Title } from "@tremor/react";
import { collection, query, type Query } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";
import { type DeviceDocument } from "~/types";

const valueFormatter = (number: number) => `${number}`;

const DonutChart2 = () => {
  const { id } = useSelector((state: RootState) => state.facility);
  const devicesQuery = useMemo(() => {
    return query(
      collection(db, "facilities", id, "devices"),
    ) as Query<DeviceDocument>;
  }, []);

  const { data: devices, status } = useFirestoreCollectionData(devicesQuery, {
    idField: "id",
    initialData: [],
  });

  if (status === "loading" || status === "error" || !devices) {
    return <></>;
  }

  const statusData = devices.reduce(
    (
      acc: { active: number; inactive: number },
      device: { name: string; status: string },
    ) => {
      if (device.status === "active" || device.status === "inactive") {
        acc[device.status] = (acc[device.status] ?? 0) + 1;
      }
      return acc;
    },
    { active: 0, inactive: 0 },
  );

  return (
    <Card className="max-w-lg hover:shadow-md rounded hover:shadow-white">
      <Title>Device Status</Title>
      <p className={"text-sm text-muted-foreground"}>
        Amount of devices active and inactive
      </p>
      <DonutChart
        className="mt-6"
        data={Object.entries(statusData).map(([status, count]) => ({
          name: status,
          count,
        }))}
        category="count"
        index="name"
        valueFormatter={valueFormatter}
        colors={["green", "red"]}
      />

      {/* Display counts below the DonutChart in a column */}
      <Flex className="flex-col items-center mt-4">
        {Object.entries(statusData).map(([status, count]) => (
          <Flex
            key={status}
            // flexDirection="col"
            // alignItems="center"
            className="my-2"
          >
            <Text className={"text-primary/50"}>{`${
              status.charAt(0).toUpperCase() + status.slice(1)
            } Devices`}</Text>
            <Text className={"text-primary"}>{valueFormatter(count)}</Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};

export default DonutChart2;
