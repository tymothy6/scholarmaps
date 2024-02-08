"use client"

import * as React from "react"

import Image from "next/image"

import { cn } from "@/lib/utils"

import { 
    Card,
    CardContent,
    CardDescription,
 } from "@/components/ui/card"


export function CitationGraphExamples() {
    return (
        <div className="w-full flex items-center space-x-4 justify-center">
            <Card className="basis-1/3">
                <CardContent>
                <div className="w-full my-4 h-36 bg-muted rounded" />
                <CardDescription>
                <h2 className="text-sm text-foreground font-medium">Science mapping software tools: Review, analysis, and cooperative study among tools (Cobo, 2011)</h2>
                </CardDescription>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="basis-1/3">
                <div className="w-full my-4 h-36 bg-muted rounded" />
                <CardDescription>
                <h2 className="text-sm text-foreground font-medium">DeepFruits: A Fruit Detection System Using Deep Neural Networks (Sa, 2016)</h2>
                </CardDescription>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="basis-1/3">
                <div className="w-full my-4 h-36 bg-muted rounded" />
                <CardDescription>
                <h2 className="text-sm text-foreground font-medium">Gender Equality and Intrastate Armed Conflict (Melander, 2005)</h2>
                </CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}