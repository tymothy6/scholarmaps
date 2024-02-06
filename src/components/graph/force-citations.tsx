"use client"

import * as React from "react"

import { ForceGraph2D } from "react-force-graph"

import { Card } from "@/components/ui/card"

const sampleData = {
    "nodes": [ 
        { 
          "id": "id1",
          "name": "name1",
          "val": 1 
        },
        { 
          "id": "id2",
          "name": "name2",
          "val": 10 
        },
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
    ]
}

export function CitationGraph() {
    return (
        <Card>
            <ForceGraph2D
                graphData={sampleData}
                nodeAutoColorBy="id"
            />
        </Card>
    )
}