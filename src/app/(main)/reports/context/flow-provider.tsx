import * as React from 'react';

import { usePathname } from 'next/navigation';
import { 
    useQuery, 
    useMutation, 
    useQueryClient, 
    type UseMutationResult
 } from '@tanstack/react-query';
import { 
    ReactFlowProvider,
    Node, 
    Edge,
    Connection,
    useNodesState,
    useEdgesState,
    addEdge,
    NodeChange,
    EdgeChange,
    applyNodeChanges,
    applyEdgeChanges
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
    id: string;
    title: string;
    authors: { authorId: string; name: string }[];
    journal: { name: string, pages: string, volume: string };
    year: number;
    publicationTypes: string[];
    tldr: { model: string; text: string };
    isOpenAccess: boolean;
    openAccessPdf: { url: string; status: string };
    abstract: string;
    url: string;
  }

// Define a union type for the node data
export type NodeData = JobNodeData | ChatNodeData | PaperResultNodeData;

export interface FlowNode extends Node {
    data: NodeData; // use the union type here
}

interface FlowContextTypes {
    loadData: (dataName: string, name: string) => void;
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
    searchNodeIds: string[];
    setSearchNodeIds: React.Dispatch<React.SetStateAction<string[]>>;
    saveStateMutation: UseMutationResult<void, unknown, { name: string; nodes: FlowNode[]; edges: Edge[] }, unknown>;
}

const FlowContext = React.createContext<FlowContextTypes | undefined>(undefined);

// Query functions
const loadReactFlowState = async (name: string) => {
    const response = await fetch(`/api/reactflow/load?name=${encodeURIComponent(name)}`);

    if(!response.ok) {
        throw new Error(`Failed to load ReactFlow state: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

const saveReactFlowState = async (name: string, nodes: FlowNode[], edges: Edge[]) => {
    const response = await fetch(`/api/reactflow/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, nodes, edges }),
    });

    if(!response.ok) {
        throw new Error(`Failed to save ReactFlow state: ${response.statusText}`);
    }
};

export function useFlowContext() {
    const context = React.useContext(FlowContext);
    if (!context) {
        throw new Error('useFlowContext must be used within a FlowProvider');
    }
    return context;
}

export function FlowProvider({ children }: { children: React.ReactNode }) {
    const route = usePathname();
    const queryClient = useQueryClient();
    const [flowName, setFlowName] = React.useState<string>('New Report'); // set a default name

    const { data: flowState } = useQuery({
        queryKey: ['flowState', route, flowName],
        queryFn: () => loadReactFlowState(flowName),
    });

    const loadedNodes = flowState?.nodes || initialNodes;
    const loadedEdges = flowState?.edges || initialEdges;

    const [nodes, setNodes] = useNodesState(loadedNodes);
    const [edges, setEdges] = useEdgesState(loadedEdges);
    const [searchNodeIds, setSearchNodeIds] = React.useState<string[]>([]);

    const saveStateMutation = useMutation({
        mutationFn: (data: { name: string; nodes: FlowNode[]; edges: Edge[] }) =>
            saveReactFlowState(data.name, data.nodes, data.edges),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['flowState'] });
        },
    });

    const onNodesChange = (changes: NodeChange[]) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
        const updatedFlowState = { name: flowName, nodes, edges };
        saveStateMutation.mutate(updatedFlowState);
    };

    const onEdgesChange = (changes: EdgeChange[]) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
        const updatedFlowState = { name: flowName, nodes, edges };
        saveStateMutation.mutate(updatedFlowState);
    };

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

    const loadData = (dataName: string, name: string) => {
        setFlowName(name); // name the flow state
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
                id: selectedPaper.paperId,
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
                url: selectedPaper.url,
              },
        };

        setNodes((nodes) => [...nodes, newNode]);
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
                updateNodeData,
                searchNodeIds,
                setSearchNodeIds,
                saveStateMutation,
                 }}>
                {children}
            </FlowContext.Provider>
        </ReactFlowProvider>
    );
}

