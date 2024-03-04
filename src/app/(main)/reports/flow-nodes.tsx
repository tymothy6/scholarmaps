"use client"

import * as React from 'react';

import { Handle, Position } from 'reactflow';

function CustomNode({ data }: { data: { emoji: string; name: string; job: string }}) {
    return (
      <div className="px-4 py-2 shadow-md rounded-md bg-background border">
        <div className="flex">
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-accent">
            {data.emoji}
          </div>
          <div className="ml-2">
            <div className="text-lg font-bold font-hubotSans">{data.name}</div>
            <div className="text-muted-foreground font-sans">{data.job}</div>
          </div>
        </div>
  
        <Handle 
            type="target" 
            position={Position.Top} 
            className="!bg-blue-500" 
            style={{
                width: '32px',
                height: '4px',
                borderRadius: '2px',
                border: 'none',
            }}
        />
        <Handle 
            type="source" 
            position={Position.Bottom} 
            className="!bg-blue-500"
            style={{
                width: '32px',
                height: '4px',
                borderRadius: '2px',
                border: 'none',
            }} 
        />
      </div>
    );
  }
  
  export default React.memo(CustomNode);
  