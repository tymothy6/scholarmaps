import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { SidebarWithHeader } from '@/components/patterns/sidebar'
import { LineChartCard } from '@/components/patterns/chart-card'
import { LogoutAuth } from '@/components/auth/logout-auth'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <main className="flex flex-col gap-2">
            <SidebarWithHeader />
            <section className="p-4 absolute top-16 lg:left-60 lg:p-8 flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <h2>Server Side Rendered Session Data:</h2>
                <pre>{JSON.stringify(session)}</pre>
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