// pages/api/write-file.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }

        // Get the path and content from the request body
        const { path: filePath, content } = req.body;

        if (!filePath || typeof filePath !== 'string' || typeof content !== 'string') {
            return res.status(400).json({ error: 'Invalid path or content parameter' });
        }

        // Construct possible file paths to check
        const filePathsToCheck = [
            path.join(process.cwd(), filePath, `index.tsx`),
            path.join(process.cwd(), `${filePath || 'index'}.tsx`),
        ];

        // Check if any of the file paths exist
        const validFilePath = filePathsToCheck.find(async (file) => await fileExists(file));

        if (!validFilePath) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Write the new content to the file
        await fs.writeFile(validFilePath, content, 'utf-8');

        res.status(200).json({ success: true });
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
