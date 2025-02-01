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

        // ✅ Extract only the keys (locations)
        const locations = Object.keys(faresData);

        console.log(locations);

        return new Response(
            JSON.stringify(locations),
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
