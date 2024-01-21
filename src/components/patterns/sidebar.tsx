"use client"

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { HomeIcon, SearchIcon, NewspaperIcon, PresentationIcon } from "lucide-react";

export function Sidebar () {
    return (
        <aside className="hidden lg:flex lg:flex-col bg-primary w-64 border-r p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                className="flex items-center gap-2 py-1 px-3 rounded hover:bg-gray-700"
                href="#"
              >
                <HomeIcon className="w-4 h-4 text-gray-300" />
                <span className="text-gray-200">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 py-1 px-3 rounded hover:bg-gray-700"
                href="#"
              >
                <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                Search
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 py-1 px-3 rounded hover:bg-gray-700"
                href="#"
              >
                <NewspaperIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                Projects
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 py-1 px-3 rounded hover:bg-gray-700"
                href="#"
              >
                <NewspaperIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                Reports
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 py-1 px-3 rounded hover:bg-gray-700"
                href="#"
              >
                <PresentationIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                Team
              </Link>
            </li>
          </ul>
        </nav>
        </aside>
    )
}