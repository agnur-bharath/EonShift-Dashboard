"use client";

import { AreaChart, Card, Title } from "@tremor/react";

const chartdata1 = [
  {
    date: "Jan 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "Feb 1",
    Consumption: 2899,
    Prediction: 2880,
  },
  {
    date: "Mar 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "April 1",
    Consumption: 2899,
    Prediction: 2880,
  },
  {
    date: "May 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "June 1",
    Consumption: 2899,
    Prediction: 2880,
  },
  {
    date: "July 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "Aug 1",
    Consumption: 2899,
    Prediction: 2880,
  },
  {
    date: "Sept 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "Oct 1",
    Consumption: 2899,
    Prediction: 2880,
  },
  {
    date: "Nov 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "Dec 1",
    Consumption: 2899,
    Prediction: 2880,
  },
];

const chartdata2 = [
  {
    date: "Jan 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "Feb 1",
    Consumption: 2899,
    Prediction: 2880,
  },
];

const chartdata3 = [
  {
    date: "Jan 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "Feb 1",
    Consumption: 2899,
    Prediction: 2880,
  },
];

const chartdata4 = [
  {
    date: "Jan 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "Feb 1",
    Consumption: 2899,
    Prediction: 2880,
  },
];

const chartdata5 = [
  {
    date: "Jan 1",
    Consumption: 2890,
    Prediction: 2338,
  },
  {
    date: "Feb 1",
    Consumption: 2899,
    Prediction: 2880,
  },
];

const valueFormatter = function (number1: number) {
  return new Intl.NumberFormat("us").format(number1).toString();
};

const PerformancePage = () => (
  <div>
    {/* First Chart */}
    <Card>
      <Title>Device1</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata1}
        index="date"
        categories={["Consumption", "Prediction"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>

    {/* Second Chart */}
    <Card>
      <Title>Device2</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata2}
        index="date"
        categories={["Consumption", "Prediction"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
    <Card>
      <Title>Device3</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata3}
        index="date"
        categories={["Consumption", "Prediction"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
    <Card>
      <Title>Device4</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata4}
        index="date"
        categories={["Consumption", "Prediction"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
    <Card>
      <Title>Device5</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata5}
        index="date"
        categories={["Consumption", "Prediction"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
  </div>
);

export default PerformancePage;
