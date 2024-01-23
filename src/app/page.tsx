import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { Sidebar } from '@/components/navigation/sidebar'
import { PageHeader } from '@/components/navigation/header'
import { LineChartCard } from '@/components/patterns/chart-card'
import { LogoutAuth } from '@/components/auth/logout-auth'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <main className="flex flex-col gap-2">
            <Sidebar />
            <PageHeader />
            <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <LineChartCard />
                <LineChartCard />
                <LineChartCard />
                <LineChartCard />
                <div className="p-4">
                    <LogoutAuth />
                </div>
            </section>
        </main>
    )
}