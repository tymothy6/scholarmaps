"use client"

import * as React from "react"

import { useTheme } from "next-themes"

import * as d3 from "d3-array"

import { ForceGraph2D } from "react-force-graph"
import { ForceGraphProps, ForceGraphMethods } from "react-force-graph-2d"
import { ScaleLogarithmic, scaleLog, ScaleLinear, scaleLinear } from "d3-scale"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
    Tooltip,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"
import { 
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"

import { InfoCircledIcon } from "@radix-ui/react-icons"


export type CitationGraphData = {
    nodes: Array<{
        id: string;
        name: string;
        val: number;
        val2: number;
        val3: number;
        val4: number;
        val5: string[];
        val6: string;
        val7: string;
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

interface GraphNode {
    id: string;
    name: string;
    val: number; // Influential citation count
    val2: number; // Citation count
    val3: number; // Year
    val4: number; // Reference count
    val6: string; // Journal name
    val7: string; // URL
    x?: number; // Optional because it might not be set initially
    y?: number; // Optional for the same reason
}

export default function CitationGraph({ graphData, seedPaperId }: { graphData: CitationGraphData, seedPaperId: string}) {
    const { resolvedTheme } = useTheme();
    const [dimensions, setDimensions] = React.useState({ width: 300, height: 600 });
    const [hoverNode, setHoverNode] = React.useState<GraphNode | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const fgRef = React.useRef<any>(null);

    const minCitationCount = Math.min(...graphData.nodes.map(node => node.val2));
    const maxCitationCount = Math.max(...graphData.nodes.map(node => node.val2));

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
        if (fgRef.current && graphData) {
            // const transitionDuration = 1000;
            // const padding = 20;
            // const nodeFilterFn = (node: any) => true;

            // fgRef.current.zoomToFit(transitionDuration, padding, nodeFilterFn);
            fgRef.current.d3Force('charge').strength(-125);
        }
    }, [graphData]);

    const { q1, q2, q3 } = calculateQuartiles(graphData.nodes.map(node => node.val));
    const maxVal = Math.max(...graphData.nodes.map(node => node.val));

    // const valToColor = scaleLog([1, 5, 75, 150], [resolvedTheme === 'dark' ? "gray": "white", "lightblue", "steelblue", "lightgreen"]);

    const valToColor = scaleLinear([q1, q2, q3, maxVal], [resolvedTheme === 'dark' ? "gray" : "white", "lightblue", "steelblue", "lightgreen"]);

    const borderWidthScale = scaleLinear([minCitationCount, maxCitationCount], [0.25, 4]);

    const calculateRadius = (year: number) => {
        const currentYear = 2024;
        const yearDiff = currentYear - year;
        const maxRadius = 12;
        return Math.max(5, maxRadius - yearDiff * 0.5);
    };

    return (
        <div className="flex flex-col gap-4 items-end">
        <GraphLegend 
            colorScale={valToColor}
            borderWidthScale={borderWidthScale}
            minCitationCount={minCitationCount}
            maxCitationCount={maxCitationCount}
            q1={q1}
            q2={q2}
            q3={q3}
            maxVal={maxVal}
            calculateRadius={calculateRadius}
            />
        <Card ref={containerRef} className="relative w-full h-full min-w-0">
            <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                onNodeHover={(node) => setHoverNode(node as GraphNode)}
                nodeLabel={() => ''}
                width={dimensions.width}    
                height={dimensions.height}
                minZoom={1}
                linkColor={() => resolvedTheme === 'dark' ? 'gray' : 'lightgray'}
                linkWidth={1}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    // Determine the size of the node based on year
                    const radius = calculateRadius(node.val3 as number);

                    // Fill the seed node 
                    const isSeedNode = node.id === seedPaperId;
                    const fillColor: string = isSeedNode ? '#F5F5F5' : valToColor(node.val as number) as unknown as string;
            
                    // Draw the node (circle) with a fill
                    ctx.beginPath();
                    ctx.arc(node.x || 0, node.y || 0, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = fillColor; 
                    ctx.fill();
            
                    // Draw the border
                    const borderWidth = borderWidthScale(node.val2 as number);
                    const borderColor = resolvedTheme === 'dark' ? 'lightgray' : 'black';

                    ctx.lineWidth = borderWidth;
                    ctx.strokeStyle = borderColor;
                    ctx.stroke();
                  }}
                  nodePointerAreaPaint={(node, color, ctx) => {
                    const radius = Math.max(5, 12 - (2024 - node.val3) * 0.5); // For the interaction area
                    ctx.beginPath();
                    ctx.arc(node.x || 0, node.y || 0, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                  }}
            />
            {hoverNode && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="absolute top-4 left-4 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-sm border shadow-sm">
                                <h3 className="text-sm font-medium">{hoverNode.name}</h3>
                                <p className="text-sm">{hoverNode.val6} ({hoverNode.val3})</p>
                                <p className="text-sm">Influential citation count: {hoverNode.val}</p>
                                <p className="text-sm">Citation count: {hoverNode.val2}</p>
                                <p className="text-sm">Reference count: {hoverNode.val4}</p>
                            </div>
                        </TooltipTrigger>
                    </Tooltip>
                </TooltipProvider>
                )
            }
        </Card>
        </div>
    )
}

