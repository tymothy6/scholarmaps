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

import { 
    initialNodes, 
    initialEdges,
    exampleNodes,
    exampleEdges,
 } from '../nodes-edges';

import { type SearchPaperResult } from '../tables/reports-search-columns';

export interface JobNodeData {
    name: string;
    emoji: string;
    job: string;
}

export interface ChatNodeData {
    messages: Array<{ 
        id: string; 
        content: string; 
        role: 'function' | 'user' | 'system' | 'assistant' | 'data' | 'tool';
    }>;
}

export interface PaperResultNodeData {
    title: string;
    authors: { authorId: string; name: string }[];
    journal: { name: string, pages: string, volume: string };
    year: number;
    publicationTypes: string[];
    tldr: { model: string; text: string };
    isOpenAccess: boolean;
    openAccessPdf: { url: string; status: string };
    abstract: string;
  }

// Define a union type for the node data
export type NodeData = JobNodeData | ChatNodeData | PaperResultNodeData;

export interface FlowNode extends Node {
    data: NodeData; // use the union type here
}

interface FlowContextTypes {
    loadData: (dataName: string) => void;
    nodes: FlowNode[];
    setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>;
    onNodesChange: (changes: any) => void;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    onEdgesChange: (changes: any) => void;
    addNewNode: (newNodeData: FlowNode) => void;
    onPaperSelect: (selectedPaper: SearchPaperResult) => void;
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

    const loadData = (dataName: string) => {
        switch (dataName) {
            case 'example':
                setNodes(exampleNodes);
                setEdges(exampleEdges);
                break;
            case 'initial':
            default:
                setNodes(initialNodes);
                setEdges(initialEdges);
        }
    };

    const onPaperSelect = (selectedPaper: SearchPaperResult) => {
        const newNode = {
            id: `paper-${selectedPaper.paperId}`,
            type: 'paperResultNode',
            position: { x: 0, y: 0 },
            data: {
                title: selectedPaper.title,
                authors: selectedPaper.authors,
                journal: {
                  name: selectedPaper.journal?.name || '',
                  pages: selectedPaper.journal?.pages || '',
                  volume: selectedPaper.journal?.volume || '',
                },
                year: selectedPaper.year,
                publicationTypes: selectedPaper.publicationTypes,
                tldr: selectedPaper.tldr,
                isOpenAccess: selectedPaper.isOpenAccess,
                openAccessPdf: selectedPaper.openAccessPdf,
                abstract: selectedPaper.abstract,
              },
        };

        setNodes((nodes) => nodes.concat(newNode));
    }

    return (
        <ReactFlowProvider>
            <FlowContext.Provider value={{ 
                loadData,
                nodes, 
                setNodes, 
                onNodesChange, 
                edges, 
                setEdges, 
                onEdgesChange, 
                addNewNode, 
                onPaperSelect,
                onConnect, 
                updateNodeData
                 }}>
                {children}
            </FlowContext.Provider>
        </ReactFlowProvider>
    );
}

