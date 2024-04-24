// /api/reactflow/list.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma-db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed. Please try again.' });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
        return res.status(401).json({ message: 'User ID is required. Please authenticate before issuing your request.' });
    }

    try {
        const reports = await prisma.reactFlowState.findMany({
            where: {
                userId: session.user.id,
            },
            select: {
                name: true,
            },
        });

        return res.status(200).json(reports);
    } catch (error) {
        console.error('Failed to retrieve ReactFlow reports:', error);
        return res.status(500).json({ message: 'Failed to retrieve ReactFlow reports' });
    }
}
