import { NextApiRequest, NextApiResponse } from 'next';

export default async function calculateRoute(req: NextApiRequest, res: NextApiResponse) {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: 'Missing origin or destination' });
  }

  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: String(origin),
    destination: String(destination),
    travelMode: google.maps.TravelMode.DRIVING,
  });

  if (results.routes && results.routes.length > 0 && results.routes[0].legs && results.routes[0].legs.length > 0) {
    const leg = results.routes[0].legs[0];
    res.status(200).json({
      distance: leg.distance?.text || '',
      duration: leg.duration?.text || '',
      directions: results,
    });
  } else {
    res.status(404).json({ error: 'No route found' });
  }
}
