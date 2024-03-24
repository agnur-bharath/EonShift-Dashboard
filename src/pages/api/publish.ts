// pages/api/publish.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { doc, setDoc } from "firebase/firestore";
import mqtt, { type MqttClient } from "mqtt";

import { db } from "~/lib/firebase";

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
    deviceId: string;
    status: string;
    facilityId: string;
  };
  if (!reqData.deviceId || !reqData.status || !reqData.facilityId) {
    return res.status(400).json({
      success: false,
      message: "Missing deviceId or status or facility id",
    });
  }

  const MQTT_BROKER_URL = "mqtt://broker.hivemq.com";
  const MQTT_TOPIC = `eonshift/${reqData.deviceId}/status`;

  try {
    const client: MqttClient = mqtt.connect(MQTT_BROKER_URL);

    client.on("connect", () => {
      client.publish(MQTT_TOPIC, reqData.status, {}, async () => {
        try {
          await setDoc(
            doc(
              db,
              "facilities",
              reqData.facilityId,
              "devices",
              reqData.deviceId,
            ),
            { status: reqData.status },
            { merge: true },
          );

          return res
            .status(200)
            .json({ success: true, message: "Message published" });
        } catch (error) {
          console.error("Firebase Update Error:", error);
          res
            .status(500)
            .json({ success: false, message: "Failed to update Firebase" });
        } finally {
          client.end();
        }
      });
    });
  } catch (error) {
    console.error("MQTT Connection Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to connect to MQTT broker" });
  }
};
