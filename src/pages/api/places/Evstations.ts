import { NextApiRequest, NextApiResponse } from 'next';

export default async function displayNearbyEVChargingStations(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing latitude or longitude' });
  }

  const mapCenter = new google.maps.LatLng(Number(lat), Number(lng));
  const request: google.maps.places.PlaceSearchRequest = {
    location: mapCenter,
    radius: 5000,
    type: 'charging_station',
    keyword: 'electric vehicle charging',
  };

  const placesService = new google.maps.places.PlacesService(new google.maps.Map(document.createElement('div')));
  placesService.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ error: 'No charging stations found' });
    }
  });
}
