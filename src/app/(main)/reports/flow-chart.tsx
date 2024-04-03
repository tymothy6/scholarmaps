"use client"

import * as React from 'react';

import { useTheme } from 'next-themes';

import { Input } from '@/components/ui/input';
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
} from 'reactflow';

import 'reactflow/dist/style.css';

import { useFlowContext } from './context/flow-provider';

import NovelReportsEditor from '@/components/novel/report-editor';

import JobNode from './job-node';
import CompletionNode from './completion-node';
import ChatNode from './chat-node';
import PaperSearchNode from './search-node';

import { WandIcon } from 'lucide-react';

// Define nodeTypes outside of the component to avoid re-renders
const nodeTypes = { 
    jobNode: JobNode,
    chatNode: ChatNode,
    completionNode: CompletionNode,
    searchNode: PaperSearchNode,
 }; 

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
    const { nodes, edges, onConnect, onNodesChange, onEdgesChange, addNewNode } = useFlowContext();
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
                        <Controls />
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
            <ResizablePanel defaultSize={25} maxSize={70}>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={75}>
                        <div className="flex w-full h-max items-center justify-start p-1 border-b">
                            <span className="ml-2 font-mono text-xs uppercase font-semibold">Editor</span>
                        </div>
                        <NovelReportsEditor />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={25} minSize={10} className="flex flex-col">
                        <div className="flex w-full h-max items-center justify-start p-1 border-b">
                            <span className="ml-2 font-mono text-xs uppercase font-semibold">Output</span>
                        </div>
                        <div className="flex w-full h-full items-center justify-center p-1 border-b">
                            {/* Render output here */}
                        </div>
                        <Input className="w-full rounded-none border-x-0 h-6 font-mono" />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
        </>
    )
}