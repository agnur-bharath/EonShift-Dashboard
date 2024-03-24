"use client";

import { useState } from "react";

import {
  BadgeDelta,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const salesPeople = [
  {
    name: "Device1",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
    deltaType: "moderateIncrease",
  },
  {
    name: "Device2",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    status: "average",
    deltaType: "unchanged",
  },
  {
    name: "Device3",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    status: "underperforming",
    deltaType: "moderateDecrease",
  },
  {
    name: "Device4",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Device5",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    status: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Device5",
    leads: 82,
    sales: "1,460,000",
    quota: "1,500,000",
    variance: "low",
    region: "Region A",
    status: "average",
    deltaType: "unchanged",
  },
];

const User = () => {
  // State for the selected salespeople
  const [selectedNames, setSelectedNames] = useState([]);

  // Function to check if a salesperson is selected
  // const isSalesPersonSelected = (salesPerson) =>
  //   selectedNames.includes(salesPerson.name) || selectedNames.length === 0;

  return (
    <PageContainer>
      <PageHeading
        mainTitle={"UserInfo"}
        subTitle={"This page gives us the information about the user."}
      />
      <Separator />

      <Card className="mt-6">
        {/* Circular Area with Default Picture (Custom Styling) */}
        <div
          className="flex items-center justify-center bg-blue-200 rounded-full h-16 w-16"
          style={{ fontSize: "0.9rem" }}
        >
          User Icon
        </div>

        {/* Text Area for User Information */}
        <Text className="mt-4">
          <strong>Name:</strong> John Doe
        </Text>
        <Text>
          <strong>Email:</strong> john.doe@example.com
        </Text>
      </Card>

      {/* Actions Section */}

      {/* First Panel: Add Electronic Device */}
      <Card>
        <Title>Add Electronic Device</Title>
        <Text>Connect a new electronic device to your account.</Text>
        <Button>Add Device</Button>
      </Card>

      {/* Second Panel: Payment Issues */}
      <Card>
        <Title>Payment Issues</Title>
        <Text>Resolve any payment issues and manage your subscription.</Text>
        <Button>Manage Payment</Button>
      </Card>

      {/* Insert the Table Card */}
      <Card className="mt-6">
        {/* Salespeople Table
        <MultiSelect
          onValueChange={setSelectedNames}
          placeholder="Select Salespeople..."
          className="max-w-xs"
        >
          {salesPeople.map((item) => (
            <MultiSelectItem key={item.name} value={item.name}>
              {item.name}
            </MultiSelectItem>
          ))}
        </MultiSelect> */}
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell className="text-right">Leads</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Sales ($)
              </TableHeaderCell>
              <TableHeaderCell className="text-right">
                Quota ($)
              </TableHeaderCell>
              <TableHeaderCell className="text-right">Variance</TableHeaderCell>
              <TableHeaderCell className="text-right">Region</TableHeaderCell>
              <TableHeaderCell className="text-right">Status</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salesPeople
              // .filter((item) => isSalesPersonSelected(item))
              .map((item: Record<string, number | string>) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.leads}</TableCell>
                  <TableCell className="text-right">{item.sales}</TableCell>
                  <TableCell className="text-right">{item.quota}</TableCell>
                  <TableCell className="text-right">{item.variance}</TableCell>
                  <TableCell className="text-right">{item.region}</TableCell>
                  <TableCell className="text-right">
                    <BadgeDelta deltaType={item.deltaType} size="xs">
                      {item.status}
                    </BadgeDelta>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </PageContainer>
  );
};

export default User;
