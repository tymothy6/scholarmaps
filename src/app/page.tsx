import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { Sidebar } from '@/components/patterns/sidebar'
import { LogoutAuth } from '@/components/auth/logout-auth'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <section>
            <Sidebar />
            <h1>Home</h1>
            <p>Hi {session?.user?.email ?? 'stranger'}!</p>
            <h2>Server Side Rendered Session Data:</h2>
            <pre>{JSON.stringify(session)}</pre>
            <div className="p-4">
                <LogoutAuth />
            </div>
        </section>
    )
}