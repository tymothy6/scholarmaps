import { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { Card } from '@/components/ui/card'

import { LineChartCard } from '@/components/patterns/chart-card'
import { DashboardCards } from '@/components/patterns/dashboard-card'
import { 
    type DashboardResult, 
    columns, 
    results 
} from './tables/dashboard-columns'
import { DashboardResultTable } from './tables/dashboard-table'
import { LogoutAuth } from '@/components/auth/logout-auth'
import NovelTailwindEditor from '@/components/novel/editor'

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Overview of your Scholar Maps activity",
  }

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }
    
    return (
        <section className="p-4 lg:p-8 flex flex-col gap-2">
            <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold mb-2">Dashboard</h1>
            <div className="grid gap-4 w-full">
                <DashboardCards />
                <LineChartCard />
                <h2 className="hidden sm:block text-lg lg:text-xl font-semibold mt-2">Notes</h2>
                <NovelTailwindEditor />
                <h2 className="hidden sm:block text-lg lg:text-xl font-semibold mt-2">Bookmarks</h2>
                <Card className="hidden sm:block">
                    <DashboardResultTable columns={columns} data={results} />
                </Card>
            </div>
            <div className="p-4">
                <LogoutAuth />
            </div>
        </section>
    )
}