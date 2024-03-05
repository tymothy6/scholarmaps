"use client"

import * as React from 'react';

import { Handle, Position } from 'reactflow';

function CustomNode({ data }: { data: { emoji: string; name: string; job: string }}) {
    return (
      <div className="px-4 py-2 shadow-md bg-background border-y">
        <div className="flex">
          <div className="rounded-full w-8 h-8 flex justify-center items-center bg-accent">
            {data.emoji}
          </div>
          <div className="ml-2">
            <div className="text-sm font-bold font-hubotSans">{data.name}</div>
            <div className="text-sm text-muted-foreground font-sans">{data.job}</div>
          </div>
        </div>
  
        <Handle 
            type="target" 
            position={Position.Left} 
            className="!bg-blue-500/70 hover:!bg-blue-500 !h-full !w-2 !rounded-none !rounded-tl-lg !rounded-bl-lg !border-0"
        />
        <Handle 
            type="source" 
            position={Position.Right} 
            className="!bg-blue-500/70 hover:!bg-blue-500 !h-full !w-2 !rounded-none !rounded-tr-lg !rounded-br-lg !border-0"
        />
      </div>
    );
  }
  
  export default React.memo(CustomNode);
  