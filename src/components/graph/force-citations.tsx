"use client"

import * as React from "react"

import { ForceGraph2D } from "react-force-graph"

import { Card } from "@/components/ui/card"

export type CitationGraphData = {
    nodes: Array<{
        id: string;
        name: string;
        val: number;
    }>;
    links: Array<{
        source: string;
        target: string;
    }>;
}

export default function CitationGraph({ graphData }: { graphData: CitationGraphData }) {
    const [dimensions, setDimensions] = React.useState({ width: 300, height: 600 });
    const graphRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        };
    
        const observer = new ResizeObserver(handleResize);
    
        if (graphRef.current) {
            observer.observe(graphRef.current);
        }
    
        return () => observer.disconnect();
    }, []);

    return (
        <Card ref={graphRef} className="w-full h-full min-w-0">
            <ForceGraph2D
                graphData={graphData}
                nodeAutoColorBy="id"
                width={dimensions.width}
                height={dimensions.height}
            />
        </Card>
    )
}

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
        { 
          "id": "id3",
          "name": "name3",
          "val": 12 
        },
        { 
          "id": "id4",
          "name": "name4",
          "val": 24
        },
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        {
            "source": "id2",
            "target": "id3"
        },
        {
            "source": "id3",
            "target": "id1"
        }
    ]
}