"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import { QuestionMarkIcon } from "@radix-ui/react-icons"


export function FAQButton() {
    return (
        <div className="absolute bottom-8 right-8">
            <Button variant="default" className="h-10 w-10 rounded-full shadow-lg">
                <span className="font-regular text-2xl">?</span>
            </Button>
        </div>
    )
}