"use client"

import * as React from 'react';

import ReactFlow, { 
    MiniMap,
    Controls,
    Background,
    SelectionMode,
    useNodesState, 
    useEdgesState, 
    addEdge, 
    Handle,
    Connection, 
    Edge 
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },
    {
        id: '2',
        data: { label: 'Another Node' },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        data: { label: 'Not an Input Node' },
        position: { x: 400, y: 125 },
    },
];

const initialEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: false,
    },
    {
        id: 'e1-3',
        source: '1',
        target: '3',
        animated: true,
    },
];

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
        fitView: true,
    },
    figma: {
        panOnScroll: true,
        selectionOnDrag: true,
        fitView: true,
        panOnDrag: [1, 2],
        selectionMode: SelectionMode.Partial, // to add nodes to a selection that are only partially selected
    },
};

export function FlowChart({ variant = 'default' }: { variant?: ChartVariant }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = React.useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const variantProps = chartVariants[variant] || chartVariants.default;

    return (
        <div className="w-full h-[60vh] border rounded-lg p-2">
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                {...variantProps}
             >
                <Controls />
                <MiniMap />
                <Background />
             </ReactFlow>
        </div>
    )
}