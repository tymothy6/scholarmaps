import { NextRequest, NextResponse } from 'next/server';
import { PaperCitationResult } from '@/app/(main)/map/page';

function transformGraphData (citations: PaperCitationResult[], originatingPaperId: string) {
    // First filter step
    const filteredCitations = citations.filter(citation => citation.citingPaper.citationCount >= 5);

    const nodes = filteredCitations.map(citation => ({
        id: citation.citingPaper.paperId,
        name: citation.citingPaper.title,
        val: citation.citingPaper.influentialCitationCount, 
        val2: citation.citingPaper.citationCount,
        val3: citation.citingPaper.year,
        val4: citation.citingPaper.referenceCount,
        val5: citation.citingPaper.publicationTypes,
        val6: citation.citingPaper.journal.name,

    }));

    const links = filteredCitations.map(citation => ({
        source: originatingPaperId,
        target: citation.citingPaper.paperId,
    }));

    // Submit seed paper ID to relevance search to fetch details to populate this node
    const originatingNode = {
        id: originatingPaperId,
        name: "Seed paper", 
        val: 5, 
        val2: 5,
        val3: 2024,
        val4: 5,
        val5: ["Journal Article"],
        val6: "My favourite journal",
    };

    // Ensure the source paper is only added if it's not already a node
    if (!nodes.some(node => node.id === originatingPaperId)) {
        nodes.push(originatingNode);
    }

    // Find min and max values for visualization
    const referenceCounts = filteredCitations.map(citation => citation.citingPaper.referenceCount);
    const minReferenceCount = Math.min(...referenceCounts);
    const maxReferenceCount = Math.max(...referenceCounts);

    const citationCounts = filteredCitations.map(citation => citation.citingPaper.citationCount);
    const minCitationCount = Math.min(...citationCounts);
    const maxCitationCount = Math.max(...citationCounts);

    return { nodes, links, minReferenceCount, maxReferenceCount, minCitationCount, maxCitationCount};
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