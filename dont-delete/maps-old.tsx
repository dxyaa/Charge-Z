import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface MapsProps {
  location: string;
  onChargingStationsFound?: (stations: any[]) => void;
}

const Maps: React.FC<MapsProps> = ({ location, onChargingStationsFound }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (isLoaded && location) {
      geocodeLocation(location);
    }
  }, [isLoaded, location]);

  const geocodeLocation = (address: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0].geometry.location) {
        const location = results[0].geometry.location;
        displayNearbyEVChargingStations(location.lat(), location.lng());
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const displayNearbyEVChargingStations = (lat: number, lng: number) => {
    if (!map) return;

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

  return (
    <GoogleMap
      center={{ lat: 0, lng: 0 }}
      zoom={2}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      onLoad={(map) => setMap(map)}
    >
      <Marker position={{ lat: 0, lng: 0 }} />
    </GoogleMap>
  );
};

export default Maps;
