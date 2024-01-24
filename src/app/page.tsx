import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { Card } from '@/components/ui/card'

import { Sidebar } from '@/components/navigation/sidebar'
import { PageHeader } from '@/components/navigation/header'
import { LineChartCard } from '@/components/patterns/chart-card'
import { DashboardCards } from '@/components/patterns/dashboard-card'
import { DashboardResult, columns, results } from './dashboard-columns'
import { DashboardResultTable } from './dashboard-table'
import { LogoutAuth } from '@/components/auth/logout-auth'

export default async function Home() {
    const session = await getServerSession(authOptions)
    
    return (
        <main className="flex flex-col gap-2">
            <Sidebar />
            <PageHeader />
            <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
                <h1 className="text-2xl font-semibold lg:font-bold mb-2">Dashboard</h1>
                <div className="grid gap-4">
                <DashboardCards />
                <LineChartCard />
                <Card>
                    <DashboardResultTable columns={columns} data={results} />
                </Card>
                </div>
                <div className="p-4">
                    <LogoutAuth />
                </div>
            </section>
        </main>
    )
}