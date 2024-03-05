interface NodeData {
    name: string;
    job: string;
    emoji: string;
}
  
interface FlowNode  {
    id: string;
    type: string;
    data: NodeData;
    position: { x: number; y: number };
}

export const initialNodes: FlowNode[] = [
    {
        id: '1',
        type: 'custom',
        data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
        position: { x: 50, y: 250 },
    },
    {
        id: '2',
        type: 'custom',
        data: { name: 'Tyler Cox', job: 'Developer Advocate', emoji: '🧑🏼‍💻' },
        position: { x: 450, y: 100 },
    },
    {
        id: '3',
        type: 'custom',
        data: { name: 'Jim Price', job: 'Product Designer', emoji: '🎨' },
        position: { x: 450, y: 400 },
    },
];

export const initialEdges = [
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