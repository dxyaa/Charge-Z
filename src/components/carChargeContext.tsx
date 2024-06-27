import React, { createContext, useState, useContext } from "react";

interface CarChargeProviderProps {
  children: React.ReactNode;
}

interface CarChargeContextType {
  charge: number;
  setCharge: React.Dispatch<React.SetStateAction<number>>;
}

const CarChargeContext = createContext<CarChargeContextType>({
  charge: 0,
  setCharge: () => {},
});

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

export const useCarChargeContext = () => useContext(CarChargeContext);
