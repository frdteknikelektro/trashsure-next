// pages/api/read-page-file.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }

        // Get the path from the request body
        const { path: requestedPath } = req.body;

        if (!requestedPath || typeof requestedPath !== 'string') {
            return res.status(400).json({ error: 'Invalid path parameter' });
        }

        // Define the allowed file extensions
        const allowedExtensions = ['.tsx'];

        // Construct possible file paths to check
        const filePathsToCheck = [
            path.join(process.cwd(), requestedPath, 'index.tsx'),
            path.join(process.cwd(), `${requestedPath || 'index'}.tsx`),
        ];

        // Check if any of the file paths exist
        let validFilePath = ''
        for (const i in filePathsToCheck) {
            const isValid = await fileExists(filePathsToCheck[i])
            if (isValid) {
                validFilePath = filePathsToCheck[i];
                break;
            }
        }
        console.log({ validFilePath })

        if (!validFilePath) {
            return res.status(400).json({ error: 'Invalid file extension in path or file does not exist' });
        }

        // Read the valid file based on the provided path
        const fileContent = await fs.readFile(validFilePath, 'utf-8');

        res.status(200).json({ path: requestedPath, content: fileContent });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function fileExists(filePath: string) {
    try {
        const stats = await fs.stat(filePath);
        return stats.isFile();
    } catch (error) {
        return false;
    }
}
