import { NextRequest, NextResponse } from 'next/server';
import { PaperCitationResult } from '@/app/(main)/map/page';

function transformGraphData (citations: PaperCitationResult[], originatingPaperId: string) {
    // First filter step
    const filteredCitations = citations.filter(citation => citation.citingPaper.citationCount >= 5);

    const nodes = filteredCitations.map(citation => ({
        id: citation.citingPaper.paperId,
        name: citation.citingPaper.title,
        val: citation.citingPaper.influentialCitationCount, 
        year: citation.citingPaper.year,
    }));

    const links = filteredCitations.map(citation => ({
        source: originatingPaperId,
        target: citation.citingPaper.paperId,
    }));

    const originatingNode = {
        id: originatingPaperId,
        name: "Seed paper", 
        val: 10, 
        year: 2024,
    };

    // Ensure the source paper is only added if it's not already a node
    if (!nodes.some(node => node.id === originatingPaperId)) {
        nodes.push(originatingNode);
    }

    return { nodes, links };
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { citations, originatingPaperId } = body;

    try {
        const graphData = transformGraphData(citations, originatingPaperId);
        return new NextResponse(JSON.stringify(graphData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in route handler transforming citation data:', error);
        return new NextResponse(JSON.stringify({ error: 'Route handler failed to transform citation data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    
}