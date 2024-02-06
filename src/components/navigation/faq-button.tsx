"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
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
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
  } from "@/components/ui/tooltip"

import { 
    BookOpenIcon,
    MessageSquareIcon,
} from "lucide-react"


export function FAQButton() {
    return (
        <div className="absolute bottom-12 right-12">
            <TooltipProvider>
                <Tooltip>
              <DropdownMenu>
                <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                    <Button variant="default" className="h-10 w-10 rounded-full shadow-lg">
                        <span className="font-regular text-2xl">?</span>
                    </Button>
                </DropdownMenuTrigger>
                </TooltipTrigger>
                <DropdownMenuContent side="left">
                  <DropdownMenuItem><BookOpenIcon className="mr-2 h-4 w-4" />Help & documentation</DropdownMenuItem>
                  <DropdownMenuItem><MessageSquareIcon className="mr-2 h-4 w-4" />Message support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
                  <DropdownMenuItem>What's new?</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>X - @ScholarMaps</DropdownMenuItem>
                  <DropdownMenuItem disabled>Terms & Privacy</DropdownMenuItem>
                  <DropdownMenuItem disabled>Status</DropdownMenuItem>
                </DropdownMenuContent>
                <TooltipContent className="max-w-[100px]">
                    <h2 className="text-sm font-medium">Help, feedback, and keyboard shortcuts</h2>
                </TooltipContent>
              </DropdownMenu>
              </Tooltip>
            </TooltipProvider>
        </div>
    )
}