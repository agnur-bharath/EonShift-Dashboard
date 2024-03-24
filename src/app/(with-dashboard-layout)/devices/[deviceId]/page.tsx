"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  Card,
  Col,
  Flex,
  Grid,
  Legend,
  Metric,
  Switch,
  Text,
} from "@tremor/react";
import axios from "axios";
import { doc, setDoc, type DocumentReference } from "firebase/firestore";
import moment from "moment";
import { useSelector } from "react-redux";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import TimeRangeSlider from "react-time-range-slider";
import { useFirestoreDocData } from "reactfire";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Button } from "~/shared/shadcn/ui/button";
import { Separator } from "~/shared/shadcn/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/shared/shadcn/ui/tabs";

import BarChartExample from "~/app/(with-dashboard-layout)/devices/[deviceId]/components/bargraph";
import DeviceConsumptionCard from "~/app/(with-dashboard-layout)/devices/[deviceId]/components/DeviceConsumptionCard";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";
import { type DeviceDocument } from "~/types";

const DeviceInfoText = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className={"flex flex-row justify-between items-center"}>
      <Text>{title}</Text>
      <p className={"text-primary text-sm"}>{value}</p>
    </div>
  );
};

const DevicePage = ({ params }: { params: { deviceId: string } }) => {
  const { id: facilityId } = useSelector((state: RootState) => state.facility);

  const [timeUpdateLoading, setTimeUpdateLoading] = useState(false);

  const [loadingDeviceId, setLoadingDeviceId] = useState<string | null>(null);

  const query = useMemo(() => {
    return doc(
      db,
      "facilities",
      facilityId,
      "devices",
      params.deviceId,
    ) as DocumentReference<DeviceDocument>;
  }, [facilityId, params?.deviceId]);

  const { data: device, status } = useFirestoreDocData(query, {
    initialData: null,
    suspense: true,
  });

  const handleDeviceToggle = async (deviceId: string, status: string) => {
    setLoadingDeviceId(deviceId);
    await axios({
      method: "post",
      url: "/api/publish",
      data: {
        status,
        deviceId,
        facilityId,
      },
    });
    setLoadingDeviceId(null);
  };
  const [time, setTime] = useState<Record<string, string>>({
    start: "05:00",
    end: "23:59",
  });

  // useEffect(() => {
  //   if (status === "success" && device?.start_time && device.end_time) {
  //     setTime({
  //       start: moment(device.start_time).format("HH:mm") ?? "00:00",
  //       end: moment(device.end_time).format("HH:mm"),
  //     });
  //   }
  // }, [device, status]);

  if (status === "loading" || !device) {
    return (
      <PageContainer>
        <PageHeading
          mainTitle={"Device"}
          subTitle={`Device Id: ${params.deviceId}`}
        />
        <Separator />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
          <Card className="h-24" />
          <Card className="h-24" />
          <Card className="h-24" />
          <Card className="h-24" />
        </div>
      </PageContainer>
    );
  }

  if (status === "error") {
    return (
      <PageContainer>
        <PageHeading
          mainTitle={"Device"}
          subTitle={`Device Id: ${params.deviceId}`}
        />
        <Separator />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
          <Card className="h-24" />
          <Card className="h-24" />
          <Card className="h-24" />
          <Card className="h-24" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Device: " + device?.name}
        subTitle={`Device Id: ${params.deviceId}`}
        updatedBy={
          "Last Updated At: " + moment(device?.last_updated?.toDate()).fromNow()
        }
      />
      <Separator />
      {/*<DeviceDetails />*/}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          {/*<TabsTrigger value="controls">Controls</TabsTrigger>*/}
        </TabsList>
        <TabsContent value="overview" className={"mt-2"}>
          <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-3">
            <Col numColSpan={1} numColSpanLg={2}>
              <DeviceConsumptionCard device={device} />
              {/*<Card>*/}
              {/*  <Text>Current Energy Consumption</Text>*/}
              {/*  <Metric>10 mWh</Metric>*/}
              {/*</Card>*/}
            </Col>
            <Col>
              <Card className={"p-4"}>
                <div
                  className={"flex flex-row gap-2 items-center justify-between"}
                >
                  <Text className={"font-medium"}>Device Information</Text>
                  {device.status === "active" ? (
                    <Legend categories={["Active"]} colors={["emerald"]} />
                  ) : device.status === "inactive" ? (
                    <Legend categories={["Inactive"]} colors={["red"]} />
                  ) : (
                    <Legend
                      categories={[device.status || "Unknown"]}
                      colors={["yellow"]}
                    />
                  )}
                </div>
                <Separator className={"my-2"} />
                <div className={"flex flex-col gap-2"}>
                  <DeviceInfoText title={"Name"} value={device.name} />
                  <DeviceInfoText title={"Type"} value={device.type} />
                  <DeviceInfoText
                    title={"Location"}
                    value={device.location || "Unknown"}
                  />
                  <DeviceInfoText
                    title={"Manufacturer"}
                    value={device.manufacturer}
                  />
                </div>
              </Card>

              <Card className={"p-4 mt-4"}>
                <div
                  className={"flex flex-row gap-2 items-center justify-between"}
                >
                  <Text className={"font-medium"}>Controls</Text>
                </div>
                <Separator className={"my-2"} />
                <div className={"flex flex-col gap-2"}>
                  <div className={"flex flex-row gap-2"}>
                    <Switch
                      name={"Toggle Device"}
                      checked={device.status === "active"}
                      onChange={async () => {
                        await handleDeviceToggle(
                          device.id,
                          device.status === "active" ? "inactive" : "active",
                        );
                      }}
                    />
                    <label className={"text-sm text-muted-foreground"}>
                      {device.status === "active"
                        ? "Deactivate Device"
                        : "Activate Device"}
                    </label>
                  </div>
                  <Separator className={"my-1"} />

                  <Text className={"font-medium"}>Scheduling Time</Text>
                  <Separator className={"my-1"} />
                  <Flex>
                    <Text>
                      Start time:<Metric>{time.start}</Metric>{" "}
                    </Text>
                    <Text>
                      End time: <Metric>{time.end}</Metric>
                    </Text>
                  </Flex>
                  <TimeRangeSlider
                    disabled={false}
                    format={24}
                    maxValue={"23:59"}
                    minValue={"00:00"}
                    name={"time_range"}
                    draggableTrack={true}
                    onChange={(value: Record<string, string>) => {
                      setTime(value);
                    }}
                    step={1}
                    value={time}
                  />
                  {/* <Button className="mt-4" onClick={()=> handleCpdateClick()}>update</Button> */}
                </div>
                <Button
                  size={"sm"}
                  className="mt-4"
                  onClick={async () => {
                    setTimeUpdateLoading(true);
                    const docRef = doc(
                      db,
                      "facilities",
                      facilityId,
                      "devices",
                      device.id,
                    );

                    await setDoc(
                      docRef,
                      {
                        start_time: moment(time.start, "HH:mm").toDate(),
                        end_time: moment(time.end, "HH:mm").toDate(),
                      },
                      {
                        merge: true,
                      },
                    );
                    setTimeUpdateLoading(false);
                  }}
                >
                  {timeUpdateLoading && ".."}
                  Update Schedule
                </Button>
              </Card>
            </Col>

            {/*<Card>*/}
            {/*  <Text>Current Energy Consumption</Text>*/}
            {/*  <Metric>{device.energy_usage} mWh</Metric>*/}
            {/*  <p className={"text-xs text-muted-foreground"}>*/}
            {/*    Last Updated: {moment(device?.last_updated?.toDate()).fromNow()}*/}
            {/*  </p>*/}
            {/*</Card>*/}
            <Card>
              <Text>Peak Consumption</Text>
              <Metric>10 mWh</Metric>
              <p className={"text-xs text-muted-foreground"}>
                Last 24 Hours
              </p>{" "}
            </Card>
            <Card>
              <Text>Average Energy Consumption</Text>
              <Metric>20 mWh</Metric>
              <p className={"text-xs text-muted-foreground"}>
                Per Month (Last 30 Days)
              </p>
            </Card>
            <Card>
              <Text>Average Carbon Footprint</Text>
              <Metric>20 KG</Metric>
              <p className={"text-xs text-muted-foreground"}>
                Per Month (Last 30 Days)
              </p>{" "}
            </Card>
          </Grid>{" "}
        </TabsContent>
        <TabsContent value="history">
          <BarChartExample />
        </TabsContent>
        {/*<TabsContent value="anomalies">*/}
        {/*  <SparkAreaExample />*/}
        {/*</TabsContent>*/}
        {/* <TabsContent value="add">
          <AlertDialogDemo />
        </TabsContent> */}
      </Tabs>
    </PageContainer>
  );
};

export default DevicePage;
