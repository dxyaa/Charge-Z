import {
  Box,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow } from "react-icons/fa";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import useSocket from "./useSocket";

interface MapsProps {
  location: string;
  onChargingStationsFound?: (stations: any[]) => void;
}

const center = { lat: 48.8584, lng: 2.2945 };

function Maps({ location, onChargingStationsFound }: MapsProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const socket = useSocket("http://localhost:4000");

 
  useEffect(() => {
    if (socket) {
      socket.on("locationUpdate", (data: { loc: string }) => {
        console.log("Received location update:", data);
        geocodeLocation(data.loc);
      });

      return () => {
        socket.off("locationUpdate");
      };
    }
  }, [socket]);

  async function geocodeLocation(location: string) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0].geometry.location) {
        const location = results[0].geometry.location;
        map?.panTo(location);
        map?.setZoom(15);
        displayNearbyEVChargingStations(location.lat(), location.lng());
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  async function displayNearbyEVChargingStations(lat: number, lng: number) {
    let markers: google.maps.Marker[] = [];
    let chargingStations: any[] = [];

    if (!map) {
      return;
    }

    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(lat, lng),
      radius: 1000,
      type: "charging_station",
      keyword: "electric vehicle charging",
    };

    const placesService = new google.maps.places.PlacesService(map);

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        markers.forEach((marker) => marker.setMap(null));
        markers = [];

        chargingStations = results.map((place) => ({
          name: `${place.name}, ${place.vicinity}`,
          location: place.geometry && place.geometry.location ? {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          } : null
        }));

        results.forEach((place) => {
          if (place.geometry) {
            const marker = new google.maps.Marker({
              position: place.geometry.location,
              map: map,
              title: place.name,
              clickable: true
            });
            markers.push(marker);
          }
        });

        calculateDistances(new google.maps.LatLng(lat, lng), chargingStations);

        if (onChargingStationsFound) {
          onChargingStationsFound(chargingStations);
        }
      } else {
        console.error("Places Nearby Search request failed:", status);
      }
    });
  }

  async function calculateDistances(origin: google.maps.LatLng, stations: any[]) {
    const distanceService = new google.maps.DistanceMatrixService();
    const destinations = stations.map((station) => new google.maps.LatLng(station.location.lat, station.location.lng));

    distanceService.getDistanceMatrix({
        origins: [origin],
        destinations: destinations,
        travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response) {
            response.rows[0].elements.forEach((element, index) => {
                if (element.status === "OK") {
                    stations[index].distance = element.distance.text;
                    stations[index].duration = element.duration.text;

                    // Convert duration to seconds for sorting
                    const durationParts = element.duration.text.split(' ');
                    let totalSeconds = 0;
                    for (let i = 0; i < durationParts.length; i += 2) {
                        const value = parseInt(durationParts[i]);
                        const unit = durationParts[i + 1];
                        if (unit.includes("hour")) {
                            totalSeconds += value * 3600;
                        } else if (unit.includes("min")) {
                            totalSeconds += value * 60;
                        } else if (unit.includes("sec")) {
                            totalSeconds += value;
                        }
                    }
                    stations[index].durationInSeconds = totalSeconds;
                }
            });

            // Sort stations by durationInSeconds
            stations.sort((a, b) => a.durationInSeconds - b.durationInSeconds);

            if (socket && socket.connected) {
              console.log("Emitting location data via WebSocket:", stations);
              socket.emit("location", { stations: stations });
            } else {
              console.error("WebSocket is not connected.");
            }
        
            console.log("Sorted Charging Stations with Distance and Duration: ", stations);
        } else {
            console.error("Distance Matrix request failed:", status);
        }
    });
}


  if (loadError) {
    return <div>Error loading Google Maps API!</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Flex position="relative" flexDirection="column" alignItems="center" h="50vh" w="75vw">
      <Box position="absolute" left={0} top={0} h="50vh" borderRadius={7} w="60.5vw">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
          onLoad={(map) => setMap(map || null)}
        >
          <Marker position={center} />
        </GoogleMap>
      </Box>
      <Box p={4} borderRadius="lg" m={4} bgColor="white" shadow="base" minW="container.md" zIndex="1">
        <Text>Waiting for location updates...</Text>
        <Box mt={4} className="text-black" justifyContent="space-between">
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map?.panTo(center);
              map?.setZoom(15);
            }}
          />
        </Box>
      </Box>
    </Flex>
  );
}

export default Maps;
