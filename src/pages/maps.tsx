import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { debounce } from 'lodash';
const center = { lat: 48.8584, lng: 2.2945 };

interface Location {
  origin: string;
  destination: string;
  onDistanceDurationChange?: (distance: string, duration: string) => void;
}

function Maps({ origin = '', destination = '', onDistanceDurationChange }: Location) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });



  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);



  useEffect(() => {
    if (origin && destination && originRef.current && destinationRef.current) {
      originRef.current.value = origin;
      destinationRef.current.value = destination;
      calculateRoute(origin, destination);
    }
  }, [origin, destination, isLoaded]);

  useEffect(() => {
    if (onDistanceDurationChange) {
      onDistanceDurationChange(distance, duration);
    }
  }, [distance, duration, onDistanceDurationChange]);

  useEffect(() => {
    if (duration) {
      getCurrentLocation();
    }
  }, [duration]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute(origin: string, destination: string) {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    if (results.routes && results.routes.length > 0 && results.routes[0].legs && results.routes[0].legs.length > 0) {
      const leg = results.routes[0].legs[0];
      setDirectionsResponse(results);
      setDistance(leg.distance?.text || "");
      setDuration(leg.duration?.text || "");
    } else {
      setDirectionsResponse(null);
      setDistance("");
      setDuration("");
    }
  }

  async function getCurrentLocation() {
    if (!duration) {
      alert("Please calculate a route first before getting the current location.");
      return;
    }

    const durationInSeconds = parseInt(duration.split(" ")[0]);
    const remainingDuration = durationInSeconds - durationInSeconds * 0.4;
    const portionCompleted = remainingDuration / durationInSeconds;

    if (!directionsResponse || !directionsResponse.routes) {
      return;
    }

    const route = directionsResponse.routes[0];
    const leg = route.legs[0];
    const totalDistance = leg.distance?.value || 0;
    const distanceCompleted = totalDistance * (1 - portionCompleted);

    let accumulatedDistance = 0;
    let probableLocation = null;

    for (const step of leg.steps) {
      if (step.distance && step.distance.value) {
        const stepDistance = step.distance.value;
        if (accumulatedDistance + stepDistance >= distanceCompleted) {
          const ratio = (distanceCompleted - accumulatedDistance) / stepDistance;
          const lat = step.start_location.lat() + (step.end_location.lat() - step.start_location.lat()) * ratio;
          const lng = step.start_location.lng() + (step.end_location.lng() - step.start_location.lng()) * ratio;
          probableLocation = { lat, lng };
          break;
        }
        accumulatedDistance += stepDistance;
      }
    }

    if (probableLocation) {
      map?.panTo(probableLocation);
      displayNearbyEVChargingStations(probableLocation.lat, probableLocation.lng);
      map?.setZoom(15);
    }
  }

  async function displayNearbyEVChargingStations(lat: number, lng: number) {
    let markers: google.maps.Marker[] = [];

    if (!map) {
      return;
    }

    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(lat, lng),
      radius: 5000,
      type: "charging_station",
      keyword: "electric vehicle charging",
    };

    const placesService = new google.maps.places.PlacesService(map);

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        markers.forEach((marker) => marker.setMap(null));
        markers = [];

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
      } else {
        console.error("Places Nearby Search request failed:", status);
      }
    });
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    if (originRef.current) originRef.current.value = "";
    if (destinationRef.current) destinationRef.current.value = "";
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
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>
      <Box p={4} borderRadius="lg" m={4} bgColor="white" shadow="base" minW="container.md" zIndex="1" display="none">
        <HStack spacing={2} className="text-black" justifyContent="space-between">
          
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Destination" ref={destinationRef} />
            </Autocomplete>
          </Box>
          <ButtonGroup className="text-black">
            <Button colorScheme="pink" type="submit" onClick={() => calculateRoute(originRef.current?.value || '', destinationRef.current?.value || '')}>
              Calculate Route
            </Button>
            <IconButton aria-label="center back" icon={<FaTimes />} onClick={clearRoute} />
            <Button colorScheme="pink" type="submit" onClick={() => getCurrentLocation()}>
              Get Current Location
            </Button>
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} className="text-black" justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map?.panTo(center);
              map?.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default Maps;
