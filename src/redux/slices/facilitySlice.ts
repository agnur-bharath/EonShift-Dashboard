import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { type FacilityDocument } from "~/types";

const initialState: FacilityDocument = {
  id: "",
  location: {
    _lat: 0,
    _long: 0,
  },
  name: "",
  owner_id: "",
  total_consumption: {
    current_energy_usage: 0,
    daily_average_usage: 0,
    peak_usage: 0,
    carbon_footprint: 0,
  },
  type: "",
};

export const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    updateFacility: (
      state,
      action: PayloadAction<Partial<FacilityDocument>>,
    ) => {
      return { ...state, ...action.payload };
    },
    // If you need to reset the facility to null with an action, you can do that as well
    clearFacility: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFacility, clearFacility } = facilitySlice.actions;

export default facilitySlice.reducer;
