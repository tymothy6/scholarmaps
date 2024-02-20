"use client"

import * as React from "react"

import { useTheme } from "next-themes"

import { ForceGraph2D } from "react-force-graph"
import { ScaleLogarithmic, scaleLog } from "d3-scale"

import { Card } from "@/components/ui/card"

export type CitationGraphData = {
    nodes: Array<{
        id: string;
        name: string;
        val: number;
        val2: number;
        val3: number;
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

    const valToColor = scaleLog([1, 5, 75], ["white", "steelblue", "lightgreen"]);

    return (
        <Card ref={graphRef} className="relative w-full h-full min-w-0">
            <ForceGraph2D
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                linkColor={() => resolvedTheme === 'dark' ? 'white' : 'lightgray'}
                linkWidth={2}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const currentYear = 2024;
                    const yearDiff = currentYear - (node.val2 as number);
                    const maxRadius = 10;
                    const radius = Math.max(5, maxRadius - yearDiff * 0.5);

                    const fillColor: string = valToColor(node.val as number) as unknown as string;
            
                    // Draw the node (circle) with a fill
                    ctx.beginPath();
                    ctx.arc(node.x || 0, node.y || 0, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = fillColor; 
                    ctx.fill();
            
                    // Draw the border
                    const borderWidth = 2;
                    const borderColor = resolvedTheme === 'dark' ? 'white' : 'black';

                    ctx.lineWidth = borderWidth;
                    ctx.strokeStyle = borderColor;
                    ctx.stroke();
                  }}
                  nodePointerAreaPaint={(node, color, ctx) => {
                    const radius = Math.max(5, 10 - (2024 - node.val2) * 0.5); // For the interaction area
                    ctx.beginPath();
                    ctx.arc(node.x || 0, node.y || 0, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                  }}
            />
            <GraphLegend scale={valToColor} />
        </Card>
    )
}

function GraphLegend ({ scale }: { scale: ScaleLogarithmic<string, string, never>}) {
    const legendValues = [1, 5, 75];
    const legendItems = legendValues.map(value => {
        const color = scale(value);
        return (
            <div key={value} className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 border" style={{ backgroundColor: color }}></div>
                <div className="text-xs">{value}</div>
            </div>
        )
    });

    return (
        <div className="px-4 py-2 border rounded-sm bg-background absolute bottom-10 left-4 ">
            <h3 className="text-sm font-medium mb-2">Influential citations</h3>
            {legendItems}
        </div>
    )
}

// Shape of the data
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