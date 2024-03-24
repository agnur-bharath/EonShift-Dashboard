import { firestore } from "firebase-admin";

import Timestamp = firestore.Timestamp;

export type FirebaseDate = Timestamp;

export type FacilityDocument = {
  created_at?: FirebaseDate;
  updated_at?: FirebaseDate;
  id: string;
  location: {
    _lat: number;
    _long: number;
  };
  name: string;
  owner_id: string;
  total_consumption: {
    current_energy_usage: number;
    daily_average_usage: number;
    peak_usage: number;
    carbon_footprint: number;
  };
  type: string;
};

export type DeviceDocument = {
  created_at: FirebaseDate;
  last_updated: FirebaseDate;
  name: string;
  type: string;
  location: string;
  manufacturer: string;
  energy_usage: number;
  status: string;
  pinned: boolean;
  start_time: string;
  end_time: string;
  id: string;
};

export type EnergyDocument = {
  id: string;
  timestamp: FirebaseDate;
  energy_consumption: number;
  device_id: string;
};

export type GroupedEnergyByTypeDocument = {
  last_updated: FirebaseDate;
  data: Record<string, number>;
};
