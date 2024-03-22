"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"

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
        <Carousel className="w-96"
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
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <p className="text-left text-lg font-medium text-slate-50">
                        &quot;Scholar Maps has been a game changer for me. I&apos;ve been able to find papers that I wouldn&apos;t have found otherwise.&quot;
                        </p>
                        <p className="ml-4 text-left text-sm text-slate-200">
                            - Howard Chang, PhD
                        </p>
                    </div>
                </CarouselItem>
                <CarouselItem className="pl-2"> 
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <p className="text-left text-lg font-medium text-slate-50">
                        &quot;Scholar Maps has saved me countless hours of time. I&apos;ve recommended it to all my trainees.&quot;
                        </p>
                        <p className="ml-4 text-left text-sm text-slate-200">
                            - David Sabatini, PhD
                        </p>
                    </div>
                </CarouselItem>
                <CarouselItem className="pl-2">
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <p className="text-left text-lg font-medium text-slate-50">
                        &quot;The ability to access Scholar Maps on mobile is what drew me to the app. I can find papers on the go and save them for later.&quot;
                        </p>
                        <p className="ml-4 text-left text-sm text-slate-200">
                            - Alice Zhang, PhD
                        </p>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        </div>
    )
}