"use client"

import * as React from "react"

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

export function LoginTestimonialCarousel({ className }: { className?: string}) {
    return (
        <div className={cn(className)}>
        <Carousel className="w-full"
        opts={{
            align: "start",
            loop: true,
        }}
        plugins={[
            Autoplay({
                delay: 5000,
            }),
        ]}
        >
            <CarouselContent className="-ml-2">
                <CarouselItem className="pl-2">
                    <Card className="p-4 max-w-md 2xl:max-w-xl">
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <p className="text-left text-lg font-medium">
                        &quot;Scholar Maps has been a game changer for me. I&apos;ve been able to find papers that I wouldn&apos;t have found otherwise.&quot;
                        </p>
                        <p className="ml-4 text-left text-sm text-muted-foreground">
                            - Howard Chang, PhD
                        </p>
                    </div>
                    </Card>
                </CarouselItem>
                <CarouselItem className="pl-2"> 
                <Card className="p-4 max-w-md 2xl:max-w-xl">
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <p className="text-left text-lg font-medium">
                        &quot;Scholar Maps has saved me countless hours of time. I&apos;ve recommended it to all my trainees.&quot;
                        </p>
                        <p className="ml-4 text-left text-sm text-muted-foreground">
                            - David Sabatini, PhD
                        </p>
                    </div>
                    </Card>
                </CarouselItem>
                <CarouselItem className="pl-2">
                <Card className="p-4 max-w-md 2xl:max-w-xl">
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <p className="text-left text-lg font-medium">
                        &quot;The mobile app is great. I can find papers on the go and save them for later.&quot;
                        </p>
                        <p className="ml-4 text-left text-sm text-muted-foreground">
                            - Alice Zhang, PhD
                        </p>
                    </div>
                    </Card>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        </div>
    )
}