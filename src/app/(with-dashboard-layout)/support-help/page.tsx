"use client";

import { Button, Card, Grid, Text, Title } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

interface Device {
  id: string;
  name: string;
}

interface SubscriptionDetails {
  plan: string;
  price: number;
}

const SettingsPage = () => {
  // Dummy data for devices and subscription details
  const devices: Device[] = [
    { id: "1", name: "Device 1" },
    { id: "2", name: "Device 2" },
    { id: "3", name: "Device 3" },
  ];

  const subscriptionDetails: SubscriptionDetails = {
    plan: "Premium",
    price: 9.99,
  };

  const handleDeviceNameChange = (deviceId: string, newName: string) => {
    // Implement logic to update the device name
    console.log(`Changing name of device ${deviceId} to ${newName}`);
  };

  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Support Page"}
        subTitle={"This page gives us the informations about the supportpnp."}
      />
      <Separator />
      <Text>Sample</Text>
      <Card className="mt-6 space-y-4">
        <Title>Manage Devices</Title>
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between">
            <Text>{device.name}</Text>
            <Button
              onClick={() => handleDeviceNameChange(device.id, "New Name")}
            >
              Activation
            </Button>
          </div>
        ))}
      </Card>

      {/* Subscription Details section */}
      <Card className="mt-6">
        <Title>Subscription Details</Title>
        <Text>Plan: {subscriptionDetails.plan}</Text>
        <Text>Price: ${subscriptionDetails.price.toFixed(2)}</Text>
        <Button>Manage Subscription</Button>
      </Card>

      {/* Change Device Names section */}
      <Card className="mt-6">
        <Title>Change Device Names</Title>
        {devices.map((device) => (
          <Card key={device.id}>
            <Title>{device.name}</Title>
            <input
              type="text"
              placeholder="New Name"
              // Use state to store the new name
            />
            <Button
              onClick={() => handleDeviceNameChange(device.id, "New Name")}
            >
              Save Name
            </Button>
          </Card>
        ))}
      </Card>
    </PageContainer>
  );
};

export default SettingsPage;

// "use client";

// import { Button, Card, Grid, Text, Title } from "@tremor/react";

// interface Device {
//   id: string;
//   name: string;
// }

// interface SubscriptionDetails {
//   plan: string;
//   price: number;
// }

// export default function SettingsPage() {
//   // Dummy data for devices and subscription details
//   const devices: Device[] = [
//     { id: "1", name: "Device 1" },
//     { id: "2", name: "Device 2" },
//     { id: "3", name: "Device 3" },
//   ];

// const subscriptionDetails: SubscriptionDetails = {
//   plan: "Premium",
//   price: 9.99,
// };

// const handleDeviceNameChange = (deviceId: string, newName: string) => {
//   // Implement logic to update the device name
//   console.log(`Changing name of device ${deviceId} to ${newName}`);
// };

//   return (
//     <main>
//       <Title>Settings</Title>

//       {/* Manage Devices section */}
// <Card className="mt-6 space-y-4">
//   <Title>Manage Devices</Title>
//   {devices.map((device) => (
//     <div key={device.id} className="flex items-center justify-between">
//       <Text>{device.name}</Text>
//       <Button
//         onClick={() => handleDeviceNameChange(device.id, "New Name")}
//       >
//         Activation
//       </Button>
//     </div>
//   ))}
// </Card>

// {/* Subscription Details section */}
// <Card className="mt-6">
//   <Title>Subscription Details</Title>
//   <Text>Plan: {subscriptionDetails.plan}</Text>
//   <Text>Price: ${subscriptionDetails.price.toFixed(2)}</Text>
//   <Button>Manage Subscription</Button>
// </Card>

// {/* Change Device Names section */}
// <Card className="mt-6">
//   <Title>Change Device Names</Title>
//   {devices.map((device) => (
//     <Card key={device.id}>
//       <Title>{device.name}</Title>
//       <input
//         type="text"
//         placeholder="New Name"
//         // Use state to store the new name
//       />
//       <Button
//         onClick={() => handleDeviceNameChange(device.id, "New Name")}
//       >
//         Save Name
//       </Button>
//     </Card>
//   ))}
// </Card>
//     </main>
//   );
// }
