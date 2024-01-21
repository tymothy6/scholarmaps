"use client"

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { HomeIcon, SearchIcon, FolderOpenIcon, FileBarChart, UsersIcon, SettingsIcon } from "lucide-react";

export function Sidebar () {
    return (
      <div>
        <aside className="hidden lg:flex lg:flex-col lg:justify-between bg-slate-950 w-64 h-[100vh] border-r p-4">
        <div className="flex flex-col justify-start gap-2">
        <nav className="mt-16">
          <ul className="space-y-2">
            <li>
              <Link
                className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900"
                href="/"
              >
                <HomeIcon className="w-5 h-5 text-slate-200 hover:text-slate-200" />
                <span className="text-slate-200 text-[15px] font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900"
                href="#"
              >
                <SearchIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-200" />
                <span className="text-slate-400 group-hover:text-gray-200 text-[15px] font-medium">Search</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900"
                href="#"
              >
                <FolderOpenIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-200" />
                <span className="text-slate-400 group-hover:text-gray-200 text-[15px] font-medium">Projects</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900"
                href="#"
              >
                <FileBarChart className="w-5 h-5 text-slate-400 group-hover:text-slate-200" />
                <span className="text-slate-400 group-hover:text-gray-200 text-[15px] font-medium">Reports</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900"
                href="#"
              >
                <UsersIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-200" />
                <span className="text-slate-400 group-hover:text-gray-200 text-[15px] font-medium">Team</span>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="mt-8">
          <h3 className="text-[13px] text-slate-400 font-medium tracking-wide pl-3 pb-2">Your teams</h3>
          <ul className="space-y-2">
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[10px] font-mono">T</kbd>
                <span className="text-slate-400 group-hover:text-gray-200 text-sm font-medium">Tailwind Labs</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[10px] font-mono">A</kbd>
                <span className="text-slate-400 group-hover:text-gray-200 text-sm font-medium">AstraZeneca</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[10px] font-mono">N</kbd>
                <span className="text-slate-400 group-hover:text-gray-200 text-sm font-medium">Novartis</span>
              </Link>
            </li>
          </ul>
        </nav>
        </div>
        <Button variant="ghost" className="group flex justify-start items-center gap-3 py-2 px-3 rounded hover:bg-gray-900">
          <SettingsIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-200" />
          <span className="text-slate-400 group-hover:text-gray-200 font-medium">Settings</span>
        </Button>
        </aside>
      </div>
    )
}