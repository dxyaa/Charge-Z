import { NextApiRequest, NextApiResponse } from "next";
interface CarData {
  car_id: number;
  remaining_battery: number;
  drain_rate: number;
  remaining_range: number;
  estimated_time_left: number;
  time_to_station: number;
  distance_to_station: number;
} // Adjust the import path based on your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data: CarData[] = req.body; // Specify that req.body is an array of CarData objects

      // Processing logic here...
      const predictions = data.map((carData) => {
        // Example of accessing properties safely with type checking
        const {
          car_id,
          remaining_battery,
          drain_rate,
          remaining_range,
          estimated_time_left,
          time_to_station,
          distance_to_station,
        } = carData;

        // Perform prediction logic for each car
        const predicted_priority = Math.random() * 100; // Replace with actual prediction logic

        return {
          car_id,
          predicted_priority,
        };
      });

      res.status(200).json({ predicted_priorities: predictions });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
