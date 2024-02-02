"use client"

import * as React from "react"

import Link from "next/link"

import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger, 
} from "@/components/ui/tooltip"
import { toast } from "sonner"

import { 
  BoxIcon,
  HomeIcon, 
  SearchIcon, 
  CreditCardIcon,
  FolderOpenIcon, 
  FileBarChart, 
  UsersIcon, 
  SettingsIcon, 
  MenuIcon, 
  BellIcon, 
  ChevronDownIcon,
  LogOutIcon,
  LifeBuoyIcon,
  CloudIcon,
  ArrowRightFromLineIcon,
  UserPlusIcon,
  MailIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  Loader2Icon,
  MonitorIcon,
} from "lucide-react";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function PageHeader () {
    const session = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const { setTheme } = useTheme();

    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [isSearchLoading, setIsSearchLoading] = React.useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      setIsSearchLoading(true);
      e.preventDefault();

      try {
      window.location.href = `/search?query=${searchQuery}`;
      } catch (error) {
        console.error('Error submitting search query:', error);
        toast.error('Error submitting search query. Please try again.');
      } finally {
        setIsSearchLoading(false);
      }
      
    }

    const isActive = (path: string) => pathname === path;

    function onLogout () {
        signOut();
        router.push('/login');
      }
    
      // Show the route only if the user is logged in
      React.useEffect(() => {
        if (session?.status === 'unauthenticated') {
          router.push('/login')
        }
      }, [session])

    return (
        <header className="fixed top-0 left-0 z-[49] w-full lg:w-5/6 lg:left-[16.666%] h-max">
          <div className="flex items-center justify-between w-full p-4 bg-background shadow-sm border-b">
            <div className="flex gap-2 w-full">
              <Sheet>
                <SheetTrigger className="block lg:hidden" asChild>
                  <Button variant="ghost" className="py-0 px-1.5">
                  <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-slate-950">
                <div className="w-full">
                <div className="flex flex-col justify-start gap-2 w-full">
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
                <div className="mt-8 w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full group flex justify-start items-center gap-3 py-2 px-3 rounded hover:bg-gray-900 data-[state=open]:bg-gray-900">
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
                </div>
                </div>
                </div>
                </SheetContent>
              </Sheet>
              <Separator orientation="vertical" className="block lg:hidden" />
              <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                <Input 
                type="search"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search Semantic Scholar..."
                disabled={isSearchLoading} 
                />
                <Button variant="secondary" size="icon" type="submit" disabled={isSearchLoading} className="px-2">
                  {isSearchLoading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
                </Button>
              </form>
            </div>
            <div className="hidden sm:flex gap-4 w-full items-center justify-between ml-2">
              <TooltipProvider>
                <Tooltip>
              <DropdownMenu>
                <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="data-[state=open]:bg-accent">
                  <span className="sr-only">Notifications</span>
                  <BellIcon className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                </TooltipTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>On</DropdownMenuItem>
                  <DropdownMenuItem>Off</DropdownMenuItem>
                </DropdownMenuContent>
                <TooltipContent className="text-sm">Notifications</TooltipContent>
              </DropdownMenu>
              </Tooltip>
              </TooltipProvider>
              <div className="flex gap-1 w-max items-center justify-end">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={session?.data?.user?.image ?? ''} />
                <AvatarFallback>
                {session?.data?.user?.email ? session.data.user.email[0].toUpperCase(): 'SM'}
                </AvatarFallback>
              </Avatar>
              <Separator orientation="vertical" className="h-6"/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="data-[state=open]:bg-accent">
                  <span className="text-sm font-medium">{session?.data?.user?.email}</span>
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LifeBuoyIcon className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <UsersIcon className="mr-2 h-4 w-4" />
                        <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                        <UserPlusIcon className="mr-2 h-4 w-4" />
                        <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                            <MailIcon className="mr-2 h-4 w-4" />
                            <span>Email</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            <MessageSquareIcon className="mr-2 h-4 w-4" />
                            <span>Message</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                            <PlusCircleIcon className="mr-2 h-4 w-4" />
                            <span>More...</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <CloudIcon className="mr-2 h-4 w-4" />
                    <span>Remote access</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowRightFromLineIcon className="mr-2 h-4 w-4" />
                    <span>Export data</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>API</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => onLogout()}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            </div>
          </div>
        </header>
    )
}