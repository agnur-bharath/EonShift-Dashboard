import { BarChart, Card, Flex, Grid, Text, Title } from "@tremor/react";

const chartdata = [
  {
    name: "Jan 2024",
    "Energy Consumption": 2488,
  },
  {
    name: "Feb 2024",
    "Energy Consumption": 1445,
  },
];

const valueFormatter = (number: number) =>
  `${new Intl.NumberFormat("us").format(number).toString()} mWh`;

const BarChartComponent = () => (
  <Card>
    <Title className={"text-lg"}>CHANGE IN COST</Title>

    {/* Additional Cards for Increase in Energy and Increase in Cost */}
    <Flex className="mt-6">
      <Card className="mr-4 flex-1">
        <Title className={"text-lg font-bold"} color="yellow">
          +40%
        </Title>
        <Text className={"text-sm"}>Increase in the energy.</Text>
        {/* Add content for Increase in Energy */}
      </Card>

      <Card className="flex-1">
        <Title className={"text-lg font-bold"} color="red">
          {" "}
          +200 K ₹{" "}
        </Title>
        <Text className={"text-sm"}>Increase in cost</Text>
        {/* Add content for Increase in Cost */}
      </Card>
    </Flex>

    {/* Bar Chart */}
    <BarChart
      className="mt-6"
      data={chartdata}
      index="name"
      categories={["Energy Consumption"]}
      colors={["blue"]}
      valueFormatter={valueFormatter}
      yAxisWidth={48}
    />
  </Card>
);

export default BarChartComponent;
