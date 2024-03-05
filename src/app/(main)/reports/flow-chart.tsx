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
    Connection, 
    Edge 
} from 'reactflow';

import { initialNodes, initialEdges } from './nodes-edges';

import 'reactflow/dist/style.css';

import CustomNode from './flow-nodes';

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
        <div className="w-full h-[90vh] p-2">
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                {...variantProps}
             >
                <Controls />
                <MiniMap 
                    pannable 
                    zoomable
                 />
                <Background />
             </ReactFlow>
        </div>
    )
}