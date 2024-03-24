import { useMemo } from "react";

import { collection, orderBy, query, type Query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";

import { Button } from "~/shared/shadcn/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/shadcn/ui/select";

import { db } from "~/lib/firebase";
import { Icons } from "~/lib/icons";
import { updateFacility } from "~/redux/slices/facilitySlice";
import { type AppDispatch, type RootState } from "~/redux/store";
import { type FacilityDocument } from "~/types";

const TopbarFacilitySelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFacility = useSelector((state: RootState) => state.facility);

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

  if (status === "success" && facilities.length === 0) {
    return (
      <Button variant={"outline"} size={"icon"} className={"mr-2 xl:hidden"}>
        <Icons.warning className={"h-4 w-4"} />
        <p>No Facilities Available</p>
      </Button>
    );
  }

  if (status === "success" && selectedFacility.id === "" && facilities?.[0]) {
    dispatch(updateFacility(facilities[0]));
  }

  return (
    <Select
      value={selectedFacility.id}
      onValueChange={updateSelectedFacility}
      disabled={status === "loading"}
    >
      <SelectTrigger className="w-[130px] lg:w-[200px] duration-150 bg-secondary/25">
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
  );
};

export default TopbarFacilitySelector;
