import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { Card } from '@/components/ui/card'

import { Sidebar } from '@/components/navigation/sidebar'
import { PageHeader } from '@/components/navigation/header'

import { SearchPaperResult, columns } from './search-columns'
import { SearchResultTable } from './search-table'

async function getSearchResults(): Promise<SearchPaperResult[]> {
    const response = await fetch('/api/search')
    const data = await response.json()
    return data
}

export default async function Search() {
    const session = await getServerSession(authOptions)
    const data = await getSearchResults()
    
    return (
        <main className="flex flex-col gap-2">
            <Sidebar />
            <PageHeader />
            <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
                <h1 className="text-2xl font-semibold lg:font-bold mb-2">Search</h1>
                <div className="grid gap-4">
                <Card>
                    <SearchResultTable columns={columns} data={data} />
                </Card>
                </div>
            </section>
        </main>
    )
}