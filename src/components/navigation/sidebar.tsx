"use client"

import * as React from "react"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { 
  BoxIcon,
  HomeIcon, 
  SearchIcon, 
  FolderOpenIcon, 
  FileBarChart, 
  UsersIcon, 
  SettingsIcon,
  MonitorIcon 
} from "lucide-react";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function Sidebar () {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const isActive = (path: string) => pathname === path;

    return (
        <aside className="hidden lg:fixed lg:top-0 lg:flex lg:flex-col lg:justify-between bg-slate-950 dark:bg-slate-200 w-1/6 h-[100vh] border-r p-4">
        <div className="flex flex-col justify-start gap-2">
          <BoxIcon className="ml-2 mt-2 h-8 w-8 text-slate-200" />
        <nav className="mt-16">
          <ul className="space-y-2">
            <li>
              <Link
                className={`group flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900 ${isActive('/') ? 'bg-gray-900' : ''}`}
                href="/"
              >
                <HomeIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/') ? 'text-slate-200' : 'text-slate-400'}`} />
                <span className={`group-hover:text-gray-200 ${isActive('/') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium`}>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                className={`group flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900 ${isActive('/search') ? 'bg-gray-900' : ''}`}
                href="/search"
              >
                <SearchIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/search') ? 'text-slate-200' : 'text-slate-400'}`} />
                <span className={`group-hover:text-gray-200 ${isActive('/search') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium`}>Search</span>
              </Link>
            </li>
            <li>
              <Link
                className={`group flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900 ${isActive('/projects') ? 'bg-gray-900' : ''}`}
                href="/projects"
              >
                <FolderOpenIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/projects') ? 'text-slate-200' : 'text-slate-400'}`} />
                <span className={`group-hover:text-gray-200 ${isActive('/projects') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium`}>Projects</span>
              </Link>
            </li>
            <li>
              <Link
                className={`group flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900 ${isActive('/reports') ? 'bg-gray-900' : ''}`}
                href="/reports"
              >
                <FileBarChart className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/reports') ? 'text-slate-200' : 'text-slate-400'}`} />
                <span className={`group-hover:text-gray-200 ${isActive('/reports') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium`}>Reports</span>
              </Link>
            </li>
            <li>
              <Link
                className={`group flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-900 ${isActive('/team') ? 'bg-gray-900' : ''}`}
                href="/team"
              >
                <UsersIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/team') ? 'text-slate-200' : 'text-slate-400'}`} />
                <span className={`group-hover:text-gray-200 ${isActive('/team') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium`}>Team</span>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="group flex justify-start items-center gap-3 py-2 px-3 rounded hover:bg-gray-900">
            <SettingsIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-200" />
            <span className="text-slate-400 group-hover:text-gray-200 font-medium">Settings</span>
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <SunIcon className="w-4 h-4 mr-2" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <MoonIcon className="w-4 h-4 mr-2" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <MonitorIcon className="w-4 h-4 mr-2" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </aside>
    )
}