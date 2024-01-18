import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <section>
            <h1>Home</h1>
            <p>Hi {session?.user?.name ?? 'stranger'}!</p>
            <h2>Server Side Rendered</h2>
            <pre>{JSON.stringify(session)}</pre>
        </section>
    )
}