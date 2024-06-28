import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";

interface MapsProps {
  origin: string;
  destination: string;
  onChargingStationsFound?: (stations: any[]) => void;
  onDistanceDurationChange?: (distance: string, duration: string) => void;
}

const RouteMaps: React.FC<MapsProps> = ({ origin, destination, onChargingStationsFound, onDistanceDurationChange }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (isLoaded) {
      calculateRoute();
    }
  }, [isLoaded, origin, destination]);

  const calculateRoute = () => {
    if (!isLoaded) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          const route = result.routes[0];
          const leg = route.legs[0];
          
          if (onDistanceDurationChange) {
            onDistanceDurationChange(leg.distance?.text || '', leg.duration?.text || '');
          }

          const startLocation = leg.start_location;
          const endLocation = leg.end_location;
          displayNearbyEVChargingStations(startLocation.lat(), startLocation.lng());
          displayNearbyEVChargingStations(endLocation.lat(), endLocation.lng());
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  const displayNearbyEVChargingStations = (lat: number, lng: number) => {
    if (!isLoaded || !map) return;

    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(lat, lng),
      radius: 1000,
      type: "charging_station",
      keyword: "electric vehicle charging",
    };

    const placesService = new google.maps.places.PlacesService(map);

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const chargingStations = results.map((place) => ({
          name: place.name,
          vicinity: place.vicinity,
          location: place.geometry?.location,
        }));

        if (onChargingStationsFound) {
          onChargingStationsFound(chargingStations);
        }
      } else {
        console.error("Places Nearby Search request failed:", status);
      }
    });
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return isLoaded ? (
    <GoogleMap
      center={{ lat: 0, lng: 0 }}
      zoom={2}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      onLoad={(map) => setMap(map)}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default RouteMaps;
