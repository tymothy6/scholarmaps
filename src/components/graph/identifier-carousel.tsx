"use client"

import * as React from "react"

import Image from "next/image"

import { cn } from "@/lib/utils"

import { useTheme } from "next-themes"

import Autoplay from "embla-carousel-autoplay"

import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

// Static assets
import arxivLogo from "../../../public/arxiv_logo.png"
import arxivLogoInverted from "../../../public/arxiv_logo_inverted.png"
import doiLogo from "../../../public/doi_logo.png"
import doiLogoInverted from "../../../public/doi_logo_inverted.png"
import pubmedLogo from "../../../public/pubmed_logo.png"
import pubmedLogoInverted from "../../../public/pubmed_logo_inverted.png"
import s2Logo from "../../../public/s2_logo.png"
import s2LogoInverted from "../../../public/s2_logo_inverted.png"

export function PaperIdentifierCarousel({ className }: { className?: string}) {
    const { resolvedTheme } = useTheme();

    return (
        <div className={cn("flex flex-col space-y-4 items-center w-full md:mx-auto", className)}>
            <h3 className="text-sm md:text-base font-medium">Scholar Maps supports the following 
            <HoverCard>
                <HoverCardTrigger className="ml-1 underline underline-offset-2 cursor-pointer">identifiers:</HoverCardTrigger>
                <HoverCardContent>
                <div className="space-y-1">
                    <p className="text-sm">
                    Semantic Scholar (and Corpus), DOI, arXiv, Microsoft Academic Graph, PubMed/Medline, PubMed Central, Assoc. for Computational Linguistics
                    </p>
                    <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                        Updated Feb 2024
                    </span>
                    </div>
                </div>
                </HoverCardContent>
            </HoverCard>
            </h3>
            <Carousel
            className="w-[50vw]"
            opts={{
                align: "start",
                loop: true,
                breakpoints: {'(min-width: 1024px)': { align: "center" }},
            }}
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
            >
                <CarouselContent className="-ml-4">
                    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="h-32 p-4 flex flex-col gap-2 items-center shadow-none">
                            <Image
                            src={resolvedTheme === 'dark' ? doiLogoInverted : doiLogo}
                            width={32}
                            height={32}
                            alt="DOI logo"
                            />
                            <h2 className="font-semibold text-base">DOI</h2>
                            <p className="italic text-sm text-muted-foreground">10.1038/nature12373</p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="h-32 p-4 flex flex-col gap-2 items-center shadow-none">
                            <Image
                            src={resolvedTheme === 'dark' ? pubmedLogoInverted : pubmedLogo}
                            width={32}
                            height={32}
                            alt="PubMed logo"
                            />
                            <h2 className="font-semibold text-base">PubMed</h2>
                            <p className="italic text-sm text-muted-foreground">23883930</p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="h-32 p-4 flex flex-col gap-2 items-center shadow-none">
                            <Image
                            src={resolvedTheme === 'dark' ? arxivLogoInverted : arxivLogo}
                            width={32}
                            height={32}
                            alt="Uppercase X"
                            />
                            <h2 className="font-semibold text-base">arXiv</h2>
                            <p className="italic text-sm text-muted-foreground">1403.7138</p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="h-32 p-4 flex flex-col gap-2 items-center shadow-none">
                            <Image
                            src={resolvedTheme === 'dark' ? s2LogoInverted : s2Logo}
                            width={32}
                            height={32}
                            alt="Semantic Scholar logo"
                            />
                            <h2 className="font-semibold text-base">Semantic Scholar</h2>
                            <p className="italic text-sm text-muted-foreground">256194545</p>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}