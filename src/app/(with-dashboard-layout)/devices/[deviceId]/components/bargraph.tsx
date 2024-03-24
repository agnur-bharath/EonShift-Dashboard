"use client";

import { useState } from "react";

import { CalculatorIcon } from "@heroicons/react/24/outline";
import {
  BarChart,
  Card,
  Select,
  SelectItem,
  Subtitle,
  Title,
} from "@tremor/react";

const getCurrentDate = () => new Date().toISOString();
const getPastDate = (hoursAgo: number) =>
  new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

const BarChartExample = () => {
  const [selectedTimeUnit, setSelectedTimeUnit] = useState("1");

  const handleTimeUnitChange = (value: string) => {
    setSelectedTimeUnit(value);
  };

  const getChartData = () => {
    switch (selectedTimeUnit) {
      case "1": // Last 24 hours
        return [
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 253, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 181, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 211, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 253, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 181, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 211, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 253, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 181, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 211, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          // Add more data points as needed for the last 24 hours
        ];
      case "2": // Last 7 days
        return [
          {
            name: getPastDate(7 * 24),
            Category: 232, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 242, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 277, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 198, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 173, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 100, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 200, // Replace with actual data
          },
          // Add more data points as needed for the last 7 days
        ];
      case "3":
        return [
          {
            name: getPastDate(30 * 24),
            Category: 232, // Replace with actual data
          },
          {
            name: getPastDate(30 * 24),
            Category: 232, // Replace with actual data
          },
          {
            name: getPastDate(30 * 24),
            Category: 221, // Replace with actual data
          },
          {
            name: getPastDate(30 * 24),
            Category: 198, // Replace with actual data
          },
          {
            name: getPastDate(30 * 24),
            Category: 110, // Replace with actual data
          },
          {
            name: getPastDate(30 * 24),
            Category: 86, // Replace with actual data
          },
          {
            name: getPastDate(30 * 24),
            Category: 77, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 253, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 181, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 211, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 253, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 181, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 211, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 253, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 181, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 211, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
        ]; // Last 30 days
        // Replace with data for the last 30 days
        break;
      case "4":
        return [
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 281, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 152, // Replace with actual data
          },
          {
            name: getCurrentDate(),
            Category: 332, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 92, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 78, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 54, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 232, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 342, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 300, // Replace with actual data
          },
          {
            name: getPastDate(7 * 24),
            Category: 240, // Replace with actual data
          },
        ]; // Last 12 months
        // Replace with data for the last 12 months
        break;
      default:
        return [];
    }
  };

  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Select value={selectedTimeUnit} onValueChange={handleTimeUnitChange}>
          <SelectItem value="1" icon={CalculatorIcon}>
            last 24 hrs
          </SelectItem>
          <SelectItem value="2" icon={CalculatorIcon}>
            last 7 Days
          </SelectItem>
          <SelectItem value="3" icon={CalculatorIcon}>
            last 30 Days
          </SelectItem>
          <SelectItem value="4" icon={CalculatorIcon}>
            last 12 Months
          </SelectItem>
        </Select>
      </div>
      <Title>ENERGY CONSUMPTION</Title>
      <Subtitle>values</Subtitle>
      <BarChart
        className="mt-6"
        data={getChartData()}
        index="name"
        categories={["Category"]}
        colors={["blue"]}
        yAxisWidth={48}
      />
    </Card>
  );
};

export default BarChartExample;
