import { useState } from "react";
import "tailwindcss/tailwind.css";

// types.ts (or any relevant file)
export interface CarData {
  car_id: string;
  remaining_battery: string;
  drain_rate: string;
  remaining_range: string;
  estimated_time_left: string;
  time_to_station: string;
  distance_to_station: string;
}
export interface CarPrediction {
  predicted_priority: number; // Adjust this type based on your actual data structure
}
const CarPriority = () => {
  const [numCars, setNumCars] = useState(1); // State to manage number of cars
  const [carDataList, setCarDataList] = useState<Array<any>>([]); // State to hold car data

  const [predictedPriorities, setPredictedPriorities] = useState<
    Array<number | null>
  >([]); // State to hold predicted priorities
  const [maxPriorityCarId, setMaxPriorityCarId] = useState<number | null>(null); // State to hold car ID with max priority

  const handleChangeNumCars = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setNumCars(value);
    setCarDataList(new Array(value).fill({})); // Initialize carDataList with empty objects
    setPredictedPriorities(new Array(value).fill(null)); // Initialize predictedPriorities with null values
    setMaxPriorityCarId(null); // Reset maxPriorityCarId when number of cars changes
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Prepare car data for submission
      const formattedData = carDataList.map((car) => ({
        car_id: parseInt(car.car_id),
        remaining_battery: parseFloat(car.remaining_battery),
        drain_rate: parseFloat(car.drain_rate),
        remaining_range: parseFloat(car.remaining_range),
        estimated_time_left: parseFloat(car.estimated_time_left),
        time_to_station: parseFloat(car.time_to_station),
        distance_to_station: parseFloat(car.distance_to_station),
      }));

      if (formattedData.length === 0) {
        throw new Error("No valid car data to submit");
      }
      console.log("sending to backend ");
      // Send formattedData to backend for prediction
      const response = await fetch("http://localhost:5000/predict", {
        // Adjust URL as per your Flask development server
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      setMaxPriorityCarId(result.car_id);
      // Update maxPriorityCarId state with the car ID with maximum priority
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChangeCar = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedCarDataList = [...carDataList];
    updatedCarDataList[index] = { ...updatedCarDataList[index], [name]: value };
    setCarDataList(updatedCarDataList);
  };

  return (
    <div className="h-screen flex flex-col text-center space-y-5">
      <h1>Car Priority Prediction</h1>
      <div className="flex flex-row space-x-2">
        <label>Number of Cars:</label>
        <input
          type="number"
          name="num_cars"
          value={numCars}
          onChange={handleChangeNumCars}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-center items-center space-y-2"
      >
        {/* Input fields for each car */}
        {carDataList.map((carData, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <h3>Car {index + 1} Details</h3>
            <div className="flex flex-row space-x-2">
              <label>car_id:</label>
              <input
                type="number"
                name="car_id"
                value={carData.car_id || ""}
                onChange={(e) => handleChangeCar(index, e)}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <label>rem_battery:</label>
              <input
                type="number"
                name="remaining_battery"
                value={carData.remaining_battery || ""}
                onChange={(e) => handleChangeCar(index, e)}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <label>drain_rate:</label>
              <input
                type="number"
                name="drain_rate"
                value={carData.drain_rate || ""}
                onChange={(e) => handleChangeCar(index, e)}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <label>rem_range:</label>
              <input
                type="number"
                name="remaining_range"
                value={carData.remaining_range || ""}
                onChange={(e) => handleChangeCar(index, e)}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <label>estimated_time_left:</label>
              <input
                type="number"
                name="estimated_time_left"
                value={carData.estimated_time_left || ""}
                onChange={(e) => handleChangeCar(index, e)}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <label>time_to_station:</label>
              <input
                type="number"
                name="time_to_station"
                value={carData.time_to_station || ""}
                onChange={(e) => handleChangeCar(index, e)}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <label>distance_to_station:</label>
              <input
                type="number"
                name="distance_to_station"
                value={carData.distance_to_station || ""}
                onChange={(e) => handleChangeCar(index, e)}
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-black w-1/8 p-2 text-white rounded-md hover:bg-gray-800"
        >
          Predict Priorities
        </button>
      </form>
      {/* Display car ID with maximum priority */}
      <div>max priority : </div>
      {maxPriorityCarId && (
        <p>Car ID with Maximum Priority: {maxPriorityCarId}</p>
      )}
    </div>
  );
};

export default CarPriority;
