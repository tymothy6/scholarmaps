
import { PaperReader } from '@/components/reader/paper-reader';

export async function generateMetadata({ searchParams }: { searchParams: {[key: string]: string | undefined } }) {
    const title = searchParams['paperId'] ? `${searchParams['paperId']}` : 'Search';
    const description = 'Details of papers in the Semantic Scholar research corpus';
    return { title, description };
}

export default function PaperResult() {
    return (
        <section className="bg-background p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full overflow-x-hidden lg:w-5/6">
            <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold">Paper details</h1>
            <div className="w-full">
                <PaperReader file="https://europepmc.org/backend/ptpmcrender.fcgi?accid=PMC4721659&blobtype=pdf" />
            </div>
        </section>
        
    )
}