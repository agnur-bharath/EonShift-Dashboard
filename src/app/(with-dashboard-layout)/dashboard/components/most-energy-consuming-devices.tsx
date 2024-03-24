import { useMemo, useState } from "react";

import { CodeBracketIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import {
  BarList,
  Bold,
  Card,
  Flex,
  Tab,
  TabGroup,
  TabList,
  Text,
  Title,
} from "@tremor/react";
import {
  collection,
  doc,
  limit,
  orderBy,
  query,
  type Query,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";

import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";
import { type DeviceDocument } from "~/types";

// const categories = [
//   { key: "developers", name: "Developers", icon: CodeIcon },
//   { key: "analysts", name: "Analysts", icon: TableIcon },
// ];

interface Visits {
  name1: string;
  value: number;
}

const visits = [
  { name1: "Device-1", value: 652 },
  { name1: "Device-2", value: 134 },
  { name1: "Device-3", value: 542 },
  { name1: "Device-4", value: 234 },
  // { name: "Device-5", value: 32 },
  // { name: "Device-6", value: 15 },
  // { name: "Device-7", value: 456 },
];

// const developerVisits = [
//   { name: "Device-1", value: 652 },
//   { name: "Device-2", value: 134 },
//   { name: "Device-3", value: 542 },
//   { name: "Device-4", value: 234 },
//   { name: "Device-5", value: 32 },
//   { name: "Device-6", value: 15 },
// ];

// const analystVisits = [
//   { name: "Device-1", value: 456 },
//   { name: "Device-2", value: 371 },
//   { name: "Device-3", value: 96 },
//   { name: "Device-4", value: 191 },
//   { name: "Device-5", value: 82 },
//   { name: "Device-6", value: 35 },
// ];

// const visits = {
//   developers: developerVisits,
//   analysts: analystVisits,
// };

const sortData = (data: Visits[]) =>
  data.sort((a, b) => {
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;
    return 0;
  });

// export default function Example() {
// //   const [selectedIndex, setSelectedIndex] = useState(0);
//   // const selectedCategory = selectedIndex === 0 ? "developers" : "analysts";

//   return (
//     <Card className="max-w-md mx-auto">
//       <Title>Most energy Consuming Devices</Title>
//       {/* <TabGroup
//         index={selectedIndex}
//         onIndexChange={setSelectedIndex}
//         className="mt-6"
//       >
//         <TabList>
//           {categories.map((category) => (
//             <Tab key={category.key} value={category.key} icon={category.icon}>
//               {category.name}
//             </Tab>
//           ))}
//         </TabList>
//       </TabGroup> */}
//       <Flex className="mt-6">
//         <Text>
//           <Bold>Device</Bold>
//         </Text>
//         <Text>
//           <Bold>Energy Consumed</Bold>
//         </Text>
//       </Flex>
//       {/* <BarList
//         data={sortData(visits[selectedCategory])}
//         showAnimation={false}
//         className="mt-4"
//       /> */}
//     </Card>
//   );
// }

export default function MostEnergyConsumingDevices() {
  const { id } = useSelector((state: RootState) => state.facility);

  const most_energy_consuming_devices_query = useMemo(() => {
    return query(
      collection(db, "facilities", id, "devices"),
      orderBy("energy_usage", "desc"),
      limit(5),
    ) as Query<DeviceDocument>;
  }, [id]);

  const { data, status } = useFirestoreCollectionData(
    most_energy_consuming_devices_query,
    {
      initialData: [],
      idField: "id",
    },
  );

  const processData = (data: DeviceDocument[]) => {
    return data.map((device) => {
      return {
        name: device.name,
        value: device.energy_usage,
      };
    });
  };

  if (status === "loading" || status === "error" || !data) {
    return <Skeleton className="max-w-md mx-auto h-400" />;
  }

  return (
    <Card className="max-w-md mx-auto hover:shadow-md rounded-lg hover:shadow-white">
      <Title>Most energy Consuming Devices</Title>
      <Flex className="mt-6 font-medium">
        <Text>Device</Text>
        <Text>Energy Consumed (mWh)</Text>
      </Flex>
      <BarList
        data={processData(data)}
        // title={"name"}
        showAnimation={false}
        className="mt-4"
      />
    </Card>
  );
}
