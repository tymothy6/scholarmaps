import * as React from 'react';
import { Node, useNodesState } from 'reactflow';

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
    addNewNode: () => void;
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
    const [nodes, setNodes] = useNodesState([]);

    const addNewNode = () => {
        const newNode = {
            id: `${nodes.length + 1}`,
            type: 'custom',
            data: {
                name: `Node ${nodes.length + 1}`,
                job: 'New Job',
                emoji: '🚀',
            },
            position: { x: Math.random() * window.innerWidth / 2, y: Math.random() * window.innerHeight / 2 },
        };
        setNodes((nds) => [...nds, newNode]);
    };

    return (
        <FlowContext.Provider value={{ nodes, setNodes, addNewNode }}>
            {children}
        </FlowContext.Provider>
    );
}