function calculateQuartiles(data: number[]) {
    const sortedData = data.filter((item): item is number => item !== undefined).sort((a, b) => a - b);
    const q1 = d3.quantile(sortedData, 0.25);
    const q2 = d3.quantile(sortedData, 0.5); // Median
    const q3 = d3.quantile(sortedData, 0.75);

    return {
        q1: q1 ?? 0, // Consider fallback values or handling for undefined
        q2: q2 ?? 0,
        q3: q3 ?? 0
    };
}

function GraphLegend ({ 
    colorScale, 
    borderWidthScale,
    minCitationCount,
    maxCitationCount,
    q1,
    q2,
    q3,
    maxVal,
    calculateRadius,
}: { 
    colorScale: ScaleLinear<string, string, never>, 
    borderWidthScale: ScaleLinear<number, number, never>,
    minCitationCount: number,
    maxCitationCount: number,
    q1: number,
    q2: number,
    q3: number,
    maxVal: number,
    calculateRadius: (year: number) => number,
}) {
    const colorValues = [q1, q2, q3, maxVal];
    const colorItems = colorValues.map(value => {
        const color = colorScale(value);
        return (
            <div key={value} className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 border-[0.75px] border-black" style={{ backgroundColor: color }}></div>
                <div className="text-xs">{value}</div>
            </div>
        )
    });

    const borderValues = [minCitationCount, maxCitationCount];
    const borderItems = borderValues.map((value, index) => {
        const borderWidth = borderWidthScale(value);
        return (
            <div key={index} className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 border border-black" style={{ borderWidth: `${borderWidth}px` }}></div>
                <div className="text-xs">{value}</div>
            </div>
        )
    });

    const exampleYears = [2012, 2016, 2020, 2024];
    const yearItems = exampleYears.map(year => ({
        year,
        diameter: calculateRadius(year) * 2,
    }));
    const yearCircles = yearItems.map(item => {
        return (
            <div key={item.year} className="flex items-center mb-2">
                <div className="rounded-full mr-2 border-[0.75px] border-black" style={{ width: `${item.diameter}px`, height: `${item.diameter}px` }}></div>
                <div className="text-xs">{item.year}</div>
            </div>
        )
    });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="text-sm">
                    <InfoCircledIcon className="h-4 w-4 mr-2" />
                    Graph legend
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-max">
                <div className="flex gap-2 items-start">
                    <div className="flex flex-col items-start justify-center mr-4">
                        <h3 className="text-xs font-medium mb-2 w-16">Influential citations</h3>
                        <div className="flex flex-col items-start justify-center">{colorItems}</div>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h3 className="text-xs font-medium mb-2 w-16">Total citations</h3>
                        <div className="flex flex-col items-start justify-center">{borderItems}</div>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h3 className="text-xs font-medium mb-2 w-16">Citation year</h3>
                        <div className="flex flex-col items-start justify-center">{yearCircles}</div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

// // Shape of the data
// const sampleData = {
//     "nodes": [ 
//         { 
//           "id": "id1",
//           "name": "name1",
//           "val": 1 
//         },
//         { 
//           "id": "id2",
//           "name": "name2",
//           "val": 10 
//         },
//         { 
//           "id": "id3",
//           "name": "name3",
//           "val": 12 
//         },
//         { 
//           "id": "id4",
//           "name": "name4",
//           "val": 24
//         },
//     ],
//     "links": [
//         {
//             "source": "id1",
//             "target": "id2"
//         },
//         {
//             "source": "id2",
//             "target": "id3"
//         },
//         {
//             "source": "id3",
//             "target": "id1"
//         }
//     ]
// }