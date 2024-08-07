"use client";

import { useState } from "react";
import { PageHeader } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/sidebar";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { FlowProvider } from "./reports/context/flow-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <main>
      <FlowProvider>
        <PageHeader isSidebarOpen={isSidebarOpen} />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div
          className={`absolute top-10 transition-all duration-300 ${
            isSidebarOpen
              ? "w-[var(--content-width-open)] left-[var(--content-left-open)]"
              : "w-[var(--content-width-closed)] left-[var(--content-left-closed)]"
          }
                `}
        >
          {children}
          <ProgressBar
            height="4px"
            color="#3DB9CF"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </div>
      </FlowProvider>
    </main>
  );
}
