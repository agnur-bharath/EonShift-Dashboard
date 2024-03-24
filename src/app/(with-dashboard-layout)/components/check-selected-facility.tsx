"use client";

import { useMemo, type ReactElement } from "react";

import { collection, orderBy, query, type Query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";

import { LoadingPage } from "~/shared/custom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/shared/shadcn/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/shadcn/ui/select";

import { db } from "~/lib/firebase";
import { updateFacility } from "~/redux/slices/facilitySlice";
import { type AppDispatch, type RootState } from "~/redux/store";
import { type FacilityDocument } from "~/types";

const CheckSelectedFacility = ({ children }: { children: ReactElement }) => {
  const selectedFacility = useSelector((state: RootState) => state.facility);
  const dispatch = useDispatch<AppDispatch>();

  const facilitiesQuery = useMemo(
    () =>
      query(
        collection(db, "facilities"),
        orderBy("created_at", "desc"),
      ) as Query<FacilityDocument>,
    [],
  );

  const { data: facilities, status } = useFirestoreCollectionData(
    facilitiesQuery,
    {
      initialData: [],
      idField: "id",
    },
  );

  const updateSelectedFacility = (id: string) => {
    const selectedFacility = facilities.find((f) => f.id === id);
    if (selectedFacility) {
      dispatch(updateFacility(selectedFacility));
    }
  };

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "success" && facilities.length === 0) {
    return null;
  }

  if (status === "success" && selectedFacility.id === "" && facilities?.[0]) {
    return (
      <AlertDialog
        open={
          status === "success" && selectedFacility && selectedFacility.id === ""
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Select Facility</AlertDialogTitle>
            <AlertDialogDescription>
              You have not selected a facility yet. Please select a facility to
              continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Select
            value={selectedFacility.id}
            onValueChange={updateSelectedFacility}
          >
            <SelectTrigger className="w-full duration-150 bg-secondary/25">
              <SelectValue placeholder="Select Facility" />
            </SelectTrigger>
            <SelectContent>
              {facilities.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return children;
};

export default CheckSelectedFacility;
