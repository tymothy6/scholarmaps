import { SeedPaperData } from '../../map/result/page';
import { PaperReader } from '@/components/reader/paper-reader';

export async function generateMetadata({ searchParams }: { searchParams: {[key: string]: string | undefined } }) {
    const title = searchParams['paperId'] ? `${searchParams['paperId']} details` : 'Paper details';
    const description = 'Details of papers in the Semantic Scholar research corpus';
    return { title, description };
}

interface SearchProps { searchParams: { [key: string]: string | undefined } }

export default async function PaperResult( { searchParams }: SearchProps ) {
    const paperId = searchParams['paperId'] || '';
    const paperDetails = await getPaperDetails();

    // Fetch data for the selected paper using details API
    async function getPaperDetails(): Promise<SeedPaperData> {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const url = `${baseUrl}/api/details?paperId=${paperId}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching seed paper data:', error);
            return {
                paperId: paperId,
                url: 'https://www.semanticscholar.org/',
                title: 'Seed paper',
                year: 2024,
                referenceCount: 0,
                citationCount: 0,
                influentialCitationCount: 0,
                journal: {
                    name: 'No journal found',
                },
                authors: [],
                publicationTypes: [],
                isOpenAccess: false,
                openAccessPdf: {
                    url: 'https://www.semanticscholar.org/',
                    status: 'No PDF found',
                },
            };
        }
    }

    // Fetch the PDF file using the API route
    const fetchUrl = `/api/pdf?url=${encodeURIComponent(paperDetails.openAccessPdf?.url || '')}`;

    return (
        <section className="bg-background p-4 absolute top-10 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full overflow-x-hidden lg:w-5/6">
            <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold">{paperDetails.title}</h1>
            <div className="w-full flex flex-col gap-2">
                <h2 className="text-base">{paperDetails.authors.map(author => author.name).join(", ")}</h2>
                <h2 className="text-base font-medium">{paperDetails.journal.name} ({paperDetails.year})</h2>
                <PaperReader source={fetchUrl} />
            </div>
        </section>
        
    )
}