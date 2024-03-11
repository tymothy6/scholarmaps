import { Edge } from "reactflow";

import { FlowNode } from "./context/flow-provider";

export const initialNodes: FlowNode[] = [
    {
        id: '1',
        type: 'jobNode',
        data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
        position: { x: 50, y: 100 },
    },
    {
        id: '2',
        type: 'jobNode',
        data: { name: 'Tyler Cox', job: 'Developer Advocate', emoji: '🧑🏼‍💻' },
        position: { x: 450, y: 100 },
    },
    {
        id: '3',
        type: 'jobNode',
        data: { name: 'Jim Price', job: 'Product Designer', emoji: '🎨' },
        position: { x: 450, y: 400 },
    },
    {
        id: '4',
        type: 'jobNode',
        data: { name: 'John Doe', job: 'CTO', emoji: '👨🏻‍💻' },
        position: { x: 450, y: 250 },
    },
    {
        id: '5',
        type: 'jobNode',
        data: { name: 'Jenny Smith', job: 'Software Engineer', emoji: '👩🏻‍💻' },
        position: { x: 850, y: 400 },
    },
    {
        id: '6',
        type: 'jobNode',
        data: { name: 'Sara Smith', job: 'Product Manager', emoji: '👩🏻‍💼' },
        position: { x: 850, y: 250 },
    },
    {
        id: '7',
        type: 'jobNode',
        data: { name: 'Nikki Miles', job: 'Product Owner', emoji: '🫡' },
        position: { x: 1250, y: 400 },
    },
    {
        id: '8',
        type: 'jobNode',
        data: { name: 'Jack Black', job: 'Designer Advocate', emoji: '🖥️' },
        position: { x: 1250, y: 250 },
    }
];

export const initialEdges: Edge[] = [
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
    {
        id: 'e1-4',
        source: '1',
        target: '4',
        animated: true,
    },
    {
        id: 'e4-6',
        source: '4',
        target: '6',
        animated: true,
    },
    {
        id: 'e6-8',
        source: '6',
        target: '8',
        animated: true,
    },
    {
        id: 'e3-5',
        source: '3',
        target: '5',
        animated: true,
    },
    {
        id: 'e5-7',
        source: '5',
        target: '7',
        animated: true,
    },
];