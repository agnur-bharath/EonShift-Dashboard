"use client";

import { useMemo } from "react";

import { doc, type DocumentReference } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreDocData } from "reactfire";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/shadcn/ui/card";
import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";
import { type FacilityDocument } from "~/types";

const ValueCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className={"text-2xl font-bold"}>{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};

/**
 * TotalFacilityConsumption is a React component that displays the total energy consumption
 * of a facility. It fetches the facility data from Firestore and displays it in a grid of cards.
 * Each card represents a different aspect of the facility's energy consumption.
 *
 * While the data is loading, it displays a skeleton loader.
 *
 * If there's an error loading the data, it logs the error to the console.
 */
const TotalFacilityConsumption = () => {
  // The ID of the facility is fetched from the Redux store.
  const { id: facilityId } = useSelector((state: RootState) => state.facility);

  // A Firestore query is created to fetch the facility data.
  const query = useMemo(
    () =>
      doc(db, "facilities", facilityId) as DocumentReference<FacilityDocument>,
    [facilityId],
  );

  // The facility data is fetched from Firestore.
  const { data: facility, status } = useFirestoreDocData(query, {
    initialData: null,
    suspense: true,
  });

  // If the data is still loading or if there's no facility data, a skeleton loader is displayed.
  if (status === "loading" || !facility) {
    return (
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </section>
    );
  }

  // If there's an error loading the data, the error is logged to the console.
  if (status === "error") {
    console.error("Error loading facility data", facility);
  }

  // If the data has loaded successfully, it is displayed in a grid of cards.
  return (
    <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 w-full">
      <span className="hover:shadow hover:shadow-gray-300 rounded-lg">
        <ValueCard
          title={"Total Energy Consumption"}
          value={`${facility?.total_consumption?.current_energy_usage} mWh`}
        />
      </span>
      <span className="hover:shadow hover:shadow-gray-300 rounded-lg">
        <ValueCard
          title={"Peak Usage"}
          value={`${facility?.total_consumption?.peak_usage} mWh`}
        />
      </span>
      <span className="hover:shadow hover:shadow-gray-300 rounded-lg">  
        <ValueCard
          title={"Average Daily Usage"}
          value={`${facility?.total_consumption?.daily_average_usage} mWh`}
        />
      </span> 
      <span className="hover:shadow hover:shadow-gray-300 rounded-lg">
        <ValueCard
          title={"Carbon Footprint"}
          value={`${facility?.total_consumption?.carbon_footprint} kg`}
        />
      </span> 
    </section>
  );
};

export default TotalFacilityConsumption;
