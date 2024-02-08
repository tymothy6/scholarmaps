import { Metadata } from 'next'

import dynamic from 'next/dynamic'

import { PaperIdentifierCarousel } from '@/components/graph/identifier-carousel'
import { CitationGraphExamples } from '@/components/graph/graph-examples'
import { FAQButton } from '@/components/navigation/faq-button'
import { PaperSeedSearch } from '@/components/graph/seed-search'

const CitationGraph = dynamic(() => import('@/components/graph/force-citations'), { ssr: false })

export const metadata: Metadata = {
    title: "Map",
    description: "Explore connections between literature with Scholar Maps.",
  }

export default function Map() {
    return (
        <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
            <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold mb-2">Map connected papers</h1>
            <div className="flex flex-col space-y-8 items-center mx-auto">
                <div className="flex flex-col space-y-4 items-center w-full md:mx-auto">
                    <h2 className="text-base md:text-lg font-semibold">To get started, enter a paper identifier</h2>
                    <PaperSeedSearch />
                </div>
                <div className="flex flex-col space-y-4 items-center w-full md:mx-auto">
                    <h3 className="text-sm md:text-base font-medium">Scholar Maps supports the following identifiers:</h3>
                    <PaperIdentifierCarousel className="w-max" />
                </div>
                <CitationGraphExamples />
            </div>
            <div className="grid gap-4 w-full">
                <h2 className="text-lg lg:text-xl font-semibold mt-2">Citation graph</h2>
                <CitationGraph />
                <FAQButton />
            </div>
        </section>
    )
}