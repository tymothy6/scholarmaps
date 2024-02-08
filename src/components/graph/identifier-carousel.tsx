"use client"

import * as React from "react"

import Image from "next/image"

import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"

import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

// Static assets
import arxivLogo from "../../../public/arxiv_logo.png"
import doiLogo from "../../../public/doi_logo.png"
import pubmedLogo from "../../../public/pubmed_logo.png"
import s2Logo from "../../../public/s2_logo.png"



export function PaperIdentifierCarousel({ className }: { className?: string}) {
    return (
        <div className={cn(className)}>
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
                        <Card className="h-32 p-4 flex flex-col gap-2 items-center">
                            <Image
                            src={doiLogo}
                            width={32}
                            height={32}
                            alt="DOI logo"
                            />
                            <h2 className="font-semibold">DOI</h2>
                            <p className="italic text-sm text-muted-foreground">10.1038/nature12373</p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="h-32 p-4 flex flex-col gap-2 items-center">
                            <Image
                            src={pubmedLogo}
                            width={32}
                            height={32}
                            alt="PubMed logo"
                            />
                            <h2 className="font-semibold">PubMed</h2>
                            <p className="italic text-sm text-muted-foreground">23883930</p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="h-32 p-4 flex flex-col gap-2 items-center">
                            <Image
                            src={arxivLogo}
                            width={32}
                            height={32}
                            alt="Uppercase X"
                            />
                            <h2 className="font-semibold">arXiv</h2>
                            <p className="italic text-sm text-muted-foreground">1403.7138</p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="h-32 p-4 flex flex-col gap-2 items-center">
                            <Image
                            src={s2Logo}
                            width={32}
                            height={32}
                            alt="Semantic Scholar logo"
                            />
                            <h2 className="font-semibold">Semantic Scholar</h2>
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