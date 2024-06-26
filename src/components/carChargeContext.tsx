import React, { createContext, useState, useContext } from "react";

// Define the shape of props that CarChargeProvider expects
interface CarChargeProviderProps {
  children: React.ReactNode; // children should be of type React.ReactNode
}

// Define the shape of your context data
interface CarChargeContextType {
  charge: number;
  setCharge: React.Dispatch<React.SetStateAction<number>>;
}

// Create a new context with initial values
const CarChargeContext = createContext<CarChargeContextType>({
  charge: 0,
  setCharge: () => {},
});

// Create a provider component for the context
export const CarChargeProvider: React.FC<CarChargeProviderProps> = ({
  children,
}) => {
  const [charge, setCharge] = useState<number>(0);

  return (
    <CarChargeContext.Provider value={{ charge, setCharge }}>
      {children}
    </CarChargeContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useCarChargeContext = () => useContext(CarChargeContext);
