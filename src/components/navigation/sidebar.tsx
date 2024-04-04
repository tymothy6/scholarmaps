"use client";

import * as React from "react";
import { Suspense } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes"
import { useQuery } from "@tanstack/react-query";
import { RecentSearchResponse } from "@/app/(main)/search/page";
import { RecentSearchesNavbarSkeleton } from "./nav-skeleton";

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
  RouteIcon, 
  FileBarChart, 
  UsersIcon, 
  SettingsIcon,
  MonitorIcon 
} from "lucide-react";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function Sidebar () {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') {
      return true;
    }

    return path !== '/' && pathname.startsWith(path) && (pathname[path.length] === '/' || pathname.length === path.length);
  };

  const fetchRecentSearches = async () => {
    try {
      const response = await fetch("/api/recent-searches", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recent searches');
      }

      const data: RecentSearchResponse[] = await response.json();

        if (Array.isArray(data)) {
            return data;
        } else {
            console.warn('Recent searches API returned unexpected data:', data);
            return [];
        }

    } catch (error) {
      console.error('Failed to fetch recent searches:', error);
      throw error;
    }
  };

  const { data: recentSearches, isLoading } = useQuery({
    queryKey: ['recentSearch'],
    queryFn: fetchRecentSearches,
  });
  
    return (
        <aside className="hidden lg:z-[10] lg:fixed lg:top-0 lg:flex lg:flex-col lg:justify-between bg-slate-950 dark:bg-slate-200 w-1/6 h-[100vh] border-r p-4">
        <div className="flex flex-col justify-start gap-2">
          <BoxIcon className="ml-4 mt-4 h-8 w-8 text-slate-200" />
        <nav className="mt-16">
          <ul className="space-y-2">
            <li>
              <Link
                className={`group flex items-center gap-3 py-2 px-3 rounded transition-colors duration-300 hover:bg-gray-900 ${isActive('/') ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                href="/"
              >
                <HomeIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/') ? 'text-slate-200' : 'text-slate-400'}`} />
                <span className={`group-hover:text-gray-200 ${isActive('/') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium`}>Dashboard</span>
              </Link>
            </li>
            <li>
              <div className="flex flex-col items-start">
                <Link
                  className={`group flex w-full items-center gap-3 py-2 px-3 rounded transition-colors duration-300 hover:bg-gray-900 ${isActive('/search') ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                  href="/search"
                >
                  <SearchIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/search') ? 'text-slate-200' : 'text-slate-400'}`} />
                  <span className={`group-hover:text-gray-200 ${isActive('/search') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium`}>Search</span>
                </Link>
                <Suspense fallback={<RecentSearchesNavbarSkeleton />}>
                  {recentSearches ? (
                    <div className="mt-4 w-full border-l border-gray-600 ml-4 pl-2 pr-8">
                      {recentSearches.slice(0,8).map((search) => (
                        <Link
                          key={search.query}
                          href={`/search?query=${search.query}`}
                          className={`group flex items-center gap-3 py-1 px-2 rounded transition-colors duration-300 hover:bg-gray-900 ${isActive(`/search?query=${search.query}`) ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                        >
                          <span className={`group-hover:text-gray-200 ${isActive(`/search?query=${search.query}`) ? 'text-slate-200' : 'text-slate-400'} text-[13px] font-regular truncate`}>{search.query}</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </Suspense>
              </div>
            </li>
            <li>
              <Link
                className={`group flex items-center gap-3 py-2 px-3 rounded transition-colors duration-300 hover:bg-gray-900 ${isActive('/map') ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                href="/map"
              >
                <RouteIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/map') ? 'text-slate-200' : 'text-slate-400'}`} />
                <span className={`group-hover:text-gray-200 ${isActive('/map') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium`}>Map</span>
              </Link>
            </li>
            <li>
              <Link
                className={`group flex items-center gap-3 py-2 px-3 rounded transition-colors duration-300 hover:bg-gray-900 ${isActive('/reports') ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                href="/reports"
              >
                <FileBarChart className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/reports') ? 'text-slate-200' : 'text-slate-400'}`} />
                <span className={`group-hover:text-gray-200 ${isActive('/reports') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium`}>Reports</span>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="mt-8">
          <h3 className="text-[13px] text-slate-400 font-medium tracking-wide pl-3 pb-2">Your teams</h3>
          <ul className="space-y-2">
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded transition-colors duration-300 hover:bg-slate-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[10px] font-mono">T</kbd>
                <span className="text-slate-400 group-hover:text-gray-200 text-sm font-medium">Tailwind Bio</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded transition-colors duration-300 hover:bg-slate-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[10px] font-mono">V</kbd>
                <span className="text-slate-400 group-hover:text-gray-200 text-sm font-medium">Vercel Labs</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded transition-colors duration-300 hover:bg-slate-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[10px] font-mono">A</kbd>
                <span className="text-slate-400 group-hover:text-gray-200 text-sm font-medium">AstraZeneca</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded transition-colors duration-300 hover:bg-slate-900"
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
          <Button variant="ghost" className="group flex justify-start items-center gap-3 py-2 px-3 rounded hover:bg-slate-900 data-[state=open]:bg-slate-900 data-[state=open]:text-slate-200">
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