"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/navigation/header"; 
import { Sidebar } from "@/components/navigation/sidebar";

import { FlowProvider } from './reports/context/flow-provider';

export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <main>
          <FlowProvider>
            <PageHeader />
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
              <AnimatePresence>
                <motion.div
                key="content"
                initial={{
                  width: "var(--content-width-open)",
                  left: "var(--content-left-open)",
                }}
                animate={{
                  width: isSidebarOpen ? "var(--content-width-open)" : "var(--content-width-closed)",
                  left: isSidebarOpen ? "var(--content-left-open)" : "var(--content-left-closed)",
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-10 w-full lg:w-auto"
                >
                  {children}
                </motion.div> 
              </AnimatePresence>
          </FlowProvider>
        </main>

    )
  }