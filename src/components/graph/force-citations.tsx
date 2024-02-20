"use client"

import * as React from "react"

import { useTheme } from "next-themes"

import { ForceGraph2D } from "react-force-graph"
import { ForceGraphProps, ForceGraphMethods } from "react-force-graph-2d"
import { ScaleLogarithmic, scaleLog, ScaleLinear, scaleLinear } from "d3-scale"

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
    minReferenceCount: number;
    maxReferenceCount: number;
    minCitationCount: number;
    maxCitationCount: number;
}

export default function CitationGraph({ graphData, originatingPaperId }: { graphData: CitationGraphData, originatingPaperId: string}) {
    const { resolvedTheme } = useTheme();
    const [dimensions, setDimensions] = React.useState({ width: 300, height: 600 });
    const containerRef = React.useRef<HTMLDivElement>(null);
    const fgRef = React.useRef<any>(null);

    const minReferenceCount = Math.min(...graphData.nodes.map(node => node.val3));
    const maxReferenceCount = Math.max(...graphData.nodes.map(node => node.val3));

    React.useEffect(() => {
        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        };
    
        const observer = new ResizeObserver(handleResize);
    
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
    
        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        if (fgRef.current) {
            fgRef.current.d3Force('charge').strength(-20);
            fgRef.current.zoom(1.2);
        }
    }, [fgRef]);

    const valToColor = scaleLog([1, 5, 75, 150], ["white", "lightblue", "steelblue", "lightgreen"]);
    const borderWidthScale = scaleLinear([minReferenceCount, maxReferenceCount], [0.5, 3]);

    return (
        <Card ref={containerRef} className="relative w-full h-full min-w-0">
            <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                linkColor={() => resolvedTheme === 'dark' ? 'gray' : 'lightgray'}
                linkWidth={1}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const currentYear = 2024;
                    const yearDiff = currentYear - (node.val2 as number);
                    const maxRadius = 10;
                    const radius = Math.max(5, maxRadius - yearDiff * 0.5);

                    // Fill the seed node 
                    const isSeedNode = node.id === originatingPaperId;
                    const fillColor: string = isSeedNode ? '#F5F5F5' : valToColor(node.val as number) as unknown as string;
            
                    // Draw the node (circle) with a fill
                    ctx.beginPath();
                    ctx.arc(node.x || 0, node.y || 0, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = fillColor; 
                    ctx.fill();
            
                    // Draw the border
                    const borderWidth = borderWidthScale(node.val3 as number);
                    const borderColor = resolvedTheme === 'dark' ? 'darkgray' : 'black';

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
    const legendValues = [1, 5, 75, 150];
    const legendItems = legendValues.map(value => {
        const color = scale(value);
        return (
            <div key={value} className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 border border-black" style={{ backgroundColor: color }}></div>
                <div className="text-xs">{value}</div>
            </div>
        )
    });

    return (
        <div className="px-4 py-2 border rounded-sm bg-background/80 backdrop-blur-sm absolute bottom-10 left-4 ">
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