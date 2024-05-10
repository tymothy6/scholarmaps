"use client";

import * as React from "react";

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
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { 
  BoxIcon,
  HomeIcon, 
  SearchIcon, 
  RouteIcon, 
  FileBarChart, 
  ArrowLeftToLineIcon, 
  SettingsIcon,
  MonitorIcon, 
  ArrowRightFromLineIcon
} from "lucide-react";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function Sidebar ({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean, toggleSidebar: () => void }){
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
      <aside
      className={`hidden lg:z-[10] lg:fixed lg:top-0 lg:flex lg:flex-col lg:justify-between bg-slate-950 h-[100vh] border-r p-4 transition-all duration-300 ${
        isSidebarOpen ? "w-[var(--sidebar-width-open)]" : "w-[var(--sidebar-width-closed)]"}`}
      >
        <div className="flex flex-col justify-start gap-2">
            <BoxIcon className={` ${isSidebarOpen ? 'h-8 w-8' : 'h-6 w-6'} transition-all duration-300 text-slate-200 ml-3 mt-3`} />
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className={`group flex w-full items-center ${isSidebarOpen ? 'px-3 py-2 gap-3' : 'px-1 py-3 gap-0 justify-center'} rounded transition-colors duration-300 hover:bg-gray-900 ${isActive('/') ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                      href="/"
                    >
                      <HomeIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/') ? 'text-slate-200' : 'text-slate-400'}`} />
                      <span 
                        className={`group-hover:text-gray-200 ${isActive('/') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium transition-all duration-300 ${isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}
                        >
                        Dashboard
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={`${isSidebarOpen ? 'hidden': 'block'} text-sm`}>
                    Dashboard
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <div className="flex flex-col items-start">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        className={`group flex w-full items-center ${isSidebarOpen ? 'px-3 py-2 gap-3' : 'px-1 py-3 gap-0 justify-center'} rounded transition-colors duration-300 hover:bg-gray-900 ${isActive('/search') ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                        href="/search"
                      >
                        <SearchIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/search') ? 'text-slate-200' : 'text-slate-400'}`} />
                        <span 
                        className={`group-hover:text-gray-200 ${isActive('/search') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium transition-all duration-300 ${isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}
                        >
                          Search
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={`${isSidebarOpen ? 'hidden': 'block'} text-sm`}>
                      Search
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                { isLoading ? <RecentSearchesNavbarSkeleton /> :
                  <div
                  className={`${isSidebarOpen ? 'block' : 'hidden'} transition-all duration-300 mt-2 w-full`}
                  >
                      {(recentSearches ?? []).slice(0,5).map((search) => (
                        <Link  
                          key={search.query}
                          href={`/search?query=${search.query}`}
                          className={`group flex items-center gap-3 py-1 mx-4 px-2 rounded transition-colors duration-300 hover:bg-gray-900 ${isActive(`/search?query=${search.query}`) ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                        >
                          <span className={`group-hover:text-gray-200 ${isActive(`/search?query=${search.query}`) ? 'text-slate-200' : 'text-slate-400'} text-[13px] font-regular truncate`}>{search.query}</span>
                        </Link>
                      ))}
                  </div>
                }
              </div>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className={`group flex w-full items-center ${isSidebarOpen ? 'px-3 py-2 gap-3' : 'px-1 py-3 gap-0 justify-center'} rounded transition-colors duration-300 hover:bg-gray-900 ${isActive('/map') ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                      href="/map"
                    >
                    <RouteIcon className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/map') ? 'text-slate-200' : 'text-slate-400'}`} />
                    <span 
                      className={`group-hover:text-gray-200 ${isActive('/map') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium transition-all duration-300 ${isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}
                      >
                        Map
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`${isSidebarOpen ? 'hidden': 'block'} text-sm`}>
                  Map
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className={`group flex w-full items-center ${isSidebarOpen ? 'px-3 py-2 gap-3' : 'px-1 py-3 gap-0 justify-center'} rounded transition-colors duration-300 hover:bg-gray-900 ${isActive('/reports') ? 'bg-slate-900 hover:bg-slate-900 border border-slate-700/60' : ''}`}
                      href="/reports"
                    >
                    <FileBarChart className={`w-5 h-5 group-hover:text-slate-200 ${isActive('/reports') ? 'text-slate-200' : 'text-slate-400'}`} />
                    <span 
                      className={`group-hover:text-gray-200 ${isActive('/reports') ? 'text-slate-200' : 'text-slate-400'} text-[15px] font-medium transition-all duration-300 ${isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}
                      >
                        Reports
                      </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`${isSidebarOpen ? 'hidden': 'block'} text-sm`}>
                  Reports
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </li>
          </ul>
        </nav>
        <nav className={`mt-8 transition-all duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0" }`}>
          <h3 className="text-[13px] text-slate-400 font-medium tracking-wide pl-3 pb-2">Your teams</h3>
          <ul className="space-y-2">
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded transition-colors duration-300 hover:bg-slate-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[11px] font-mono">T</kbd>
                <span className={`text-slate-400 group-hover:text-gray-200 text-[13px] font-medium transition-all duration-300 ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 max-w-0"}`}>Tailwind Bio</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded transition-colors duration-300 hover:bg-slate-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[11px] font-mono">V</kbd>
                <span className={`text-slate-400 group-hover:text-gray-200 text-[13px] font-medium transition-all duration-300 ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 max-w-0"}`}>Vercel Labs</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded transition-colors duration-300 hover:bg-slate-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[11px] font-mono">A</kbd>
                <span className={`text-slate-400 group-hover:text-gray-200 text-[13px] font-medium transition-all duration-300 ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 max-w-0"}`}>AstraZeneca</span>
              </Link>
            </li>
            <li>
              <Link
                className="group flex items-center gap-2 py-2 px-3 rounded transition-colors duration-300 hover:bg-slate-900"
                href="#"
              >
                <kbd className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-500 text-[11px] font-mono">N</kbd>
                <span className={`text-slate-400 group-hover:text-gray-200 text-[13px] font-medium transition-all duration-300 ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 max-w-0"}`}>Novartis</span>
              </Link>
            </li>
          </ul>
        </nav>
        </div>
        <div className="flex items-center justify-between gap-2 w-full">
        { isSidebarOpen && (
        <TooltipProvider>
          <Tooltip>
          <DropdownMenu>
            <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={`group flex justify-start items-center gap-3 p-2 rounded hover:bg-slate-900 data-[state=open]:bg-slate-900 data-[state=open]:text-slate-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
            <SettingsIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-200" />
          </Button>
          </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent align="start">
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
          <TooltipContent side="right" className="text-sm">Settings</TooltipContent>
        </DropdownMenu>
        </Tooltip>
        </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-lg group hover:bg-slate-900`}
              onClick={toggleSidebar}
              >
                { isSidebarOpen ? 
                  <ArrowLeftToLineIcon className="w-[1.2rem] h-[1.2rem] text-slate-400 group-hover:text-slate-200" />
                  : 
                  <ArrowRightFromLineIcon className="w-[1.2rem] h-[1.2rem] text-slate-400 group-hover:text-slate-200" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-sm">
              { isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar' }
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
      </aside>
    )
}