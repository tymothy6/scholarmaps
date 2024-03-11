import * as React from 'react';
import { 
    ReactFlowProvider,
    Node, 
    Edge,
    Connection,
    useNodesState,
    useEdgesState,
    addEdge,
 } from 'reactflow';

import { initialNodes, initialEdges } from '../nodes-edges';

export interface NodeData {
    name: string;
    emoji: string;
    job: string;
}

export interface FlowNode extends Node {
    data: NodeData;
}

interface FlowContextTypes {
    nodes: FlowNode[];
    setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>;
    onNodesChange: (changes: any) => void;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    onEdgesChange: (changes: any) => void;
    addNewNode: (newNodeData: FlowNode) => void;
    onConnect: (connection: Edge | Connection) => void;
    updateNodeData: (id: string, newData: Partial<NodeData>) => void;
}

const FlowContext = React.createContext<FlowContextTypes | undefined>(undefined);

export function useFlowContext() {
    const context = React.useContext(FlowContext);
    if (!context) {
        throw new Error('useFlowContext must be used within a FlowProvider');
    }
    return context;
}

export function FlowProvider({ children }: { children: React.ReactNode }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = React.useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const addNewNode = (newNodeData: FlowNode) => {
        setNodes((nds) => [...nds, newNodeData]);
    };

    const updateNodeData = (id: string, newData: Partial<NodeData>) => {
        setNodes((prevNodes) => prevNodes.map(node => node.id === id ? { ...node, data: { ...node.data, ...newData } } : node));
    };

    return (
        <ReactFlowProvider>
            <FlowContext.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, addNewNode, onConnect, updateNodeData }}>
                {children}
            </FlowContext.Provider>
        </ReactFlowProvider>
    );
}

