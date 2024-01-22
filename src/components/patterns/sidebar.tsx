"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Popover } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { 
  HomeIcon, 
  SearchIcon, 
  FolderOpenIcon, 
  FileBarChart, 
  UsersIcon, 
  SettingsIcon, 
  MenuIcon, 
  BellIcon, 
  ChevronDownIcon,
  LogOutIcon,
  LifeBuoyIcon
} from "lucide-react";

export function SidebarWithHeader () {
  const session = useSession();

    return (
      <div className="flex">
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
        <header>
          <div className="flex items-center w-full p-2 justify-between">
            <div className="flex gap-2 w-full">
              <Button variant="ghost" size="icon" className="block lg:hidden border-none">
                <MenuIcon className="h-6 w-6" />
              </Button>
              <Separator orientation="vertical" className="block lg:hidden" />
              <Input placeholder="Search" />
            </div>
            <div className="flex gap-4 items-center ml-2">
              <Button variant="ghost" size="icon" className="border-none">
                <BellIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.data?.user?.image ?? ''} />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  <span className="text-sm font-medium">{session?.data?.user?.email}</span>
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LifeBuoyIcon className="mr-2 h-4 w-4" />
                    <span>Support</span>
                    </DropdownMenuItem>
                  <DropdownMenuItem disabled>API</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
}