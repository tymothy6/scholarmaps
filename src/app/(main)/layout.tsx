"use client"

import { PageHeader } from "@/components/navigation/header" 
import { Sidebar } from "@/components/navigation/sidebar"

import { FlowProvider } from './reports/context/flow-provider';

export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
        <main>
          <FlowProvider>
            <PageHeader />
            <Sidebar />
            {children}
          </FlowProvider>
        </main>

    )
  }