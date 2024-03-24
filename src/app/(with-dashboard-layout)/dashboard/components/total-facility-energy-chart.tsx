import { useState } from "react";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import {
  AreaChart,
  BadgeDelta,
  Button,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  Text,
} from "@tremor/react";

const sales = [
  {
    Month: "Jan 23",
    Sales: 2890,
  },
  {
    Month: "Feb 23",
    Sales: 1890,
  },
  {
    Month: "Mar 23",
    Sales: 2890,
  },
  {
    Month: "Apr 23",
    Sales: 1890,
  },
  {
    Month: "May 23",
    Sales: 2890,
  },
  {
    Month: "Jun 23",
    Sales: 1890,
  },
  {
    Month: "Jul 23",
    Sales: 2890,
  },
  {
    Month: "Aug 23",
    Sales: 1890,
  },
  {
    Month: "Sep 23",
    Sales: 2890,
  },
  {
    Month: "Oct 23",
    Sales: 1890,
  },
  {
    Month: "Nov 23",
    Sales: 2890,
  },
  {
    Month: "Dec 23",
    Sales: 3350,
  },
];

interface Product {
  title: string;
  value: number;
  metric: string;
  location: string;
}

const products: Product[] = [
  {
    title: "Product A",
    value: 38,
    metric: "100,838",
    location: "A",
  },
  {
    title: "Product B",
    value: 34,
    metric: "90,224",
    location: "A",
  },
  // ...
  {
    title: "Product M",
    value: 8,
    metric: "10,614",
    location: "B",
  },
  {
    title: "Product N",
    value: 9,
    metric: "11,814",
    location: "B",
  },
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function TotalEnergyConsumptionChart() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedLocation = selectedIndex === 0 ? "A" : "B";

  return (
    <Card>
      <Flex alignItems="start">
        <Text>Energy Consumption</Text>
        <BadgeDelta deltaType="moderateIncrease">23.1%</BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric>123</Metric>
        <Text>mWh</Text>
      </Flex>
      <AreaChart
        className="mt-10 h-48"
        data={sales}
        index="Month"
        categories={["Sales"]}
        colors={["blue"]}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        valueFormatter={valueFormatter}
      />
      <TabGroup
        className="mt-4"
        index={selectedIndex}
        onIndexChange={setSelectedIndex}
      >
        <TabList>
          <Tab>Location A</Tab>
          <Tab>Location B</Tab>
        </TabList>
      </TabGroup>
      {products
        .filter((item: Product) => item.location === selectedLocation)
        .map((item: Product) => (
          <div key={item.title} className="mt-4 space-y-2">
            <Flex>
              <Text>{item.title}</Text>
              <Text>{`${item.value}% (${item.metric})`}</Text>
            </Flex>
            <ProgressBar value={item.value} />
          </div>
        ))}
      {/* <Flex className="mt-6 pt-4 border-t">
        <Button
          size="xs"
          variant="light"
          icon={ArrowRightIcon}
          iconPosition="right"
        >
          View more
        </Button>
      </Flex> */}
    </Card>
  );
}
