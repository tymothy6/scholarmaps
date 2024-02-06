import { Metadata } from 'next'

import { CitationGraph } from '@/components/graph/force-citations'
import { FAQButton } from '@/components/navigation/faq-button'

export const metadata: Metadata = {
    title: "Map",
    description: "Explore connections between literature with Scholar Maps.",
  }

export default async function Home() {
    
    return (
        <main className="flex flex-col gap-2 w-full">
            <FAQButton />
            <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
                <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold mb-2">Map</h1>
                <div className="grid gap-4 w-full">

                <h2 className="hidden sm:block text-lg lg:text-xl font-semibold mt-2">Citation graph</h2>
                    <CitationGraph />
                </div>
                <div className="p-4">

                </div>
            </section>
        </main>
    )
}