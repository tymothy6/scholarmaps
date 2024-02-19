"use client"

import * as React from "react"

import { useTheme } from "next-themes"

import { ForceGraph2D } from "react-force-graph"
import { scaleLinear } from "d3-scale"

import { Card } from "@/components/ui/card"

export type CitationGraphData = {
    nodes: Array<{
        id: string;
        name: string;
        val: number;
        year: number;
    }>;
    links: Array<{
        source: string;
        target: string;
    }>;
}

export default function CitationGraph({ graphData, originatingPaperId }: { graphData: CitationGraphData, originatingPaperId: string}) {
    const { resolvedTheme } = useTheme();
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

    const valToColor = scaleLinear()
    .domain([1, 5, 75])
    .range(["white", "lightblue", "lightgreen"]);

    return (
        <Card ref={graphRef} className="w-full h-full min-w-0">
            <ForceGraph2D
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    // Base node radius
                    const radius = 5;

                    // Apply color scale for node fill or use a default color for the seed node
                    const fillColor = valToColor(node.val);
            
                    // Determine the border color
                    const borderColor = 'black'; // Static color; customize as needed
            
                    // Calculate border width based on the year
                    const currentYear = 2024;
                    let borderWidth = Math.max(0, 3 - (currentYear - node.year)); // Subtract the difference from 3, clamped at 0
            
                    // Draw the node (circle) with a fill
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = fillColor; 
                    ctx.fill();
            
                    // Draw the border
                    ctx.lineWidth = borderWidth;
                    ctx.strokeStyle = borderColor;
                    ctx.stroke();
                  }}
                  nodePointerAreaPaint={(node, color, ctx) => {
                    // Optionally define the pointer area for interaction, matching the node's visual size
                    const radius = 5; // Should match the radius used for drawing
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                  }}
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