import { validationResult } from 'express-validator';  
import Mapcontroller from '../../controller/Mapcontroller/route';


const authMiddleware = (req) => {
    // Check if the user is authenticated (dummy check for illustration)
    if (!req.headers.authorization) {
        throw new Error('Unauthorized');
    }
};

// Handle GET request for coordinates
const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await Mapcontroller.getCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
};

// Handle GET request for distance and time
const getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        const distanceTime = await Mapcontroller.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handle GET request for autocomplete suggestions
const getAutoCompleteSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    try {
        const suggestions = await Mapcontroller.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
