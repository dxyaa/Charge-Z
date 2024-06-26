import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

interface CarData {
  car_id: number;
  remaining_battery: number;
  drain_rate: number;
  remaining_range: number;
  estimated_time_left: number;
  time_to_station: number;
  distance_to_station: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data: CarData[] = req.body; // Array of CarData objects from frontend

      // Format data for sending to model server
      const formattedData = data.map((carData) => ({
        remaining_battery: carData.remaining_battery,
        drain_rate: carData.drain_rate,
        remaining_range: carData.remaining_range,
        estimated_time_left: carData.estimated_time_left,
        time_to_station: carData.time_to_station,
        distance_to_station: carData.distance_to_station,
      }));

      // Call your machine learning model endpoint
      const modelEndpoint = "http://localhost:5000/predict"; // Replace with your model endpoint
      const modelResponse = await fetch(modelEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!modelResponse.ok) {
        throw new Error("Failed to get predictions from model server");
      }

      const result = await modelResponse.json();

      // Determine car_id with maximum priority
      const maxPriorityCarId = result.car_id; // Adjust based on how your model server returns the data

      // Return the car_id with maximum priority to the frontend
      res.status(200).json({ max_priority_car_id: maxPriorityCarId });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
