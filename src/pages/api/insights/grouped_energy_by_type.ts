import type { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "firebase-admin";

import { dbAdmin } from "~/utils/firebase";

import { type DeviceDocument, type FacilityDocument } from "~/types";

import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

type Data = {
  success: boolean;
  message: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const reqData = req.body as {
    facilityId: string;
  };
  if (!reqData.facilityId) {
    return res.status(400).json({
      success: false,
      message: "Missing deviceId or status or facility id",
    });
  }

  // const MQTT_BROKER_URL = "mqtt://broker.hivemq.com";
  // const MQTT_TOPIC = `${reqData.deviceId}/status`;

  try {
    const facilityRef = dbAdmin
      .collection("facilities")
      .doc(reqData.facilityId);

    const facility =
      (await facilityRef.get()) as DocumentSnapshot<FacilityDocument>;

    // Check if the facility exists.
    if (!facility.exists) {
      return res.status(404).json({
        success: false,
        message: "Facility not found",
      });
    }

    // Get all the devices in the facility.
    const devicesRef = facilityRef.collection("devices");
    const devices = (await devicesRef.get()) as QuerySnapshot<DeviceDocument>;

    // Check if the facility has any devices.
    if (devices.empty) {
      return res.status(404).json({
        success: false,
        message: "Facility has no devices",
      });
    }

    const groupedDevices = new Map();
    if (devices.size > 1) {
      devices.docs.forEach((device: QueryDocumentSnapshot<DeviceDocument>) => {
        const { type = "other", energy_usage = 0 } = device.data();

        if (groupedDevices.has(type)) {
          groupedDevices.set(type, groupedDevices.get(type) + energy_usage);
        } else {
          groupedDevices.set(type, energy_usage);
        }
      });
    }

    const insightRef = facilityRef
      .collection("insights")
      .doc("group_energy_by_type");

    await insightRef.set({
      last_updated: firestore.Timestamp.now(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: Object.fromEntries(groupedDevices),
    });

    return res.status(200).json({
      success: true,
      message: "Updated the insight for the group_energy_by_type",
    });
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({ success: false, message: "Unable to updated the insight" });
  }
};
