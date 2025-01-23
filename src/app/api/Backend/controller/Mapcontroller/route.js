import { validationResult } from 'express-validator';
import Mapservices from '../../Mapservices/route';

export async function GET(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const type = url.searchParams.get('type');
    const address = url.searchParams.get('address');
    const origin = url.searchParams.get('origin');
    const destination = url.searchParams.get('destination');
    const input = url.searchParams.get('input');

    if (type === 'getCoordinates') {
        // Get Coordinates
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new Response(JSON.stringify({errors: errors.array() }), { status: 400 });
        }

        if (!address) {
            return new Response(JSON.stringify({ message: 'Address is required' }), { status: 400 });
        }
        console.log(address);
        

        try {
            const coordinates = await Mapservices.getAddressCoordinate(address);
            return new Response(JSON.stringify({ coordinates }), { status: 200 });
        } catch (err) {
            return new Response(JSON.stringify({ message: 'Coordinates not found' }), { status: 404 });
        }
    } else if (type === 'getDistanceTime') {
        // Get Distance and Time
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new Response(JSON.stringify({ errors: errors.array() }), { status: 400 });
        }

        if (!origin || !destination) {
            return new Response(JSON.stringify({ message: 'origin and destination are required' }), { status: 400 });
        }

        try {
            const distanceTime = await Mapservices.getDistanceTime(origin, destination);
            return new Response(JSON.stringify({distanceTime }), { status: 400 });
        } catch (err) {
            return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 400 });
        }
    } else if (type === 'getSuggestions') {
        // Get Suggestions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new Response(JSON.stringify({ errors: errors.array() }), { status: 400 });
        }

        if (!input) {
            return new Response(JSON.stringify({ message: 'Input is required' }), { status: 400 });
        }

        try {
            const suggestions = await Mapservices.getAutoCompleteSuggestions(input);
            return new Response(JSON.stringify({ suggestions }), { status: 400 });
        } catch (err) {
            return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 400 });
        }
    } else {
        return new Response(JSON.stringify({ message: 'Invalid request type' }), { status: 400 });
    }
}
