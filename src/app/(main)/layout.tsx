import { PageHeader } from "@/components/navigation/header" 
import { Sidebar } from "@/components/navigation/sidebar"

export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
        <main>
            <PageHeader />
            <Sidebar />
            {children}
        </main>

    )
  }