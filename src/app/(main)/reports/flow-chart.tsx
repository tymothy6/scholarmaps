"use client"

import * as React from 'react';

import ReactFlow, { 
    MiniMap,
    Controls,
    Background,
    useNodesState, 
    useEdgesState, 
    addEdge, 
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
        data: { label: 'Some Node' },
        position: { x: 400, y: 125 },
    },
];

const initialEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
    },
    {
        id: 'e1-3',
        source: '1',
        target: '3',
        animated: true,
    },
];

export function FlowChart() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = React.useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div className="w-full h-[60vh] border rounded-lg p-2">
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
             >
                <Controls />
                <MiniMap />
                <Background />
             </ReactFlow>
        </div>
    )
}