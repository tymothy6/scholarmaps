"use client"

import * as React from 'react';

import { useTheme } from 'next-themes';

import { 
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';

import ReactFlow, { 
    MiniMap,
    Controls,
    ControlButton,
    Background,
    SelectionMode,
    useNodesState, 
    useEdgesState, 
    addEdge, 
    Connection, 
    Edge 
} from 'reactflow';

import { initialNodes, initialEdges } from './nodes-edges';

import 'reactflow/dist/style.css';

import CustomNode from './flow-nodes';

import { WandIcon } from 'lucide-react';

const nodeTypes = { custom: CustomNode }; 
// Define nodeTypes outside of the component to avoid re-renders
// you could also use React.useMemo for this

export type ChartVariant = 'default' | 'figma';

interface ChartVariantProps {
    panOnScroll: boolean;
    selectionOnDrag: boolean;
    zoomOnScroll?: boolean;
    fitView?: boolean;
    panOnDrag?: number[];
    selectionMode?: SelectionMode;
}

const chartVariants: Record<ChartVariant, ChartVariantProps> = {
    default: {
        panOnScroll: false,
        selectionOnDrag: false,
        zoomOnScroll: false,
    },
    figma: {
        panOnScroll: true,
        selectionOnDrag: true,
        panOnDrag: [1, 2],
        selectionMode: SelectionMode.Partial, // to add nodes to a selection that are only partially selected
    },
};

export function FlowChart({ variant = 'default' }: { variant?: ChartVariant }) {
    const { resolvedTheme } = useTheme();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = React.useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const variantProps = chartVariants[variant] || chartVariants.default;

    return (
        <>
            <ResizablePanelGroup
            direction="vertical"
            className="w-full min-h-[100vh]"
            >
            <ResizablePanel defaultSize={75}>
                <div className="w-full h-full">
                    <ReactFlow 
                        nodes={nodes} 
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        className="bg-background"
                        {...variantProps}
                    >
                        <Controls>
                            <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
                                <WandIcon />
                            </ControlButton>
                        </Controls>
                        <MiniMap 
                            pannable 
                            zoomable
                            style={{
                                backgroundColor: resolvedTheme === 'dark' ? '#343435' : '#ffffff',
                            }}
                        />
                        <Background />
                    </ReactFlow>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={70}>
                        <div className="flex w-full h-full items-center justify-center p-6">
                            <span className="font-semibold">Output</span>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30}>
                    <div className="flex w-full h-full items-center justify-center p-6">
                        <span className="font-semibold">Logs</span>
                    </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
        </>
    )
}