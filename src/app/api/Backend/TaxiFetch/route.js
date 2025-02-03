import fs from 'fs/promises';
import path from 'path';

export async function GET(req) {
    try {
        console.log("Fetching taxi fares from file...");

        // ✅ Set file path from the public folder
        const filePath = path.join(process.cwd(), 'public', 'newtaxiFare.txt');

        // ✅ Read the file
        let fileContent = await fs.readFile(filePath, 'utf-8');

        // ✅ Parse JSON data
        const faresData = JSON.parse(fileContent);

        // ✅ Extract query parameters
        const { searchParams } = new URL(req.url);
        const pickup = searchParams.get("pickup");
        const destination = searchParams.get("destination");
        console.log(pickup, destination);
        console.log("Full fares data:", faresData);
        

        let result;
        if (pickup && destination) {
            // ✅ Check if both pickup and destination match
            if (faresData[pickup]?.[destination]) {
                result = {
                    pickup,
                    destination,
                    price: faresData[pickup][destination].price,
                    km: faresData[pickup][destination].km
                };
            } else {
                result = { message: "No fare found for this route" };
            }
        } else {
            result = { message: "Please provide both pickup and destination." };
        }

        console.log(result);

        return new Response(
            JSON.stringify(result),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error:", error.message);
        return new Response(
            JSON.stringify({ message: "Error fetching data", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
