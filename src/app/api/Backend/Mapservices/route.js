import axios from 'axios';
import { Driver } from '../models/Driver';
// Get Coordinates from OpenStreetMap (OSM) using Nominatim API
export const getAddressCoordinate = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                ltd: location.lat,  // Latitude
                lng: location.lon   // Longitude
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Get Distance and Time from OpenStreetMap (OSM) API using another service like OSRM or GraphHopper
export const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    // Example with a free service like OSRM or GraphHopper
    const url = `https://router.project-osrm.org/route/v1/driving/${encodeURIComponent(origin)};${encodeURIComponent(destination)}?overview=false`;

    try {
        const response = await axios.get(url);
        if (response.data.routes && response.data.routes[0]) {
            const route = response.data.routes[0];
            return {
                distance: route.distance, // Distance in meters
                duration: route.duration  // Duration in seconds
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Get AutoComplete Suggestions from OpenStreetMap (OSM) using Nominatim API
export const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&addressdetails=1`;

    try {
        const response = await axios.get(url);
        if (response.data.length > 0) {
            return response.data.map(prediction => prediction.display_name).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Get Captains in Radius from MongoDB
export const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in km
    const captains = await Driver.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371] // radius is in kilometers
            }
        }
    });

    return captains;
};

// Exporting functions as API Routes
export default async function handler(req, res) {
    const { method, query } = req;

    try {
        if (method === 'GET') {
            if (query.type === 'getCoordinates') {
                const { address } = query;
                const coordinates = await getAddressCoordinate(address);
                res.status(200).json(coordinates);
            } else if (query.type === 'getDistanceTime') {
                const { origin, destination } = query;
                const distanceTime = await getDistanceTime(origin, destination);
                res.status(200).json(distanceTime);
            } else if (query.type === 'getAutoComplete') {
                const { input } = query;
                const suggestions = await getAutoCompleteSuggestions(input);
                res.status(200).json(suggestions);
            }
        } else {
            res.status(400).json({ error: 'Invalid request method' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
