import { useState } from "react";
import "tailwindcss/tailwind.css";
const CarPriority = () => {
  const [carData, setCarData] = useState({
    car_id: 0,
    remaining_battery: 0,
    drain_rate: 0,
    remaining_range: 0,
    estimated_time_left: 0,
    time_to_station: 0,
    distance_to_station: 0,
  });

  const [predictedPriority, setPredictedPriority] = useState<number | null>(
    null
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setPredictedPriority(result.predicted_priority);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCarData({ ...carData, [name]: parseFloat(value) });
  };

  return (
    <div className="h-screen flex flex-col text-center space-y-5">
      <h1>Car Priority Prediction</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-center items-center space-y-2"
      >
        {/* Input fields for car data */}
        <div className="flex flex-row space-x-2">
          <label>car_id : </label>
          <input
            type="number"
            name="car_id"
            value={carData.car_id}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>rem_battery : </label>
          <input
            type="number"
            name="remaining_battery"
            value={carData.remaining_battery}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>drain_rate : </label>
          <input
            type="number"
            name="drain_rate"
            value={carData.drain_rate}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>rem_range : </label>
          <input
            type="number"
            name="remaining_range"
            value={carData.remaining_range}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>estimated_time_left : </label>
          <input
            type="number"
            name="estimated_time_left"
            value={carData.estimated_time_left}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>time_to_station : </label>
          <input
            type="number"
            name="time_to_station"
            value={carData.time_to_station}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label>distance_to_station : </label>
          <input
            type="number"
            name="dist_to_station"
            value={carData.distance_to_station}
            onChange={handleChange}
          />
        </div>
        {/* Add other input fields similarly */}
        <button
          type="submit"
          className="bg-black w-1/8 p-2 text-white rounded-md hover:bg-gray-800"
        >
          Predict Priority
        </button>
      </form>
      {predictedPriority && <p>Predicted Priority: {predictedPriority}</p>}
    </div>
  );
};

export default CarPriority;
