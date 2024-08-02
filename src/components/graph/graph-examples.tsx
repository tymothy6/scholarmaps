"use client";

import * as React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription } from "@/components/ui/card";

export function CitationGraphExamples() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center">
      <h3 className="col-span-3 text-sm text-center md:text-base font-medium">
        Or start exploring with a sample graph
      </h3>
      <Card className="col-span-1 h-full">
        <CardContent>
          <div className="w-full my-4 h-36 bg-muted rounded" />
          <CardDescription className="text-sm text-foreground font-medium">
            Science mapping software tools: Review, analysis, and cooperative
            study among tools (Cobo, 2011)
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="col-span-1 h-full">
        <CardContent>
          <div className="w-full my-4 h-36 bg-muted rounded" />
          <CardDescription className="text-sm text-foreground font-medium">
            DeepFruits: A Fruit Detection System Using Deep Neural Networks (Sa,
            2016)
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="col-span-1 h-full">
        <CardContent>
          <div className="w-full my-4 h-36 bg-muted rounded" />
          <CardDescription className="text-sm text-foreground font-medium">
            Gender Equality and Intrastate Armed Conflict (Melander, 2005)
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
