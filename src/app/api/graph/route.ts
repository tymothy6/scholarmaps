import { NextRequest, NextResponse } from 'next/server';
import { PaperCitationResult } from '@/app/(main)/map/page';
import { SeedPaperData } from '@/app/(main)/map/result/page';

function transformGraphData (citations: PaperCitationResult[], seedPaperData: SeedPaperData) {
    // Filter out papers with less than 5 citations
    // const filteredCitations = citations.filter(citation => citation.citingPaper.citationCount >= 5);
    // console.log('Seed paper data in route handler:', seedPaperData); // log for debugging

    // Report number of total citations received
    const totalCitations = citations.length;

    // Filter citations to ensure paperId is not null and is a non-empty string
    const validCitations = citations.filter(citation => citation.citingPaper.paperId && citation.citingPaper.paperId.trim());

    const nodes = validCitations.map(citation => ({
        id: citation.citingPaper.paperId,
        name: citation.citingPaper.title,
        val: citation.citingPaper.influentialCitationCount, 
        val2: citation.citingPaper.citationCount,
        val3: citation.citingPaper.year,
        val4: citation.citingPaper.referenceCount,
        val5: citation.citingPaper.publicationTypes?.join(', '),
        val6: citation.citingPaper.journal?.name,
        val7: citation.citingPaper.url
    }));

    const links = validCitations.map(citation => ({
        source: seedPaperData.paperId,
        target: citation.citingPaper.paperId,
    }));

    const originatingNode = {
        id: seedPaperData.paperId,
        name: seedPaperData.title, 
        val: seedPaperData.influentialCitationCount, 
        val2: seedPaperData.citationCount,
        val3: seedPaperData.year,
        val4: seedPaperData.referenceCount,
        val5: seedPaperData.publicationTypes?.join(', '),
        val6: seedPaperData.journal?.name,
        val7: seedPaperData.url
    };

    // Ensure the source paper is only added if it's not already a node
    if (!nodes.some(node => node.id === seedPaperData.paperId)) {
        nodes.push(originatingNode);
    }

    // Find min and max values for visualization
    const referenceCounts = citations.map(citation => citation.citingPaper.referenceCount);
    const minReferenceCount = Math.min(...referenceCounts);
    const maxReferenceCount = Math.max(...referenceCounts);

    const citationCounts = citations.map(citation => citation.citingPaper.citationCount);
    const minCitationCount = Math.min(...citationCounts);
    const maxCitationCount = Math.max(...citationCounts);

    return { nodes, links, totalCitations, minReferenceCount, maxReferenceCount, minCitationCount, maxCitationCount};
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { citations, seedPaperData } = body;

    try {
        const graphData = transformGraphData(citations, seedPaperData);
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

// 10.1126/science.1106148